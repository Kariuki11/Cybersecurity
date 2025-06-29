"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Search, Filter, Eye, CheckCircle, Clock, XCircle, Shield, Zap } from "lucide-react"

const mockAlerts = [
  {
    id: "ALT-001",
    timestamp: "2024-01-15 14:30:25",
    type: "Malware Detection",
    severity: "Critical",
    sourceIP: "192.168.1.45",
    destinationIP: "203.0.113.12",
    status: "New",
    description: "Trojan.Win32.Agent detected in network traffic",
    details: "Suspicious executable file detected attempting to establish C&C communication",
  },
  {
    id: "ALT-002",
    timestamp: "2024-01-15 14:25:10",
    type: "Suspicious Login",
    severity: "High",
    sourceIP: "203.0.113.45",
    destinationIP: "192.168.1.10",
    status: "Investigating",
    description: "Multiple failed login attempts from foreign IP",
    details: "15 failed login attempts within 5 minutes from IP located in suspicious region",
  },
  {
    id: "ALT-003",
    timestamp: "2024-01-15 14:20:15",
    type: "DDoS Attempt",
    severity: "High",
    sourceIP: "Multiple",
    destinationIP: "192.168.1.1",
    status: "Mitigated",
    description: "Distributed denial of service attack detected",
    details: "High volume of requests from multiple IP addresses targeting web server",
  },
  {
    id: "ALT-004",
    timestamp: "2024-01-15 14:15:30",
    type: "Port Scan",
    severity: "Medium",
    sourceIP: "198.51.100.23",
    destinationIP: "192.168.1.0/24",
    status: "Resolved",
    description: "Network reconnaissance activity detected",
    details: "Sequential port scanning detected across multiple hosts in network range",
  },
  {
    id: "ALT-005",
    timestamp: "2024-01-15 14:10:45",
    type: "Data Exfiltration",
    severity: "Medium",
    sourceIP: "192.168.1.78",
    destinationIP: "185.199.108.153",
    status: "New",
    description: "Unusual outbound data transfer detected",
    details: "Large volume of encrypted data being transmitted to external server during off-hours",
  },
  {
    id: "ALT-006",
    timestamp: "2024-01-15 14:05:20",
    type: "Phishing Attempt",
    severity: "Low",
    sourceIP: "209.85.233.147",
    destinationIP: "192.168.1.25",
    status: "Resolved",
    description: "Suspicious email with malicious attachment",
    details: "Email containing suspicious PDF attachment blocked by security filters",
  },
]

export function AlertsView() {
  const [selectedAlert, setSelectedAlert] = useState<(typeof mockAlerts)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sourceIP.includes(searchTerm) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Investigating":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Mitigated":
        return <Shield className="h-4 w-4 text-blue-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage cybersecurity threats and incidents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="mr-2 h-4 w-4" />
            Create Alert Rule
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts by type, IP, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Mitigated">Mitigated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts ({filteredAlerts.length})</CardTitle>
          <CardDescription>Click on any alert to view detailed information and response options</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{alert.id}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{alert.sourceIP}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(alert.status)}
                      <span>{alert.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert)}>
                          <Eye className="h-4 w-4" />
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
                                <label className="text-sm font-medium">Alert Type</label>
                                <p className="text-sm text-muted-foreground">{selectedAlert.type}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Severity</label>
                                <div className="mt-1">
                                  <Badge variant={getSeverityColor(selectedAlert.severity)}>
                                    {selectedAlert.severity}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Source IP</label>
                                <p className="text-sm text-muted-foreground font-mono">{selectedAlert.sourceIP}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Destination IP</label>
                                <p className="text-sm text-muted-foreground font-mono">{selectedAlert.destinationIP}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Timestamp</label>
                                <p className="text-sm text-muted-foreground">{selectedAlert.timestamp}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Current Status</label>
                                <div className="flex items-center space-x-2 mt-1">
                                  {getStatusIcon(selectedAlert.status)}
                                  <span className="text-sm">{selectedAlert.status}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Description</label>
                              <p className="text-sm text-muted-foreground mt-1">{selectedAlert.description}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Detailed Analysis</label>
                              <p className="text-sm text-muted-foreground mt-1">{selectedAlert.details}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Response Notes</label>
                              <Textarea placeholder="Add investigation notes or response actions..." className="mt-1" />
                            </div>

                            <div className="flex justify-between pt-4">
                              <div className="space-x-2">
                                <Select defaultValue={selectedAlert.status}>
                                  <SelectTrigger className="w-[150px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Investigating">Investigating</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Mitigated">Mitigated</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline">Block IP</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">Update Alert</Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
