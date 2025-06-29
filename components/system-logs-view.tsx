"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter, Download, AlertTriangle, Info, XCircle, CheckCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:35:22",
    level: "ERROR",
    source: "auth-service",
    message: "Failed login attempt from IP 203.0.113.45 - user: admin",
    details: "Multiple failed authentication attempts detected from suspicious IP address",
    anomaly: true,
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:34:18",
    level: "WARNING",
    source: "firewall",
    message: "Blocked connection attempt to port 22 from 198.51.100.23",
    details: "SSH connection attempt blocked by security policy",
    anomaly: false,
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:33:45",
    level: "INFO",
    source: "web-server",
    message: "HTTP request processed successfully - 200 OK",
    details: "Normal web traffic processed without issues",
    anomaly: false,
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:32:12",
    level: "ERROR",
    source: "database",
    message: "Unusual query pattern detected - potential SQL injection",
    details: "Suspicious database queries with unusual syntax patterns",
    anomaly: true,
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:31:08",
    level: "WARNING",
    source: "network-monitor",
    message: "High bandwidth usage detected from 192.168.1.45",
    details: "Network traffic exceeding normal thresholds",
    anomaly: true,
  },
  {
    id: 6,
    timestamp: "2024-01-15 14:30:55",
    level: "INFO",
    source: "backup-service",
    message: "Scheduled backup completed successfully",
    details: "Daily backup process completed without errors",
    anomaly: false,
  },
]

const logEventData = [
  { hour: "00", errors: 2, warnings: 5, info: 45 },
  { hour: "04", errors: 1, warnings: 3, info: 32 },
  { hour: "08", errors: 8, warnings: 12, info: 78 },
  { hour: "12", errors: 15, warnings: 25, info: 120 },
  { hour: "16", errors: 12, warnings: 18, info: 95 },
  { hour: "20", errors: 6, warnings: 8, info: 65 },
]

const errorSourceData = [
  { source: "auth-service", count: 45 },
  { source: "database", count: 32 },
  { source: "web-server", count: 28 },
  { source: "firewall", count: 18 },
  { source: "network-monitor", count: 12 },
]

export function SystemLogsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [showAnomaliesOnly, setShowAnomaliesOnly] = useState(false)

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesSource = sourceFilter === "all" || log.source === sourceFilter
    const matchesAnomaly = !showAnomaliesOnly || log.anomaly

    return matchesSearch && matchesLevel && matchesSource && matchesAnomaly
  })

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "INFO":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "destructive"
      case "WARNING":
        return "secondary"
      case "INFO":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">System Log Analysis</h1>
          <p className="text-muted-foreground">Monitor system events and identify security anomalies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Search
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Log Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Log Event Distribution</CardTitle>
            <CardDescription>System log events over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={logEventData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="errors" fill="#ef4444" name="Errors" />
                <Bar dataKey="warnings" fill="#f59e0b" name="Warnings" />
                <Bar dataKey="info" fill="#3b82f6" name="Info" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Error Sources</CardTitle>
            <CardDescription>Services generating the most errors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={errorSourceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="source" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Log Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs by message or source..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="WARNING">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="auth-service">Auth Service</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="web-server">Web Server</SelectItem>
                <SelectItem value="firewall">Firewall</SelectItem>
                <SelectItem value="network-monitor">Network Monitor</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showAnomaliesOnly ? "default" : "outline"}
              onClick={() => setShowAnomaliesOnly(!showAnomaliesOnly)}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anomalies Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Viewer */}
      <Card>
        <CardHeader>
          <CardTitle>System Logs ({filteredLogs.length} entries)</CardTitle>
          <CardDescription>Real-time system log entries with AI-powered anomaly detection</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 border rounded-lg ${
                    log.anomaly ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getLevelIcon(log.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={getLevelColor(log.level)}>{log.level}</Badge>
                          <span className="text-sm text-muted-foreground font-mono">{log.timestamp}</span>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                          {log.anomaly && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Anomaly
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium mb-1">{log.message}</p>
                        <p className="text-xs text-muted-foreground">{log.details}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
