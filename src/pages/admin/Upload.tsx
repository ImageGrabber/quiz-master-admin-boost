
import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadIcon, FileText, CheckCircle, AlertCircle, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface ParsedQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctIndex: number;
  error?: string;
}

interface Quiz {
  id: number;
  title: string;
}

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedQuestion[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title')
      .order('title');
    if (!error && data) setQuizzes(data);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== "text/csv") {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file only.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').filter(row => row.trim());
      
      // Skip header row if it exists
      const dataRows = rows[0].toLowerCase().includes('question') ? rows.slice(1) : rows;
      
      const parsed: ParsedQuestion[] = dataRows.map((row, index) => {
        const columns = row.split(',').map(col => col.trim().replace(/"/g, ''));
        
        if (columns.length < 6) {
          return {
            question: row,
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctIndex: 0,
            error: 'Insufficient columns (expected: question, optionA, optionB, optionC, optionD, correctIndex)'
          };
        }

        const correctIndex = parseInt(columns[5]);
        if (isNaN(correctIndex) || correctIndex < 0 || correctIndex > 3) {
          return {
            question: columns[0],
            optionA: columns[1],
            optionB: columns[2],
            optionC: columns[3],
            optionD: columns[4],
            correctIndex: 0,
            error: 'correctIndex must be a number between 0-3'
          };
        }

        return {
          question: columns[0],
          optionA: columns[1],
          optionB: columns[2],
          optionC: columns[3],
          optionD: columns[4],
          correctIndex: correctIndex
        };
      });

      setParsedData(parsed);
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!parsedData.length) return;

    const validQuestions = parsedData.filter(q => !q.error);
    if (validQuestions.length === 0) {
      toast({
        title: "No valid questions",
        description: "Please fix the errors before uploading.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedQuizId) {
      toast({
        title: "No quiz selected",
        description: "Please select a quiz to add questions to.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload questions to Supabase
      const questionsToInsert = validQuestions.map(q => ({
        question: q.question,
        option_a: q.optionA,
        option_b: q.optionB,
        option_c: q.optionC,
        option_d: q.optionD,
        correct_index: q.correctIndex
      }));

      const batchSize = 10;
      const batches = [];
      for (let i = 0; i < questionsToInsert.length; i += batchSize) {
        batches.push(questionsToInsert.slice(i, i + batchSize));
      }

      const insertedQuestionIds: number[] = [];
      for (let i = 0; i < batches.length; i++) {
        const { data: insertedData, error } = await supabase
          .from('questions')
          .insert(batches[i])
          .select('id');

        if (error) throw error;

        // Collect inserted question IDs
        if (insertedData) {
          insertedQuestionIds.push(...insertedData.map(q => q.id));
        }

        // Update progress
        const progress = Math.round(((i + 1) / batches.length) * 100);
        setUploadProgress(progress);
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Link questions to the selected quiz
      if (insertedQuestionIds.length > 0) {
        // Get current max order_index for this quiz
        const { count } = await supabase
          .from('quiz_questions')
          .select('*', { count: 'exact', head: true })
          .eq('quiz_id', selectedQuizId);
        const startIndex = (count || 0) + 1;

        // Insert quiz-question relationships
        const quizQuestionLinks = insertedQuestionIds.map((questionId, index) => ({
          quiz_id: selectedQuizId,
          question_id: questionId,
          order_index: startIndex + index
        }));

        const { error: linkError } = await supabase
          .from('quiz_questions')
          .insert(quizQuestionLinks);

        if (linkError) throw linkError;
      }

      toast({
        title: "Upload successful!",
        description: `${validQuestions.length} questions have been added to the database.`,
      });

      // Reset form
      setFile(null);
      setParsedData([]);
      setUploadProgress(0);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `question,optionA,optionB,optionC,optionD,correctIndex
"What is the capital of France?","London","Berlin","Paris","Madrid",2
"Which planet is known as the Red Planet?","Venus","Mars","Jupiter","Saturn",1
"What is 2 + 2?","3","4","5","6",1`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validQuestions = parsedData.filter(q => !q.error);
  const errorQuestions = parsedData.filter(q => q.error);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bulk Upload Questions</h1>
            <p className="text-gray-600 mt-2">Upload questions in CSV format and link them to a specific quiz</p>
          </div>
          
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </Button>
        </div>

        {/* Quiz Selector */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>Select Quiz</CardTitle>
            <p className="text-gray-600">Choose which quiz to add the uploaded questions to</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label className="font-semibold text-lg">Quiz:</label>
              <select
                value={selectedQuizId ?? ''}
                onChange={e => setSelectedQuizId(Number(e.target.value) || null)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
              >
                <option value="">-- Choose a quiz --</option>
                {quizzes.map(q => (
                  <option key={q.id} value={q.id}>{q.title}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UploadIcon className="w-5 h-5 text-blue-600" />
              <span>Upload CSV File</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your CSV file here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Or click to browse and select a file
                  </p>
                  
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                  >
                    Choose File
                  </label>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Format: question, optionA, optionB, optionC, optionD, correctIndex (0-3)</p>
                  <p>Maximum file size: 10MB</p>
                </div>
              </div>
            </div>

            {file && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">{file.name}</div>
                      <div className="text-sm text-gray-600">
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setParsedData([]);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {isUploading && (
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Uploading questions...
                  </span>
                  <span className="text-sm text-gray-500">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Data */}
        {parsedData.length > 0 && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{parsedData.length}</div>
                      <div className="text-sm text-gray-600">Total Questions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{validQuestions.length}</div>
                      <div className="text-sm text-gray-600">Valid Questions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{errorQuestions.length}</div>
                      <div className="text-sm text-gray-600">Errors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Preview */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
                <p className="text-gray-600">Review the parsed questions before uploading</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Option A</TableHead>
                        <TableHead>Option B</TableHead>
                        <TableHead>Option C</TableHead>
                        <TableHead>Option D</TableHead>
                        <TableHead>Correct</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedData.map((question, index) => (
                        <TableRow key={index} className={question.error ? "bg-red-50" : "hover:bg-gray-50"}>
                          <TableCell className="max-w-xs truncate">
                            {question.question}
                          </TableCell>
                          <TableCell>{question.optionA}</TableCell>
                          <TableCell>{question.optionB}</TableCell>
                          <TableCell>{question.optionC}</TableCell>
                          <TableCell>{question.optionD}</TableCell>
                          <TableCell>
                            {!question.error && (
                              <Badge variant="secondary">
                                {String.fromCharCode(65 + question.correctIndex)}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {question.error ? (
                              <div>
                                <Badge className="bg-red-100 text-red-700 mb-1">Error</Badge>
                                <div className="text-xs text-red-600">{question.error}</div>
                              </div>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">Valid</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Upload Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={isUploading || validQuestions.length === 0}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isUploading ? "Uploading..." : `Upload ${validQuestions.length} Questions`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Upload;
