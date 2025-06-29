"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Activity, FileText, Brain, Settings, Bell, User, LogOut, Home } from "lucide-react"
import { MainDashboard } from "@/components/main-dashboard"
import { AlertsView } from "@/components/alerts-view"
import { NetworkTrafficView } from "@/components/network-traffic-view"
import { SystemLogsView } from "@/components/system-logs-view"
import { ThreatIntelligenceView } from "@/components/threat-intelligence-view"
import { SettingsView } from "@/components/settings-view"

interface DashboardLayoutProps {
  userRole: "admin" | "analyst"
}

export function DashboardLayout({ userRole }: DashboardLayoutProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const [notifications] = useState(3)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: 5 },
    { id: "network", label: "Network Traffic", icon: Activity },
    { id: "logs", label: "System Logs", icon: FileText },
    { id: "intelligence", label: "Threat Intelligence", icon: Brain },
    ...(userRole === "admin" ? [{ id: "settings", label: "Settings", icon: Settings }] : []),
  ]

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <MainDashboard />
      case "alerts":
        return <AlertsView />
      case "network":
        return <NetworkTrafficView />
      case "logs":
        return <SystemLogsView />
      case "intelligence":
        return <ThreatIntelligenceView />
      case "settings":
        return <SettingsView />
      default:
        return <MainDashboard />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar className="border-r border-slate-200 dark:border-slate-800">
          <SidebarHeader className="border-b border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm">Cybersecurity</h2>
                <p className="text-xs text-muted-foreground">Threat Detector 01</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">
                  {menuItems.find((item) => item.id === activeView)?.label || "Dashboard"}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{userRole === "admin" ? "AD" : "AN"}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{userRole === "admin" ? "Administrator" : "Analyst"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">{renderActiveView()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
