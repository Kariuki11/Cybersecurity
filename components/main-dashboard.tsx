"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  AlertTriangle,
  Activity,
  Eye,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Globe,
  Zap,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

interface MainDashboardProps {
  userRole: "admin" | "analyst"
}

const trafficData = [
  { time: "00:00", normal: 120, suspicious: 5 },
  { time: "04:00", normal: 80, suspicious: 3 },
  { time: "08:00", normal: 200, suspicious: 12 },
  { time: "12:00", normal: 300, suspicious: 8 },
  { time: "16:00", normal: 250, suspicious: 15 },
  { time: "20:00", normal: 180, suspicious: 6 },
]

const threatData = [
  { name: "Malware", value: 35, color: "#ef4444" },
  { name: "Phishing", value: 25, color: "#f97316" },
  { name: "DDoS", value: 20, color: "#eab308" },
  { name: "Intrusion", value: 15, color: "#3b82f6" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const alertsData = [
  { severity: "Critical", count: 3 },
  { severity: "High", count: 12 },
  { severity: "Medium", count: 28 },
  { severity: "Low", count: 45 },
]

export function MainDashboard({ userRole }: MainDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-muted-foreground">Real-time cybersecurity monitoring and threat analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View All Alerts
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="mr-2 h-4 w-4" />
            Run Manual Scan
          </Button>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94/100</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 from yesterday
            </p>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">7</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -3 from yesterday
            </p>
            <div className="flex gap-1 mt-2">
              <Badge variant="destructive" className="text-xs">
                3 Critical
              </Badge>
              <Badge variant="secondary" className="text-xs">
                4 High
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Traffic</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB/s</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last hour
            </p>
            <div className="text-xs text-muted-foreground mt-1">Normal activity detected</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomalies (24h)</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -8 from yesterday
            </p>
            <div className="text-xs text-green-600 mt-1">All investigated</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Network Traffic Analysis</CardTitle>
            <CardDescription>Real-time traffic monitoring (Last 24 hours)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="suspicious" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Type Distribution</CardTitle>
            <CardDescription>Current threat landscape breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
            <CardDescription>Latest threats detected by the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  type: "Malware Detection",
                  severity: "Critical",
                  source: "192.168.1.45",
                  time: "2 minutes ago",
                  status: "investigating",
                },
                {
                  id: 2,
                  type: "Suspicious Login",
                  severity: "High",
                  source: "203.0.113.12",
                  time: "15 minutes ago",
                  status: "resolved",
                },
                {
                  id: 3,
                  type: "DDoS Attempt",
                  severity: "Medium",
                  source: "Multiple IPs",
                  time: "1 hour ago",
                  status: "mitigated",
                },
                {
                  id: 4,
                  type: "Port Scan",
                  severity: "Low",
                  source: "198.51.100.23",
                  time: "2 hours ago",
                  status: "resolved",
                },
              ].map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        alert.severity === "Critical"
                          ? "bg-red-500"
                          : alert.severity === "High"
                            ? "bg-orange-500"
                            : alert.severity === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.source} • {alert.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        alert.severity === "Critical"
                          ? "destructive"
                          : alert.severity === "High"
                            ? "destructive"
                            : alert.severity === "Medium"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    {alert.status === "resolved" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : alert.status === "investigating" ? (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Backend services status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "AI Detection Engine", status: "online", uptime: "99.9%" },
              { name: "Network Monitor", status: "online", uptime: "99.8%" },
              { name: "Log Analyzer", status: "online", uptime: "99.7%" },
              { name: "Threat Database", status: "online", uptime: "100%" },
              { name: "Alert System", status: "maintenance", uptime: "98.5%" },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      service.status === "online"
                        ? "bg-green-500"
                        : service.status === "maintenance"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs capitalize">{service.status}</span>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Active Users</span>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Analysts online</p>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Global Coverage</span>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Countries monitored</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Summary by Severity</CardTitle>
          <CardDescription>Distribution of security alerts over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
