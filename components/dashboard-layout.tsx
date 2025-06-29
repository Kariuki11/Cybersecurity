"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainDashboard } from "@/components/main-dashboard"
import { AlertsView } from "@/components/alerts-view"
import { NetworkTrafficView } from "@/components/network-traffic-view"
import { SystemLogsView } from "@/components/system-logs-view"
import { ThreatIntelligenceView } from "@/components/threat-intelligence-view"
import { SettingsView } from "@/components/settings-view"
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  Activity,
  FileText,
  Brain,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardLayoutProps {
  userRole: "admin" | "analyst"
}

export function DashboardLayout({ userRole }: DashboardLayoutProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "alerts", name: "Alerts", icon: AlertTriangle },
    { id: "network", name: "Network Traffic", icon: Activity },
    { id: "logs", name: "System Logs", icon: FileText },
    { id: "intelligence", name: "Threat Intelligence", icon: Brain },
    ...(userRole === "admin" ? [{ id: "settings", name: "Settings", icon: Settings }] : []),
  ]

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <MainDashboard userRole={userRole} />
      case "alerts":
        return <AlertsView />
      case "network":
        return <NetworkTrafficView />
      case "logs":
        return <SystemLogsView />
      case "intelligence":
        return <ThreatIntelligenceView />
      case "settings":
        return userRole === "admin" ? <SettingsView /> : <MainDashboard userRole={userRole} />
      default:
        return <MainDashboard userRole={userRole} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">CyberGuard AI</h1>
                <p className="text-xs text-muted-foreground">Threat Detector 01</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Security {userRole === "admin" ? "Admin" : "Analyst"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">analyst@company.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex h-full flex-col pt-16 lg:pt-0">
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveView(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">{renderView()}</div>
        </main>
      </div>
    </div>
  )
}
