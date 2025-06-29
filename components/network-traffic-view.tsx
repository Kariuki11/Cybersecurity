"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Globe, TrendingUp, AlertTriangle, Download, Filter } from "lucide-react"
import {
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
  AreaChart,
  Area,
} from "recharts"

const trafficData = [
  { time: "00:00", inbound: 120, outbound: 80, suspicious: 5 },
  { time: "02:00", inbound: 90, outbound: 60, suspicious: 3 },
  { time: "04:00", inbound: 70, outbound: 45, suspicious: 2 },
  { time: "06:00", inbound: 110, outbound: 75, suspicious: 4 },
  { time: "08:00", inbound: 200, outbound: 150, suspicious: 12 },
  { time: "10:00", inbound: 280, outbound: 200, suspicious: 8 },
  { time: "12:00", inbound: 320, outbound: 240, suspicious: 15 },
  { time: "14:00", inbound: 300, outbound: 220, suspicious: 10 },
  { time: "16:00", inbound: 250, outbound: 180, suspicious: 6 },
  { time: "18:00", inbound: 180, outbound: 130, suspicious: 4 },
  { time: "20:00", inbound: 150, outbound: 100, suspicious: 3 },
  { time: "22:00", inbound: 130, outbound: 90, suspicious: 2 },
]

const protocolData = [
  { name: "HTTP/HTTPS", value: 45, color: "#3b82f6" },
  { name: "TCP", value: 25, color: "#10b981" },
  { name: "UDP", value: 15, color: "#f59e0b" },
  { name: "ICMP", value: 8, color: "#ef4444" },
  { name: "Other", value: 7, color: "#6b7280" },
]

const topTalkersData = [
  { ip: "192.168.1.10", bytes: 2400000, connections: 1250 },
  { ip: "192.168.1.25", bytes: 1800000, connections: 980 },
  { ip: "192.168.1.45", bytes: 1600000, connections: 750 },
  { ip: "192.168.1.78", bytes: 1200000, connections: 650 },
  { ip: "192.168.1.92", bytes: 900000, connections: 420 },
]

const geographicData = [
  { country: "United States", requests: 45000, suspicious: 120 },
  { country: "United Kingdom", requests: 12000, suspicious: 45 },
  { country: "Germany", requests: 8500, suspicious: 30 },
  { country: "China", requests: 6200, suspicious: 180 },
  { country: "Russia", requests: 4800, suspicious: 220 },
  { country: "Brazil", requests: 3200, suspicious: 25 },
]

export function NetworkTrafficView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Network Traffic Analysis</h1>
          <p className="text-muted-foreground">Real-time network monitoring and traffic pattern analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Traffic Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 TB</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Current active sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-muted-foreground">Anomalies detected today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Of total capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Traffic Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Real-time Traffic Flow</CardTitle>
              <CardDescription>Network traffic patterns over the last 24 hours</CardDescription>
            </div>
            <Select defaultValue="24h">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="inbound" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="outbound" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Line type="monotone" dataKey="suspicious" stroke="#ef4444" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Protocol Distribution and Top Talkers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
            <CardDescription>Network traffic breakdown by protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Network Talkers</CardTitle>
            <CardDescription>Highest bandwidth consuming devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTalkersData.map((talker, index) => (
                <div key={talker.ip} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium font-mono">{talker.ip}</p>
                      <p className="text-sm text-muted-foreground">{talker.connections} connections</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{(talker.bytes / 1000000).toFixed(1)} MB</p>
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Traffic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Traffic Distribution</CardTitle>
          <CardDescription>Network traffic origins and suspicious activity by country</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geographicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="#3b82f6" name="Total Requests" />
              <Bar dataKey="suspicious" fill="#ef4444" name="Suspicious Activity" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Network Anomalies */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Network Anomalies</CardTitle>
          <CardDescription>Unusual network patterns detected by AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "14:32:15",
                type: "Unusual Traffic Spike",
                source: "192.168.1.45",
                severity: "High",
                description: "300% increase in outbound traffic detected",
              },
              {
                time: "14:28:42",
                type: "Port Scanning",
                source: "203.0.113.12",
                severity: "Medium",
                description: "Sequential port scanning across multiple hosts",
              },
              {
                time: "14:25:18",
                type: "DNS Tunneling",
                source: "192.168.1.78",
                severity: "High",
                description: "Suspicious DNS queries indicating data exfiltration",
              },
              {
                time: "14:20:55",
                type: "Bandwidth Anomaly",
                source: "192.168.1.92",
                severity: "Low",
                description: "Unexpected bandwidth usage pattern detected",
              },
            ].map((anomaly, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      anomaly.severity === "High"
                        ? "bg-red-500"
                        : anomaly.severity === "Medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{anomaly.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {anomaly.source} • {anomaly.time}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{anomaly.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      anomaly.severity === "High"
                        ? "destructive"
                        : anomaly.severity === "Medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {anomaly.severity}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
