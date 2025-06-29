"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, Users, Bell, Shield, Zap, Plus, Edit, Trash2, Save } from "lucide-react"

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 14:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Analyst",
    status: "Active",
    lastLogin: "2024-01-15 13:45",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Analyst",
    status: "Inactive",
    lastLogin: "2024-01-10 09:15",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Viewer",
    status: "Active",
    lastLogin: "2024-01-15 11:20",
  },
]

export function SettingsView() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Analyst",
    password: "",
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure system parameters, user access, and security policies</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* System Configuration */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>General system settings and AI model configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input id="orgName" defaultValue="CyberGuard Security Corp" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="logRetention">Log Retention (Days)</Label>
                    <Input id="logRetention" type="number" defaultValue="90" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="aiSensitivity">AI Detection Sensitivity</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="maximum">Maximum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="scanInterval">Scan Interval (Minutes)</Label>
                    <Input id="scanInterval" type="number" defaultValue="5" />
                  </div>
                  <div>
                    <Label htmlFor="maxAlerts">Max Alerts per Hour</Label>
                    <Input id="maxAlerts" type="number" defaultValue="100" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">System Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoResponse">Automatic Threat Response</Label>
                    <Switch id="autoResponse" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="realTimeMonitoring">Real-time Monitoring</Label>
                    <Switch id="realTimeMonitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="geoBlocking">Geographic Blocking</Label>
                    <Switch id="geoBlocking" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="apiAccess">API Access</Label>
                    <Switch id="apiAccess" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage user accounts and role-based access control</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Create a new user account with appropriate permissions</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="newUserName">Full Name</Label>
                        <Input
                          id="newUserName"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newUserEmail">Email</Label>
                        <Input
                          id="newUserEmail"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="john.doe@company.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newUserRole">Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Administrator</SelectItem>
                            <SelectItem value="Analyst">Security Analyst</SelectItem>
                            <SelectItem value="Viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="newUserPassword">Temporary Password</Label>
                        <Input
                          id="newUserPassword"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="Temporary password"
                        />
                      </div>
                      <Button className="w-full">Create User</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure alert notifications and communication channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="criticalAlerts">Critical Security Alerts</Label>
                    <Switch id="criticalAlerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dailyReports">Daily Security Reports</Label>
                    <Switch id="dailyReports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <Switch id="systemUpdates" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceNotices">Maintenance Notices</Label>
                    <Switch id="maintenanceNotices" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Slack Integration</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="slackWebhook">Webhook URL</Label>
                    <Input id="slackWebhook" placeholder="https://hooks.slack.com/services/..." />
                  </div>
                  <div>
                    <Label htmlFor="slackChannel">Default Channel</Label>
                    <Input id="slackChannel" placeholder="#security-alerts" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slackEnabled">Enable Slack Notifications</Label>
                    <Switch id="slackEnabled" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">SMS Alerts</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="smsNumber">Emergency Contact Number</Label>
                    <Input id="smsNumber" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsEnabled">Enable SMS for Critical Alerts</Label>
                    <Switch id="smsEnabled" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Policies */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Policies
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Password Policy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minLength">Minimum Length</Label>
                    <Input id="minLength" type="number" defaultValue="12" />
                  </div>
                  <div>
                    <Label htmlFor="maxAge">Maximum Age (Days)</Label>
                    <Input id="maxAge" type="number" defaultValue="90" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                    <Switch id="requireUppercase" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireNumbers">Require Numbers</Label>
                    <Switch id="requireNumbers" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireSpecial">Require Special Characters</Label>
                    <Switch id="requireSpecial" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (Minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label htmlFor="maxSessions">Max Concurrent Sessions</Label>
                    <Input id="maxSessions" type="number" defaultValue="3" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">IP Restrictions</h4>
                <div>
                  <Label htmlFor="allowedIPs">Allowed IP Ranges</Label>
                  <Textarea id="allowedIPs" placeholder="192.168.1.0/24&#10;10.0.0.0/8&#10;172.16.0.0/12" rows={4} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ipRestrictionEnabled">Enable IP Restrictions</Label>
                  <Switch id="ipRestrictionEnabled" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                External Integrations
              </CardTitle>
              <CardDescription>Configure connections to external security tools and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "SIEM Integration",
                    description: "Connect to your SIEM platform",
                    status: "Connected",
                    config: "Splunk Enterprise",
                  },
                  {
                    name: "Threat Intelligence",
                    description: "External threat feeds",
                    status: "Active",
                    config: "15 active feeds",
                  },
                  {
                    name: "Vulnerability Scanner",
                    description: "Automated vulnerability scanning",
                    status: "Configured",
                    config: "Nessus Professional",
                  },
                  {
                    name: "Incident Response",
                    description: "Ticketing system integration",
                    status: "Disconnected",
                    config: "ServiceNow",
                  },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                      <Badge
                        variant={
                          integration.status === "Connected" || integration.status === "Active"
                            ? "default"
                            : integration.status === "Configured"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{integration.config}</p>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
