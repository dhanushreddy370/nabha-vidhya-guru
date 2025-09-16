import { useState } from "react";
import { Search, AlertCircle, Clock, TrendingDown, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import mockData from "@/data/mockData.json";

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { studentReports } = mockData;

  // Filter flagged students
  const flaggedStudents = studentReports.filter(student => student.flag);
  
  // Filter students based on search
  const filteredStudents = studentReports.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFlagIcon = (flagType: string | null) => {
    switch (flagType) {
      case "performance":
        return TrendingDown;
      case "inactive":
        return UserX;
      case "engagement":
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const getFlagVariant = (flagType: string | null) => {
    switch (flagType) {
      case "performance":
        return "destructive";
      case "inactive":
        return "secondary";
      case "engagement":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Students Overview</h1>
        <p className="text-lg text-muted-foreground">
          Monitor student progress and identify those who need attention
        </p>
      </div>

      {/* Needs Attention Section */}
      <Card className="border-warning/30 bg-warning/5 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <AlertCircle className="w-5 h-5" />
            <span>Students Needing Attention ({flaggedStudents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {flaggedStudents.length === 0 ? (
            <p className="text-muted-foreground">Great! No students need immediate attention today.</p>
          ) : (
            flaggedStudents.map((student) => {
              const FlagIcon = getFlagIcon(student.flagType);
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-card rounded-lg border shadow-soft"
                >
                  <div className="flex items-center space-x-3">
                    <FlagIcon className="w-5 h-5 text-warning" />
                    <div>
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.flag}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={getFlagVariant(student.flagType)}>
                      {student.flagType || "flagged"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Score: {student.avgScore}%
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Student Data Table */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-foreground">Student Name</th>
                  <th className="text-left p-4 font-semibold text-foreground">Last Active</th>
                  <th className="text-left p-4 font-semibold text-foreground">Avg. Score</th>
                  <th className="text-left p-4 font-semibold text-foreground">Time on App</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <button className="text-primary hover:text-primary-hover font-medium transition-colors">
                        {student.name}
                      </button>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${
                        student.avgScore >= 80 ? "text-success" :
                        student.avgScore >= 60 ? "text-warning" :
                        "text-destructive"
                      }`}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{student.timeOnApp}</td>
                    <td className="p-4">
                      {student.flag ? (
                        <Badge variant={getFlagVariant(student.flagType)}>
                          Needs Attention
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-success border-success">
                          Good
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage;