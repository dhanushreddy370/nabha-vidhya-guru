import { Users, Target, BookOpen, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/MetricCard";
import mockData from "@/data/mockData.json";

const DashboardPage = () => {
  const { reportDate, dailyDigest, subjectPerformance, weeklyTrend } = mockData;

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Daily Digest</h1>
        <p className="text-lg text-muted-foreground">
          Snapshot from {formatDate(reportDate)}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Students"
          value={dailyDigest.activeStudents}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Class Average Score"
          value={`${dailyDigest.classAverageScore}%`}
          icon={Target}
          trend={{ value: 3, isPositive: true }}
          variant="success"
        />
        <MetricCard
          title="Lessons Completed"
          value={dailyDigest.lessonsCompleted}
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Time on App"
          value={dailyDigest.totalTime}
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          variant="warning"
        />
      </div>

      {/* Top Struggle Concept */}
      <Card className="border-warning/30 bg-warning/5 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <span>Top Struggle Concept</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold text-foreground mb-2">
            {dailyDigest.topStruggleConcept}
          </p>
          <p className="text-muted-foreground">
            This topic had the most incorrect answers yesterday. Consider reviewing this concept with the class.
          </p>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Performance Chart */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Subject Performance (Yesterday)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="subject" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="score" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trend Chart */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Class Average Trend (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;