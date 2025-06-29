"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Shield, AlertTriangle, TrendingUp, Download, RefreshCw, Globe, Users } from "lucide-react"
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

const threatTrendData = [
  { month: "Jul", malware: 120, phishing: 85, ddos: 45, intrusion: 30 },
  { month: "Aug", malware: 135, phishing: 92, ddos: 52, intrusion: 38 },
  { month: "Sep", malware: 148, phishing: 78, ddos: 48, intrusion: 42 },
  { month: "Oct", malware: 162, phishing: 95, ddos: 55, intrusion: 35 },
  { month: "Nov", malware: 178, phishing: 110, ddos: 62, intrusion: 48 },
  { month: "Dec", malware: 195, phishing: 125, ddos: 58, intrusion: 52 },
]

const cveData = [
  { severity: "Critical", count: 15, color: "#dc2626" },
  { severity: "High", count: 42, color: "#ea580c" },
  { severity: "Medium", count: 78, color: "#ca8a04" },
  { severity: "Low", count: 125, color: "#16a34a" },
]

const attackPatternData = [
  { pattern: "Credential Stuffing", frequency: 85 },
  { pattern: "SQL Injection", frequency: 72 },
  { pattern: "Cross-Site Scripting", frequency: 68 },
  { pattern: "Brute Force", frequency: 65 },
  { pattern: "Man-in-the-Middle", frequency: 45 },
  { pattern: "DNS Spoofing", frequency: 38 },
]

export function ThreatIntelligenceView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Threat Intelligence</h1>
          <p className="text-muted-foreground">Global cybersecurity insights and threat landscape analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Update Feeds
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Intelligence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Score</CardTitle>
            <Brain className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">High</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% this week
            </p>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Global threat campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IOCs Tracked</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Indicators of Compromise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feed Sources</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Active intelligence feeds</p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Evolution */}
      <Card>
        <CardHeader>
          <CardTitle>Threat Landscape Evolution</CardTitle>
          <CardDescription>6-month trend analysis of major threat categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="malware" stroke="#dc2626" strokeWidth={2} name="Malware" />
              <Line type="monotone" dataKey="phishing" stroke="#ea580c" strokeWidth={2} name="Phishing" />
              <Line type="monotone" dataKey="ddos" stroke="#ca8a04" strokeWidth={2} name="DDoS" />
              <Line type="monotone" dataKey="intrusion" stroke="#16a34a" strokeWidth={2} name="Intrusion" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CVE Analysis and Attack Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CVE Distribution</CardTitle>
            <CardDescription>Current vulnerabilities by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cveData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cveData.map((entry, index) => (
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
            <CardTitle>Common Attack Patterns</CardTitle>
            <CardDescription>MITRE ATT&CK framework analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attackPatternData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="pattern" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="frequency" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Intelligence Feeds */}
      <Card>
        <CardHeader>
          <CardTitle>Intelligence Feed Status</CardTitle>
          <CardDescription>External threat intelligence sources and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "MISP Threat Sharing", status: "Active", lastUpdate: "2 min ago", threats: 1247 },
              { name: "AlienVault OTX", status: "Active", lastUpdate: "5 min ago", threats: 892 },
              { name: "VirusTotal", status: "Active", lastUpdate: "1 min ago", threats: 2156 },
              { name: "Shodan", status: "Active", lastUpdate: "8 min ago", threats: 445 },
              { name: "IBM X-Force", status: "Maintenance", lastUpdate: "2 hours ago", threats: 678 },
              { name: "Recorded Future", status: "Active", lastUpdate: "3 min ago", threats: 1534 },
            ].map((feed) => (
              <div key={feed.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{feed.name}</h4>
                  <Badge variant={feed.status === "Active" ? "default" : "secondary"}>{feed.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Last update: {feed.lastUpdate}</p>
                <p className="text-sm font-medium">{feed.threats.toLocaleString()} active threats</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adversary Profiles */}
      <Card>
        <CardHeader>
          <CardTitle>Known Adversary Profiles</CardTitle>
          <CardDescription>Active threat actors and their characteristics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "APT29 (Cozy Bear)",
                origin: "Russia",
                targets: "Government, Healthcare",
                techniques: ["Spear Phishing", "Living off the Land", "Supply Chain"],
                activity: "High",
                lastSeen: "3 days ago",
              },
              {
                name: "Lazarus Group",
                origin: "North Korea",
                targets: "Financial, Cryptocurrency",
                techniques: ["Watering Hole", "Custom Malware", "Social Engineering"],
                activity: "Medium",
                lastSeen: "1 week ago",
              },
              {
                name: "FIN7",
                origin: "Unknown",
                targets: "Retail, Hospitality",
                techniques: ["Point of Sale", "Fileless Malware", "Credential Theft"],
                activity: "Low",
                lastSeen: "2 weeks ago",
              },
            ].map((adversary) => (
              <div key={adversary.name} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{adversary.name}</h4>
                    <p className="text-sm text-muted-foreground">Origin: {adversary.origin}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        adversary.activity === "High"
                          ? "destructive"
                          : adversary.activity === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {adversary.activity} Activity
                    </Badge>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">Primary Targets</p>
                    <p className="text-muted-foreground">{adversary.targets}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Common Techniques</p>
                    <div className="flex flex-wrap gap-1">
                      {adversary.techniques.map((technique) => (
                        <Badge key={technique} variant="outline" className="text-xs">
                          {technique}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Last Activity</p>
                    <p className="text-muted-foreground">{adversary.lastSeen}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
