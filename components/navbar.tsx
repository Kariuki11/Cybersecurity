"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  onLogin: () => void
  onSignup: () => void
}

export function Navbar({ onLogin, onSignup }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#security" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Security
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" onClick={onLogin}>
                Login
              </Button>
              <Button onClick={onSignup} className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#security" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Security
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" onClick={onLogin}>
                  Login
                </Button>
                <Button onClick={onSignup} className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
