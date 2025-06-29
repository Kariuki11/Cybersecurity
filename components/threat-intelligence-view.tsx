"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Shield,
  TrendingUp,
  Globe,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  Eye,
  Target,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const threatTrends = [
  { month: "Jan", malware: 45, phishing: 32, ddos: 23, insider: 12 },
  { month: "Feb", malware: 52, phishing: 28, ddos: 31, insider: 15 },
  { month: "Mar", malware: 48, phishing: 35, ddos: 27, insider: 18 },
  { month: "Apr", malware: 61, phishing: 42, ddos: 34, insider: 22 },
  { month: "May", malware: 55, phishing: 38, ddos: 29, insider: 19 },
  { month: "Jun", malware: 67, phishing: 45, ddos: 38, insider: 25 },
]

const cveData = [
  { severity: "Critical", count: 23, color: "#ef4444" },
  { severity: "High", count: 45, color: "#f97316" },
  { severity: "Medium", count: 67, color: "#eab308" },
  { severity: "Low", count: 34, color: "#22c55e" },
]

const threatFeeds = [
  { name: "MITRE ATT&CK", status: "Active", lastUpdate: "2 hours ago", threats: 1247 },
  { name: "AlienVault OTX", status: "Active", lastUpdate: "1 hour ago", threats: 892 },
  { name: "VirusTotal", status: "Active", lastUpdate: "30 min ago", threats: 2341 },
  { name: "Emerging Threats", status: "Maintenance", lastUpdate: "6 hours ago", threats: 567 },
  { name: "Talos Intelligence", status: "Active", lastUpdate: "45 min ago", threats: 1089 },
]

const attackPatterns = [
  {
    id: "T1566.001",
    name: "Spearphishing Attachment",
    tactic: "Initial Access",
    confidence: 85,
    detections: 23,
    description: "Adversaries may send spearphishing emails with a malicious attachment",
  },
  {
    id: "T1055",
    name: "Process Injection",
    tactic: "Defense Evasion",
    confidence: 92,
    detections: 18,
    description: "Adversaries may inject code into processes to evade detection",
  },
  {
    id: "T1083",
    name: "File and Directory Discovery",
    tactic: "Discovery",
    confidence: 78,
    detections: 34,
    description: "Adversaries may enumerate files and directories",
  },
  {
    id: "T1021.001",
    name: "Remote Desktop Protocol",
    tactic: "Lateral Movement",
    confidence: 88,
    detections: 12,
    description: "Adversaries may use RDP to laterally move",
  },
]

const adversaryProfiles = [
  {
    name: "APT29 (Cozy Bear)",
    origin: "Russia",
    targets: "Government, Healthcare",
    lastSeen: "3 days ago",
    riskLevel: "Critical",
    techniques: ["T1566.001", "T1055", "T1083"],
  },
  {
    name: "Lazarus Group",
    origin: "North Korea",
    targets: "Financial, Cryptocurrency",
    lastSeen: "1 week ago",
    riskLevel: "High",
    techniques: ["T1021.001", "T1566.001", "T1055"],
  },
  {
    name: "FIN7",
    origin: "Unknown",
    targets: "Retail, Hospitality",
    lastSeen: "2 weeks ago",
    riskLevel: "High",
    techniques: ["T1566.001", "T1083", "T1021.001"],
  },
]

export function ThreatIntelligenceView() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
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

  return (
    <div className="space-y-6">
      {/* Intelligence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">5,234</p>
                <p className="text-sm text-muted-foreground">Threat Indicators</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">169</p>
                <p className="text-sm text-muted-foreground">Active CVEs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Threat Feeds</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Known Adversaries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Threat Trends</TabsTrigger>
          <TabsTrigger value="feeds">Intelligence Feeds</TabsTrigger>
          <TabsTrigger value="patterns">Attack Patterns</TabsTrigger>
          <TabsTrigger value="adversaries">Adversary Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Threat Trends (6 Months)
                </CardTitle>
                <CardDescription>Evolution of different threat types over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={threatTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="malware" stroke="#ef4444" strokeWidth={2} name="Malware" />
                    <Line type="monotone" dataKey="phishing" stroke="#f97316" strokeWidth={2} name="Phishing" />
                    <Line type="monotone" dataKey="ddos" stroke="#eab308" strokeWidth={2} name="DDoS" />
                    <Line type="monotone" dataKey="insider" stroke="#22c55e" strokeWidth={2} name="Insider" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CVE Distribution by Severity</CardTitle>
                <CardDescription>Current vulnerabilities requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="severity" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cveData.map((item) => (
                    <div key={item.severity} className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs">
                        {item.severity}: {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feeds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Threat Intelligence Feeds
              </CardTitle>
              <CardDescription>External threat intelligence sources and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatFeeds.map((feed) => (
                  <div key={feed.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{feed.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {feed.threats.toLocaleString()} indicators • Last update: {feed.lastUpdate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={feed.status === "Active" ? "default" : "secondary"}>{feed.status}</Badge>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                MITRE ATT&CK Patterns
              </CardTitle>
              <CardDescription>Common attack patterns detected in your environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attackPatterns.map((pattern) => (
                  <div key={pattern.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{pattern.id}</Badge>
                          <Badge>{pattern.tactic}</Badge>
                        </div>
                        <h4 className="font-medium">{pattern.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{pattern.detections} detections</p>
                        <p className="text-xs text-muted-foreground">Last 30 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Confidence:</span>
                      <Progress value={pattern.confidence} className="flex-1" />
                      <span className="text-sm font-medium">{pattern.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adversaries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Known Adversary Groups
              </CardTitle>
              <CardDescription>Threat actors relevant to your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adversaryProfiles.map((adversary) => (
                  <div key={adversary.name} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{adversary.name}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Origin: {adversary.origin}</span>
                          <span>Targets: {adversary.targets}</span>
                          <span>Last seen: {adversary.lastSeen}</span>
                        </div>
                      </div>
                      <Badge variant={getRiskColor(adversary.riskLevel) as any}>{adversary.riskLevel} Risk</Badge>
                    </div>
                    <div>
                      <p className="text-sm mb-2">Common Techniques:</p>
                      <div className="flex flex-wrap gap-1">
                        {adversary.techniques.map((technique) => (
                          <Badge key={technique} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Intelligence Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Update All Feeds
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View IOCs
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Brief
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
