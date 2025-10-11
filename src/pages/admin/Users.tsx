import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Eye, Mail, Send, Users as UsersIcon, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendAdminEmail, sendBulkAdminEmails, AdminEmailData } from "@/lib/adminEmailService";
import { debugEmailService, debugQuizEmailService } from "@/lib/emailDebug";
import { testSMTPEmail } from "@/lib/emailTest";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    emailType: 'custom' as 'custom' | 'announcement' | 'reminder' | 'congratulations'
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ completed: 0, total: 0 });
  // SMTP is now the only email provider
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email');
    if (!error && Array.isArray(data)) {
      setUsers(data);
    }
    setIsLoading(false);
  };

  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.message) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      if (selectedUsers.length === 1) {
        // Send to single user
        const user = users.find(u => u.id === selectedUsers[0]);
        if (user) {
          const result = await sendAdminEmail({
            email: user.email,
            userName: user.full_name || 'User',
            subject: emailData.subject,
            message: emailData.message,
            emailType: emailData.emailType
          });

          if (result.success) {
            toast({
              title: "Email Sent",
              description: `Email sent successfully to ${user.full_name}`,
            });
            setEmailDialogOpen(false);
            setEmailData({ subject: '', message: '', emailType: 'custom' });
            setSelectedUsers([]);
          } else {
            toast({
              title: "Error",
              description: result.error || "Failed to send email",
              variant: "destructive",
            });
          }
        }
      } else {
        // Send to multiple users
        const emailPromises = selectedUsers.map(userId => {
          const user = users.find(u => u.id === userId);
          if (user) {
            return {
              email: user.email,
              userName: user.full_name || 'User',
              subject: emailData.subject,
              message: emailData.message,
              emailType: emailData.emailType
            };
          }
          return null;
        }).filter(Boolean) as AdminEmailData[];

        await sendBulkAdminEmails(
          emailPromises,
          (completed, total) => {
            setBulkProgress({ completed, total });
          },
          (results) => {
            toast({
              title: "Bulk Email Complete",
              description: `Sent ${results.success} emails successfully, ${results.failed} failed`,
            });
            setEmailDialogOpen(false);
            setEmailData({ subject: '', message: '', emailType: 'custom' });
            setSelectedUsers([]);
            setBulkProgress({ completed: 0, total: 0 });
          }
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email(s)",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
  };

  const handleDebugEmail = async () => {
    console.log('=== Starting Email Debug ===');
    
    const adminResult = await debugEmailService();
    const quizResult = await debugQuizEmailService();
    
    if (adminResult === true) {
      toast({
        title: "Debug Complete",
        description: "Admin email function is working correctly",
      });
    } else if (adminResult === 'function-not-deployed') {
      toast({
        title: "Debug Result",
        description: "Admin email function not deployed. Using fallback method.",
        variant: "default",
      });
    } else if (quizResult === true) {
      toast({
        title: "Debug Result", 
        description: "Using quiz completion email function as fallback",
        variant: "default",
      });
    } else {
      toast({
        title: "Debug Failed",
        description: "Email service is not working. Check console for details.",
        variant: "destructive",
      });
    }
  };

  const handleTestEmail = async () => {
    const testEmail = prompt('Enter test email address:');
    if (!testEmail) return;

    setIsSendingEmail(true);
    
    try {
      const result = await testSMTPEmail(testEmail);

      if (result.success) {
        toast({
          title: "Test Email Sent",
          description: "Test email sent successfully via SMTP (Brevo)",
        });
      } else {
        toast({
          title: "Test Failed",
          description: result.error || "Failed to send test email via SMTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test Error",
        description: "Error testing SMTP email",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
            <p className="text-gray-600 mt-2">List of all registered users</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setEmailDialogOpen(true)}
              disabled={selectedUsers.length === 0}
              className="flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email ({selectedUsers.length})</span>
            </Button>
            <Button
              onClick={handleSelectAll}
              className="flex items-center space-x-2"
            >
              <UsersIcon className="w-4 h-4" />
              <span>{selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleDebugEmail}
              className="flex items-center space-x-2 text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <XCircle className="w-4 h-4" />
              <span>Debug Email</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleTestEmail}
              disabled={isSendingEmail}
              className="flex items-center space-x-2 text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Mail className="w-4 h-4" />
              <span>Test SMTP</span>
            </Button>
          </div>
        </div>
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>User Details</span>
              {selectedUsers.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedUsers.length} selected
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === users.length && users.length > 0}
                          onChange={handleSelectAll}
                          className="rounded"
                        />
                      </TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.id}
                        className={`hover:bg-blue-50 ${selectedUsers.includes(user.id) ? 'bg-blue-100' : ''}`}
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                            className="rounded"
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.location.href = `/admin/users/${user.id}`}
                              className="flex items-center space-x-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUsers([user.id]);
                                setEmailDialogOpen(true);
                              }}
                              className="flex items-center space-x-1"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Dialog */}
        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-blue-600" />
                <span>Send Email to {selectedUsers.length} User{selectedUsers.length !== 1 ? 's' : ''}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedUsers.length === 1 
                  ? `Send a personalized email to ${users.find(u => u.id === selectedUsers[0])?.full_name}`
                  : `Send the same email to ${selectedUsers.length} selected users`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  📧 Using SMTP (Brevo) - smtp-relay.brevo.com:587
                </p>
              </div>

              <div>
                <Label htmlFor="emailType">Email Type</Label>
                <Select
                  value={emailData.emailType}
                  onValueChange={(value: any) => setEmailData(prev => ({ ...prev, emailType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Message</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="congratulations">Congratulations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your message here..."
                  rows={6}
                />
              </div>

              {bulkProgress.total > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Sending emails...</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Progress: {bulkProgress.completed} / {bulkProgress.total}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleSendEmail}
                disabled={isSendingEmail || !emailData.subject || !emailData.message}
                className="flex items-center space-x-2"
              >
                {isSendingEmail ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email{selectedUsers.length > 1 ? 's' : ''}</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Users; 