"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginDialog } from "@/components/login-dialog"
import { SignupDialog } from "@/components/signup-dialog"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Eye, Brain, Lock, AlertTriangle, CheckCircle, Users, Globe, TrendingUp } from "lucide-react"

export function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "analyst">("analyst")
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const handleAuth = (role: "admin" | "analyst") => {
    setIsAuthenticated(true)
    setUserRole(role)
    setShowLogin(false)
    setShowSignup(false)
  }

  if (isAuthenticated) {
    return <DashboardLayout userRole={userRole} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogin={() => setShowLogin(true)} onSignup={() => setShowSignup(true)} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-600/20 text-blue-600 border-blue-600/30">AI-Powered Security</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            AI-Enhanced Cybersecurity
            <br />
            Threat Detector 01
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Advanced AI-powered threat detection system that monitors, analyzes, and responds to cybersecurity threats
            in real-time. Protect your digital infrastructure with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowSignup(true)}>
              <Shield className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowLogin(true)}>
              <Lock className="mr-2 h-5 w-5" />
              Login to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Security Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive cybersecurity protection powered by artificial intelligence and machine learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-600/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI Threat Detection</CardTitle>
                <CardDescription>
                  Advanced machine learning algorithms detect anomalies and potential threats in real-time
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-purple-600/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Network Monitoring</CardTitle>
                <CardDescription>
                  24/7 network traffic analysis with intelligent pattern recognition and anomaly detection
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-cyan-600/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>Instant Response</CardTitle>
                <CardDescription>
                  Automated threat response and mitigation with customizable security policies
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-green-600/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>
                  Comprehensive vulnerability scanning and risk analysis with detailed reporting
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-orange-600/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Multi-user dashboard with role-based access control and team management features
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-red-600/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Global Intelligence</CardTitle>
                <CardDescription>
                  Integration with global threat intelligence feeds and security databases
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-muted-foreground">Threat Detection Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{"<"}1s</div>
              <div className="text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-muted-foreground">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Dashboard Preview */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Security Dashboard</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Get complete visibility into your security posture with our intuitive dashboard
          </p>
          <div className="relative">
            <div
              className="rounded-lg shadow-2xl border bg-background/50 backdrop-blur-sm"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "400px",
              }}
            >
              <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Interactive Security Console</h3>
                  <p className="text-muted-foreground mb-6">Real-time threat monitoring and analysis</p>
                  <Button onClick={() => setShowLogin(true)}>View Live Demo</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Digital Infrastructure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of organizations protecting their assets with our AI-powered cybersecurity platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => setShowSignup(true)}>
              <CheckCircle className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onLogin={handleAuth}
        onSwitchToSignup={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
      />

      <SignupDialog
        open={showSignup}
        onOpenChange={setShowSignup}
        onSignup={handleAuth}
        onSwitchToLogin={() => {
          setShowSignup(false)
          setShowLogin(true)
        }}
      />
    </div>
  )
}
