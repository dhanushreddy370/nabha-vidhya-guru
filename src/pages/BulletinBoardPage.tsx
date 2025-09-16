import { useState } from "react";
import { MessageSquare, Send, Clock, User, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import mockData from "@/data/mockData.json";

const BulletinBoardPage = () => {
  const { helpRequests, studentReports } = mockData;
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("all");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send the message to the backend
    alert(`Message queued for tomorrow's sync!\nRecipient: ${recipient === "all" ? "All Students" : recipient}\nMessage: ${message}`);
    setMessage("");
    setRecipient("all");
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-primary/10 text-primary",
      Science: "bg-success/10 text-success", 
      English: "bg-warning/10 text-warning",
      "Social Studies": "bg-accent/10 text-accent",
    };
    return colors[subject] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Bulletin Board</h1>
        <p className="text-lg text-muted-foreground">
          Manage help requests and send messages to students
        </p>
      </div>

      <Tabs defaultValue="help-requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="help-requests" className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>Help Request Inbox ({helpRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="send-bulletin" className="flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Send Bulletin</span>
          </TabsTrigger>
        </TabsList>

        {/* Help Requests Tab */}
        <TabsContent value="help-requests">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Recent Help Requests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {helpRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No help requests received</p>
                  <p className="text-sm">Students haven't requested help recently</p>
                </div>
              ) : (
                helpRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 bg-card border rounded-lg shadow-soft hover:shadow-medium transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{request.studentName}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSubjectColor(request.subject)} variant="outline">
                              {request.subject}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(request.date).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">{request.lesson}</p>
                      <p className="text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        "{request.message}"
                      </p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        Respond
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Send Bulletin Tab */}
        <TabsContent value="send-bulletin">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Compose Bulletin</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Send to:</label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {studentReports.map((student) => (
                      <SelectItem key={student.id} value={student.name}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message:</label>
                <Textarea
                  placeholder="Type your message here... This will be delivered in tomorrow's sync."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {message.length}/500 characters
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Delivery Schedule</h4>
                    <p className="text-sm text-muted-foreground">
                      This message will be delivered to student devices during tomorrow's evening sync (after school hours).
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Queue for Tomorrow's Sync
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BulletinBoardPage;