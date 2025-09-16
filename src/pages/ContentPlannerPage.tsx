import { useState } from "react";
import { Plus, X, Send, BookOpen, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import mockData from "@/data/mockData.json";

const ContentPlannerPage = () => {
  const { availableLessons } = mockData;
  const [tomorrowQueue, setTomorrowQueue] = useState<Array<{id: string, title: string, chapter: string, subject: string}>>([]);

  const handleAddToQueue = (lesson: any, subject: string) => {
    const lessonWithSubject = { ...lesson, subject };
    if (!tomorrowQueue.find(item => item.id === lesson.id)) {
      setTomorrowQueue([...tomorrowQueue, lessonWithSubject]);
    }
  };

  const handleRemoveFromQueue = (lessonId: string) => {
    setTomorrowQueue(tomorrowQueue.filter(item => item.id !== lessonId));
  };

  const handleConfirmQueue = () => {
    // In a real app, this would send the queue to the backend
    alert(`Successfully queued ${tomorrowQueue.length} lessons for tomorrow's sync!`);
    setTomorrowQueue([]);
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-primary/10 text-primary",
      Science: "bg-success/10 text-success", 
      English: "bg-warning/10 text-warning",
    };
    return colors[subject] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Content Planner</h1>
        <p className="text-lg text-muted-foreground">
          Plan tomorrow's lessons and activities for your students
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Lessons */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Available Lessons</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(availableLessons).map(([subject, lessons]) => (
              <div key={subject} className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center space-x-2">
                  <Badge className={getSubjectColor(subject)}>
                    {subject}
                  </Badge>
                </h3>
                <div className="space-y-2">
                  {lessons.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.chapter}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddToQueue(lesson, subject)}
                        disabled={tomorrowQueue.some(item => item.id === lesson.id)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tomorrow's Queue */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Tomorrow's Queue ({tomorrowQueue.length})</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tomorrowQueue.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No lessons queued yet</p>
                <p className="text-sm">Add lessons from the left panel</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {tomorrowQueue.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center space-x-3 p-3 bg-card border rounded-lg shadow-soft"
                    >
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getSubjectColor(lesson.subject)} variant="outline">
                            {lesson.subject}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{index + 1}</span>
                        </div>
                        <p className="font-medium text-foreground">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.chapter}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFromQueue(lesson.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleConfirmQueue}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Confirm & Push for Tomorrow ({tomorrowQueue.length} lessons)
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentPlannerPage;