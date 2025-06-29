"use client"

import { Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold">CyberGuard AI</h3>
                <p className="text-sm text-muted-foreground">Threat Detector 01</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced AI-powered cybersecurity threat detection and monitoring system protecting digital infrastructure
              worldwide.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold">Products</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Threat Detection
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Network Monitoring
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Incident Response
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Vulnerability Scanner
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Security Analytics
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Security Blog
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Case Studies
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Support Center
              </a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Get the latest cybersecurity insights and product updates.</p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>security@cyberguard.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 CyberGuard AI. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
