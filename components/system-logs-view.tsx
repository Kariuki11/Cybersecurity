"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Search, Filter, AlertTriangle, Info, AlertCircle, XCircle, Download, RefreshCw } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const logData = [
  { hour: "00:00", error: 12, warning: 45, info: 234 },
  { hour: "04:00", error: 8, warning: 32, info: 189 },
  { hour: "08:00", error: 23, warning: 67, info: 456 },
  { hour: "12:00", error: 34, warning: 89, info: 567 },
  { hour: "16:00", error: 19, warning: 54, info: 398 },
  { hour: "20:00", error: 15, warning: 41, info: 287 },
]

const logs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15.234",
    level: "ERROR",
    source: "auth-service",
    message: "Failed authentication attempt for user admin from 203.0.113.45",
    details: "Invalid password provided. Account locked after 5 failed attempts.",
    anomaly: true,
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:31:58.123",
    level: "WARNING",
    source: "firewall",
    message: "Blocked connection attempt to port 22 from 198.51.100.23",
    details: "SSH connection blocked by security policy. Source IP added to watchlist.",
    anomaly: false,
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:31:45.567",
    level: "ERROR",
    source: "database",
    message: "Connection timeout to primary database server",
    details: "Failed to establish connection within 30 seconds. Failover initiated.",
    anomaly: true,
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:31:32.890",
    level: "INFO",
    source: "web-server",
    message: "HTTP request processed successfully",
    details: "GET /api/users - 200 OK - Response time: 45ms",
    anomaly: false,
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:31:20.456",
    level: "WARNING",
    source: "intrusion-detection",
    message: "Suspicious network activity detected",
    details: "Multiple port scans from 172.16.0.8. Pattern matches known reconnaissance tools.",
    anomaly: true,
  },
  {
    id: 6,
    timestamp: "2024-01-15 14:31:08.789",
    level: "ERROR",
    source: "mail-server",
    message: "SMTP authentication failed",
    details: "Invalid credentials for user@company.com. Possible brute force attempt.",
    anomaly: true,
  },
  {
    id: 7,
    timestamp: "2024-01-15 14:30:55.123",
    level: "INFO",
    source: "backup-service",
    message: "Scheduled backup completed successfully",
    details: "Database backup completed. Size: 2.3GB. Duration: 15 minutes.",
    anomaly: false,
  },
  {
    id: 8,
    timestamp: "2024-01-15 14:30:42.456",
    level: "WARNING",
    source: "load-balancer",
    message: "High CPU usage detected on server node-03",
    details: "CPU utilization: 89%. Load balancer redistributing traffic.",
    anomaly: false,
  },
]

const topSources = [
  { source: "auth-service", errors: 45, warnings: 23 },
  { source: "firewall", errors: 12, warnings: 67 },
  { source: "database", errors: 34, warnings: 15 },
  { source: "web-server", errors: 8, warnings: 45 },
  { source: "intrusion-detection", errors: 23, warnings: 89 },
]

export function SystemLogsView() {
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterSource, setFilterSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAnomaliesOnly, setShowAnomaliesOnly] = useState(false)

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "INFO":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "destructive"
      case "WARNING":
        return "default"
      case "INFO":
        return "secondary"
      default:
        return "default"
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === "all" || log.level === filterLevel
    const matchesSource = filterSource === "all" || log.source === filterSource
    const matchesSearch =
      searchTerm === "" ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAnomaly = !showAnomaliesOnly || log.anomaly

    return matchesLevel && matchesSource && matchesSearch && matchesAnomaly
  })

  return (
    <div className="space-y-6">
      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">156</p>
                <p className="text-sm text-muted-foreground">Errors (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">423</p>
                <p className="text-sm text-muted-foreground">Warnings (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">2,341</p>
                <p className="text-sm text-muted-foreground">Info (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">47</p>
                <p className="text-sm text-muted-foreground">Anomalies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Event Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Log Event Distribution</CardTitle>
          <CardDescription>Count of log events by type over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={logData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="error" fill="#ef4444" name="Errors" />
              <Bar dataKey="warning" fill="#f59e0b" name="Warnings" />
              <Bar dataKey="info" fill="#3b82f6" name="Info" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Log Filters & Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="WARNING">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="auth-service">Auth Service</SelectItem>
                <SelectItem value="firewall">Firewall</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="web-server">Web Server</SelectItem>
                <SelectItem value="intrusion-detection">IDS</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showAnomaliesOnly ? "default" : "outline"}
              onClick={() => setShowAnomaliesOnly(!showAnomaliesOnly)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Anomalies Only
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Viewer and Top Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              System Logs
            </CardTitle>
            <CardDescription>
              Showing {filteredLogs.length} of {logs.length} log entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 border rounded-lg ${
                      log.anomaly ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getLevelIcon(log.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getLevelColor(log.level) as any}>{log.level}</Badge>
                          <span className="text-sm font-medium">{log.source}</span>
                          <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                          {log.anomaly && (
                            <Badge variant="destructive" className="text-xs">
                              ANOMALY
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm mb-1">{log.message}</p>
                        <p className="text-xs text-muted-foreground">{log.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Error Sources</CardTitle>
            <CardDescription>Systems generating the most errors and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSources.map((source, index) => (
                <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{source.source}</p>
                      <p className="text-xs text-muted-foreground">
                        {source.errors} errors, {source.warnings} warnings
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      {source.errors + source.warnings}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
