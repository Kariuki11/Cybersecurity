"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "analyst">("analyst")

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={(role) => {
          setIsAuthenticated(true)
          setUserRole(role)
        }}
      />
    )
  }

  return <DashboardLayout userRole={userRole} />
}
