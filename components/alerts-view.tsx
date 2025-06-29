"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Search, Filter, Eye, CheckCircle, Clock, Bug, Shield, Zap, Users } from "lucide-react"

const alerts = [
  {
    id: "ALT-001",
    timestamp: "2024-01-15 14:32:15",
    type: "Malware Detection",
    severity: "Critical",
    sourceIp: "192.168.1.45",
    destIp: "10.0.0.1",
    status: "New",
    description: "Suspicious executable detected attempting to establish C&C communication",
    details: "MD5: a1b2c3d4e5f6... | Process: malware.exe | Port: 443",
  },
  {
    id: "ALT-002",
    timestamp: "2024-01-15 14:28:42",
    type: "Brute Force Attack",
    severity: "High",
    sourceIp: "203.0.113.45",
    destIp: "192.168.1.10",
    status: "Investigating",
    description: "Multiple failed login attempts detected from external IP",
    details: "Failed attempts: 127 | Target: SSH service | Duration: 15 minutes",
  },
  {
    id: "ALT-003",
    timestamp: "2024-01-15 14:25:18",
    type: "Data Exfiltration",
    severity: "High",
    sourceIp: "192.168.2.15",
    destIp: "198.51.100.23",
    status: "New",
    description: "Unusual outbound data transfer detected",
    details: "Volume: 2.3GB | Protocol: HTTPS | Duration: 45 minutes",
  },
  {
    id: "ALT-004",
    timestamp: "2024-01-15 14:20:33",
    type: "Port Scan",
    severity: "Medium",
    sourceIp: "172.16.0.8",
    destIp: "192.168.1.0/24",
    status: "Resolved",
    description: "Network reconnaissance activity detected",
    details: "Ports scanned: 1-1024 | Method: TCP SYN | Duration: 5 minutes",
  },
  {
    id: "ALT-005",
    timestamp: "2024-01-15 14:15:07",
    type: "Insider Threat",
    severity: "Medium",
    sourceIp: "192.168.1.25",
    destIp: "file-server.local",
    status: "New",
    description: "Unauthorized access to sensitive files after hours",
    details: "User: jdoe | Files accessed: 23 | Time: 02:15 AM",
  },
]

const threatIcons = {
  "Malware Detection": Bug,
  "Brute Force Attack": Shield,
  "Data Exfiltration": Zap,
  "Port Scan": Eye,
  "Insider Threat": Users,
}

export function AlertsView() {
  const [selectedAlert, setSelectedAlert] = useState<(typeof alerts)[0] | null>(null)
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "destructive"
      case "Investigating":
        return "default"
      case "Resolved":
        return "secondary"
      default:
        return "default"
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sourceIp.includes(searchTerm) ||
      alert.destIp.includes(searchTerm)

    return matchesSeverity && matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">23</p>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-600">15</p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">5</p>
                <p className="text-sm text-muted-foreground">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts, IPs, or threat types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Threat Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Destination IP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => {
                const ThreatIcon = threatIcons[alert.type as keyof typeof threatIcons] || AlertTriangle
                return (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ThreatIcon className="h-4 w-4" />
                        {alert.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{alert.sourceIp}</TableCell>
                    <TableCell className="font-mono text-sm">{alert.destIp}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(alert.status) as any}>{alert.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAlert(alert)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Investigate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Alert Details - {alert.id}</DialogTitle>
                            <DialogDescription>
                              Detailed information and response options for this security alert
                            </DialogDescription>
                          </DialogHeader>
                          {selectedAlert && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Threat Type</Label>
                                  <p className="font-medium">{selectedAlert.type}</p>
                                </div>
                                <div>
                                  <Label>Severity</Label>
                                  <Badge variant={getSeverityColor(selectedAlert.severity) as any}>
                                    {selectedAlert.severity}
                                  </Badge>
                                </div>
                                <div>
                                  <Label>Source IP</Label>
                                  <p className="font-mono">{selectedAlert.sourceIp}</p>
                                </div>
                                <div>
                                  <Label>Destination IP</Label>
                                  <p className="font-mono">{selectedAlert.destIp}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <p>{selectedAlert.description}</p>
                              </div>
                              <div>
                                <Label>Technical Details</Label>
                                <p className="font-mono text-sm bg-muted p-2 rounded">{selectedAlert.details}</p>
                              </div>
                              <div>
                                <Label>Response Notes</Label>
                                <Textarea placeholder="Add investigation notes..." />
                              </div>
                              <div className="flex gap-2">
                                <Button>Mark as Investigating</Button>
                                <Button variant="outline">Assign to Team</Button>
                                <Button variant="outline">Block Source IP</Button>
                                <Button variant="destructive">Mark as Resolved</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
