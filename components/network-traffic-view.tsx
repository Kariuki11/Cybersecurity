"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Globe, TrendingUp, Wifi, Server, Shield } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const trafficData = [
  { time: "00:00", inbound: 45, outbound: 32, anomalies: 2 },
  { time: "04:00", inbound: 32, outbound: 28, anomalies: 1 },
  { time: "08:00", inbound: 78, outbound: 65, anomalies: 5 },
  { time: "12:00", inbound: 95, outbound: 87, anomalies: 8 },
  { time: "16:00", inbound: 87, outbound: 92, anomalies: 3 },
  { time: "20:00", inbound: 65, outbound: 58, anomalies: 2 },
]

const protocolData = [
  { protocol: "HTTP/HTTPS", value: 45, color: "#3b82f6" },
  { protocol: "SSH", value: 20, color: "#10b981" },
  { protocol: "FTP", value: 15, color: "#f59e0b" },
  { protocol: "DNS", value: 12, color: "#ef4444" },
  { protocol: "Other", value: 8, color: "#8b5cf6" },
]

const topTalkers = [
  { ip: "192.168.1.45", hostname: "web-server-01", inbound: "2.3 GB", outbound: "1.8 GB", connections: 1247 },
  { ip: "10.0.0.23", hostname: "db-server-02", inbound: "1.9 GB", outbound: "2.1 GB", connections: 892 },
  { ip: "172.16.0.8", hostname: "app-server-03", inbound: "1.5 GB", outbound: "1.2 GB", connections: 634 },
  { ip: "192.168.2.15", hostname: "file-server-01", inbound: "3.1 GB", outbound: "0.8 GB", connections: 423 },
  { ip: "10.1.1.50", hostname: "backup-server", inbound: "0.9 GB", outbound: "4.2 GB", connections: 156 },
]

const geoData = [
  { country: "United States", requests: 45234, percentage: 42 },
  { country: "China", requests: 23451, percentage: 22 },
  { country: "Germany", requests: 12890, percentage: 12 },
  { country: "United Kingdom", requests: 9876, percentage: 9 },
  { country: "Russia", requests: 8765, percentage: 8 },
  { country: "Other", requests: 7543, percentage: 7 },
]

export function NetworkTrafficView() {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">1.2 GB/s</p>
                <p className="text-sm text-muted-foreground">Current Throughput</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">15,432</p>
                <p className="text-sm text-muted-foreground">Active Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">21</p>
                <p className="text-sm text-muted-foreground">Anomalies Detected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Network Traffic Trends
            </CardTitle>
            <CardDescription>Inbound vs Outbound traffic with anomaly detection</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inbound" stroke="#3b82f6" strokeWidth={2} name="Inbound" />
                <Line type="monotone" dataKey="outbound" stroke="#10b981" strokeWidth={2} name="Outbound" />
                <Line type="monotone" dataKey="anomalies" stroke="#ef4444" strokeWidth={2} name="Anomalies" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
            <CardDescription>Breakdown of network protocols in use</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {protocolData.map((item) => (
                <div key={item.protocol} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs">
                    {item.protocol} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Talkers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Top Network Talkers
          </CardTitle>
          <CardDescription>Highest bandwidth consumers in the network</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Hostname</TableHead>
                <TableHead>Inbound Traffic</TableHead>
                <TableHead>Outbound Traffic</TableHead>
                <TableHead>Connections</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topTalkers.map((talker, index) => (
                <TableRow key={talker.ip}>
                  <TableCell className="font-mono">{talker.ip}</TableCell>
                  <TableCell>{talker.hostname}</TableCell>
                  <TableCell>{talker.inbound}</TableCell>
                  <TableCell>{talker.outbound}</TableCell>
                  <TableCell>{talker.connections.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={index < 2 ? "default" : "secondary"}>
                      {index < 2 ? "High Activity" : "Normal"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Geographic Traffic Distribution
          </CardTitle>
          <CardDescription>Origin of network traffic by country</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geoData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="country" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {geoData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{country.country}</p>
                      <p className="text-sm text-muted-foreground">{country.requests.toLocaleString()} requests</p>
                    </div>
                  </div>
                  <Badge variant="outline">{country.percentage}%</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
