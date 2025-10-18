import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import AdminLayout from "@/components/AdminLayout";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  Upload,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

interface DailyVerse {
  id: string;
  verse_reference: string;
  verse_text: string;
  verse_text_hindi?: string;
  explanation?: string;
  explanation_hindi?: string;
  application?: string;
  application_hindi?: string;
  prayer?: string;
  prayer_hindi?: string;
  image_url?: string;
  image_alt_text?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function DailyVerses() {
  const [verses, setVerses] = useState<DailyVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<DailyVerse>>({
    verse_reference: '',
    verse_text: '',
    verse_text_hindi: '',
    explanation: '',
    explanation_hindi: '',
    application: '',
    application_hindi: '',
    prayer: '',
    prayer_hindi: '',
    image_url: '',
    image_alt_text: '',
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('daily_verses')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setVerses(data || []);
    } catch (error) {
      console.error('Error fetching verses:', error);
      toast.error('Failed to fetch daily verses');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `daily-verses/${fileName}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = formData.image_url;
      
      // Upload image if a new file is selected
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Stop if upload failed
        }
      }

      const verseData = {
        ...formData,
        image_url: imageUrl
      };

      if (editingId) {
        // Update existing verse
        const { error } = await supabase
          .from('daily_verses')
          .update(verseData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Daily verse updated successfully');
      } else {
        // Create new verse
        const { error } = await supabase
          .from('daily_verses')
          .insert([verseData]);

        if (error) throw error;
        toast.success('Daily verse created successfully');
      }

      // Reset form
      setEditingId(null);
      setShowForm(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setFormData({
        verse_reference: '',
        verse_text: '',
        verse_text_hindi: '',
        explanation: '',
        explanation_hindi: '',
        application: '',
        application_hindi: '',
        prayer: '',
        prayer_hindi: '',
        image_url: '',
        image_alt_text: '',
        is_active: true,
        display_order: 0
      });
      fetchVerses();
    } catch (error) {
      console.error('Error saving verse:', error);
      toast.error('Failed to save daily verse');
    }
  };

  const handleEdit = (verse: DailyVerse) => {
    setEditingId(verse.id);
    setFormData(verse);
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this daily verse?')) return;

    try {
      const { error } = await supabase
        .from('daily_verses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Daily verse deleted successfully');
      fetchVerses();
    } catch (error) {
      console.error('Error deleting verse:', error);
      toast.error('Failed to delete daily verse');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('daily_verses')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Daily verse ${!isActive ? 'activated' : 'deactivated'}`);
      fetchVerses();
    } catch (error) {
      console.error('Error toggling verse status:', error);
      toast.error('Failed to update verse status');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setFormData({
      verse_reference: '',
      verse_text: '',
      verse_text_hindi: '',
      explanation: '',
      explanation_hindi: '',
      application: '',
      application_hindi: '',
      prayer: '',
      prayer_hindi: '',
      image_url: '',
      image_alt_text: '',
      is_active: true,
      display_order: 0
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading daily verses...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Verses Management</h1>
          <p className="text-gray-600 mt-2">Manage daily Bible verses with images and translations</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Verse</span>
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{editingId ? 'Edit Daily Verse' : 'Add New Daily Verse'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="verse_reference">Verse Reference</Label>
                <Input
                  id="verse_reference"
                  value={formData.verse_reference || ''}
                  onChange={(e) => setFormData({ ...formData, verse_reference: e.target.value })}
                  placeholder="e.g., John 3:16"
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="verse_text">Verse Text (English)</Label>
              <Textarea
                id="verse_text"
                value={formData.verse_text || ''}
                onChange={(e) => setFormData({ ...formData, verse_text: e.target.value })}
                placeholder="Enter the Bible verse text in English..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="verse_text_hindi">Verse Text (Hindi)</Label>
              <Textarea
                id="verse_text_hindi"
                value={formData.verse_text_hindi || ''}
                onChange={(e) => setFormData({ ...formData, verse_text_hindi: e.target.value })}
                placeholder="Enter the Bible verse text in Hindi..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="explanation">Explanation (English)</Label>
              <Textarea
                id="explanation"
                value={formData.explanation || ''}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Enter explanation of the verse..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="explanation_hindi">Explanation (Hindi)</Label>
              <Textarea
                id="explanation_hindi"
                value={formData.explanation_hindi || ''}
                onChange={(e) => setFormData({ ...formData, explanation_hindi: e.target.value })}
                placeholder="Enter explanation of the verse in Hindi..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="application">Application (English)</Label>
              <Textarea
                id="application"
                value={formData.application || ''}
                onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                placeholder="Enter practical application of the verse..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="application_hindi">Application (Hindi)</Label>
              <Textarea
                id="application_hindi"
                value={formData.application_hindi || ''}
                onChange={(e) => setFormData({ ...formData, application_hindi: e.target.value })}
                placeholder="Enter practical application of the verse in Hindi..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="prayer">Prayer (English)</Label>
              <Textarea
                id="prayer"
                value={formData.prayer || ''}
                onChange={(e) => setFormData({ ...formData, prayer: e.target.value })}
                placeholder="Enter a prayer related to the verse..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="prayer_hindi">Prayer (Hindi)</Label>
              <Textarea
                id="prayer_hindi"
                value={formData.prayer_hindi || ''}
                onChange={(e) => setFormData({ ...formData, prayer_hindi: e.target.value })}
                placeholder="Enter a prayer related to the verse in Hindi..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image_upload">Image Upload</Label>
              <div className="space-y-4">
                {/* File Upload */}
                <div className="flex items-center space-x-4">
                  <Input
                    ref={fileInputRef}
                    id="image_upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1"
                    disabled={uploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose File</span>
                  </Button>
                </div>

                {/* Image Preview */}
                {(previewUrl || formData.image_url) && (
                  <div className="relative">
                    <img
                      src={previewUrl || formData.image_url}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeSelectedFile}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Upload Status */}
                {uploading && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Uploading image...</span>
                  </div>
                )}

                {/* Fallback URL Input */}
                <div>
                  <Label htmlFor="image_url">Or enter image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    disabled={!!selectedFile}
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-500 mt-1">
                      File selected - URL input disabled. Remove file to use URL instead.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="image_alt_text">Image Alt Text</Label>
              <Input
                id="image_alt_text"
                value={formData.image_alt_text || ''}
                onChange={(e) => setFormData({ ...formData, image_alt_text: e.target.value })}
                placeholder="Description of the image for accessibility"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active || false}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verses List */}
      <div className="grid gap-4">
        {verses.map((verse) => (
          <Card key={verse.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant={verse.is_active ? "default" : "secondary"}>
                      {verse.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline">
                      Order: {verse.display_order}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(verse.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {verse.verse_reference}
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Text Content */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">English Text:</h4>
                        <p className="text-gray-700 italic">"{verse.verse_text}"</p>
                      </div>

                      {verse.verse_text_hindi && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Hindi Text:</h4>
                          <p className="text-gray-700 italic">"{verse.verse_text_hindi}"</p>
                        </div>
                      )}

                      {verse.explanation && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Explanation:</h4>
                          <p className="text-gray-700 text-sm">{verse.explanation}</p>
                        </div>
                      )}

                      {verse.application && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Application:</h4>
                          <p className="text-gray-700 text-sm">{verse.application}</p>
                        </div>
                      )}

                      {verse.prayer && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Prayer:</h4>
                          <p className="text-gray-700 text-sm italic">"{verse.prayer}"</p>
                        </div>
                      )}
                    </div>

                    {/* Image Preview */}
                    <div className="space-y-4">
                      {verse.image_url ? (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Image Preview:</h4>
                          <div className="relative">
                            <img
                              src={verse.image_url}
                              alt={verse.image_alt_text || 'Daily verse image'}
                              className="w-full h-48 object-cover rounded-lg border"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            {verse.image_alt_text && (
                              <p className="text-xs text-gray-500 mt-1">{verse.image_alt_text}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-500">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">No image</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(verse)}
                    className="flex items-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleActive(verse.id, verse.is_active)}
                    className="flex items-center space-x-1"
                  >
                    {verse.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{verse.is_active ? 'Deactivate' : 'Activate'}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(verse.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {verses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Daily Verses</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first daily verse.</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Verse
            </Button>
          </CardContent>
        </Card>
      )}
      </div>
    </AdminLayout>
  );
}
