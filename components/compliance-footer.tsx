"use client"

import { useState } from "react"
import { Shield, Eye, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function ComplianceFooter() {
  const [hipaaDialogOpen, setHipaaDialogOpen] = useState(false)
  const [accessibilityDialogOpen, setAccessibilityDialogOpen] = useState(false)

  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* HIPAA Compliance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <h3 className="font-medium">HIPAA Compliance</h3>
            </div>
            <p className="text-sm text-gray-300">
              This application uses simulated data for demonstration purposes only. No actual patient information is
              stored or transmitted.
            </p>
            <Dialog open={hipaaDialogOpen} onOpenChange={setHipaaDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-800">
                  View HIPAA Notice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    HIPAA Privacy Notice
                  </DialogTitle>
                  <DialogDescription>Healthcare Information Privacy and Security</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Demo Application Notice</h4>
                    <p className="text-blue-800">
                      This is a demonstration application using simulated patient data. No real patient information is
                      collected, stored, or transmitted.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Protected Health Information (PHI)</h4>
                    <p>
                      In a production environment, this application would be subject to HIPAA regulations including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Access controls and user authentication</li>
                      <li>Audit logging of all PHI access</li>
                      <li>Business Associate Agreements (BAAs)</li>
                      <li>Regular security risk assessments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Patient Rights</h4>
                    <p>Patients have the right to:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Access their medical records</li>
                      <li>Request corrections to their information</li>
                      <li>Receive notice of privacy practices</li>
                      <li>Request restrictions on use and disclosure</li>
                      <li>File complaints about privacy violations</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Accessibility */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              <h3 className="font-medium">Accessibility</h3>
            </div>
            <p className="text-sm text-gray-300">
              Designed to meet WCAG 2.1 AA standards for healthcare accessibility compliance.
            </p>
            <Dialog open={accessibilityDialogOpen} onOpenChange={setAccessibilityDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-800">
                  Accessibility Statement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Accessibility Statement
                  </DialogTitle>
                  <DialogDescription>WCAG 2.1 AA Compliance Information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Accessibility Commitment</h4>
                    <p className="text-green-800">
                      We are committed to ensuring digital accessibility for people with disabilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">WCAG 2.1 AA Compliance Features</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Keyboard navigation support</li>
                      <li>Screen reader compatibility</li>
                      <li>High contrast color schemes</li>
                      <li>Scalable text and UI elements</li>
                      <li>Alternative text for images</li>
                      <li>Semantic HTML structure</li>
                      <li>Focus indicators for interactive elements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Assistive Technology Support</h4>
                    <p>This application is tested with:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>NVDA and JAWS screen readers</li>
                      <li>Voice recognition software</li>
                      <li>Keyboard-only navigation</li>
                      <li>High contrast and zoom tools</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Feedback</h4>
                    <p>
                      If you encounter accessibility barriers, please contact our support team for assistance or to
                      report issues.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* System Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-yellow-400" />
              <h3 className="font-medium">System Information</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Demo Version</Badge>
                <span className="text-xs text-gray-400">v1.0.0</span>
              </div>
              <p className="text-xs text-gray-400">Last Updated: December 2024</p>
              <p className="text-xs text-gray-400">Environment: Development/Demo</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Healthcare Risk Adjustment Viewer. This is a demonstration application with simulated data.
          </p>
        </div>
      </div>
    </footer>
  )
}
