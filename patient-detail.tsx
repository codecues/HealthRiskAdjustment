"use client"

import { useState } from "react"

import { ArrowLeft, Calendar, User, AlertTriangle, TrendingUp, FileText, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeEducationModal from "./components/code-education-modal"
import AuditNotes from "./components/audit-notes"
import ComplianceFooter from "./components/compliance-footer"
import HedisMeasures from "./components/hedis-measures"

// Mock detailed patient data
const getPatientDetails = (patient) => ({
  ...patient,
  hedis: patient.hedis || {
    overallScore: 75,
    measures: {
      "CDC-HbA1c": { status: "Met", lastDate: "2024-11-15", dueDate: "2025-02-15", value: "7.2%" },
      "CDC-Eye": { status: "Gap", lastDate: "2023-08-20", dueDate: "2024-08-20", value: null },
      "CDC-Nephropathy": { status: "Met", lastDate: "2024-10-10", dueDate: "2025-10-10", value: "Normal" },
      CBP: { status: "Gap", lastDate: "2024-12-15", dueDate: "2024-12-15", value: "145/92" },
      "COL-LDL": { status: "Met", lastDate: "2024-09-05", dueDate: "2025-09-05", value: "95 mg/dL" },
    },
    gapCount: 2,
  },
  demographics: {
    dateOfBirth: "1957-03-15",
    address: "123 Main St, Springfield, IL 62701",
    phone: "(555) 123-4567",
    emergencyContact: "John Johnson (Son) - (555) 987-6543",
    primaryCareProvider: "Dr. Sarah Williams, MD",
  },
  diagnosisHistory: [
    { date: "2024-12-15", code: "E11.9", description: "Type 2 Diabetes Mellitus", hcc: "HCC-19", weight: 0.318 },
    { date: "2024-11-20", code: "I10", description: "Essential Hypertension", hcc: "HCC-96", weight: 0.302 },
    {
      date: "2024-10-10",
      code: "N18.3",
      description: "Chronic Kidney Disease, Stage 3",
      hcc: "HCC-136",
      weight: 0.237,
    },
    { date: "2024-09-05", code: "M79.3", description: "Panniculitis", hcc: "HCC-40", weight: 0.421 },
    { date: "2024-08-12", code: "E78.5", description: "Hyperlipidemia", hcc: "None", weight: 0.0 },
  ],
  missingRiskCodes: [
    {
      hccCode: "HCC-18",
      condition: "Diabetes with Chronic Complications",
      lastReported: "2023-11-15",
      status: "Missing in 2024",
      intervention: "Schedule comprehensive diabetic foot exam and retinal screening",
      reasoning:
        "Previous year showed diabetic complications. Missing documentation may indicate under-coding of current diabetic status.",
    },
    {
      hccCode: "HCC-85",
      condition: "Congestive Heart Failure",
      lastReported: "2023-09-20",
      status: "Missing in 2024",
      intervention: "Order echocardiogram and review current cardiac status",
      reasoning:
        "Heart failure diagnosis from previous year not documented in 2024. Requires clinical validation of current status.",
    },
    {
      hccCode: "HCC-137",
      condition: "Chronic Kidney Disease Stage 4",
      lastReported: "2023-12-01",
      status: "Downgraded to Stage 3",
      intervention: "Repeat GFR testing and nephrology consultation",
      reasoning:
        "CKD stage appears to have improved, but requires confirmation through recent lab work and specialist review.",
    },
  ],
  riskScoreBreakdown: [
    { condition: "Type 2 Diabetes", hcc: "HCC-19", weight: 0.318, contribution: "13.0%" },
    { condition: "Essential Hypertension", hcc: "HCC-96", weight: 0.302, contribution: "12.3%" },
    { condition: "CKD Stage 3", hcc: "HCC-136", weight: 0.237, contribution: "9.7%" },
    { condition: "Panniculitis", hcc: "HCC-40", weight: 0.421, contribution: "17.2%" },
    { condition: "Age/Gender Factor", hcc: "Demo", weight: 1.167, contribution: "47.8%" },
  ],
  recentVisits: [
    {
      date: "2024-12-15",
      type: "Primary Care",
      provider: "Dr. Sarah Williams",
      chief_complaint: "Routine diabetes follow-up",
      assessment: "Diabetes well controlled, A1C 7.2%. Blood pressure elevated at 145/92.",
      plan: "Continue metformin, increase lisinopril dose, recheck labs in 3 months",
    },
    {
      date: "2024-11-20",
      type: "Cardiology",
      provider: "Dr. Michael Chen",
      chief_complaint: "Chest pain evaluation",
      assessment: "Atypical chest pain, EKG normal, stress test negative",
      plan: "Continue current medications, lifestyle modifications, follow up in 6 months",
    },
  ],
})

export default function PatientDetail({ patient, onBack }) {
  const patientDetails = getPatientDetails(patient)

  const [selectedCode, setSelectedCode] = useState(null)
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)

  const handleCodeClick = (code) => {
    setSelectedCode(code)
    setIsCodeModalOpen(true)
  }

  const getRiskBadgeColor = (status) => {
    switch (status) {
      case "Very High Risk":
        return "destructive"
      case "High Risk":
        return "destructive"
      case "Moderate Risk":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patient List
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-600">Patient Risk Profile & Missing Codes Analysis</p>
          </div>
        </div>

        {/* Patient Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.riskScore}</div>
              <Badge variant={getRiskBadgeColor(patient.status)} className="mt-2">
                {patient.status}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Conditions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.conditions.length}</div>
              <p className="text-xs text-muted-foreground mt-2">ICD-10 codes documented</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missing Codes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{patient.missingCodes}</div>
              <p className="text-xs text-muted-foreground mt-2">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{patient.lastVisit}</div>
              <p className="text-xs text-muted-foreground mt-2">Primary Care</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">HEDIS Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{patient.hedis?.overallScore || "N/A"}</div>
              {patient.hedis?.gapCount > 0 && (
                <Badge variant="destructive" className="mt-2">
                  {patient.hedis.gapCount} gaps
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis History</TabsTrigger>
            <TabsTrigger value="missing">Missing Codes</TabsTrigger>
            <TabsTrigger value="hedis">HEDIS Measures</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="visits">Recent Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Age</p>
                      <p className="text-lg">{patient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gender</p>
                      <p className="text-lg">{patient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                      <p className="text-lg">{patientDetails.demographics.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Insurance ID</p>
                      <p className="text-lg font-mono">{patient.insuranceId}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Primary Care Provider</p>
                    <p className="text-lg">{patientDetails.demographics.primaryCareProvider}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                    <p className="text-lg">{patientDetails.demographics.emergencyContact}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Risk Score Breakdown
                  </CardTitle>
                  <CardDescription>HCC contributions to total risk score</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Condition</TableHead>
                        <TableHead>HCC</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patientDetails.riskScoreBreakdown.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.condition}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.hcc}</Badge>
                          </TableCell>
                          <TableCell>{item.weight}</TableCell>
                          <TableCell>{item.contribution}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Diagnosis History</CardTitle>
                <CardDescription>All documented conditions with HCC mappings and risk weights</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>ICD-10 Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>HCC Mapping</TableHead>
                      <TableHead>Risk Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientDetails.diagnosisHistory.map((diagnosis, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{diagnosis.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50"
                            onClick={() => handleCodeClick(diagnosis.code)}
                          >
                            {diagnosis.code}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{diagnosis.description}</TableCell>
                        <TableCell>
                          {diagnosis.hcc !== "None" ? (
                            <Badge
                              className="cursor-pointer hover:bg-blue-50"
                              onClick={() => handleCodeClick(diagnosis.hcc)}
                            >
                              {diagnosis.hcc}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">No HCC</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={diagnosis.weight > 0 ? "font-bold text-green-600" : "text-gray-400"}>
                            {diagnosis.weight.toFixed(3)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missing" className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Missing Risk Codes Detected</AlertTitle>
              <AlertDescription>
                The following HCC codes were documented in previous years but are missing from current year
                documentation. Review clinical status and update coding as appropriate.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Missing HCC Codes Analysis</CardTitle>
                <CardDescription>Codes requiring clinical review and potential re-documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>HCC Code</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Reported</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientDetails.missingRiskCodes.map((code, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Badge variant="destructive">{code.hccCode}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{code.condition}</TableCell>
                        <TableCell>{code.lastReported}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            {code.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hedis" className="space-y-6">
            <HedisMeasures patient={patientDetails} />
          </TabsContent>

          <TabsContent value="interventions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Suggested Clinical Interventions
                </CardTitle>
                <CardDescription>
                  Recommended actions to address missing risk codes and improve documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {patientDetails.missingRiskCodes.map((code, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">{code.hccCode}</Badge>
                        <span className="font-medium">{code.condition}</span>
                      </div>
                      <Badge variant="outline">Priority: High</Badge>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md">
                      <h4 className="font-medium text-blue-900 mb-1">Recommended Intervention:</h4>
                      <p className="text-blue-800">{code.intervention}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1">Clinical Reasoning:</h4>
                      <p className="text-gray-700 text-sm">{code.reasoning}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">Schedule Appointment</Button>
                      <Button variant="outline" size="sm">
                        Order Tests
                      </Button>
                      <Button variant="outline" size="sm">
                        Refer to Specialist
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Visit Summary</CardTitle>
                <CardDescription>Latest clinical encounters and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {patientDetails.recentVisits.map((visit, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{visit.type} Visit</h3>
                        <p className="text-sm text-gray-600">
                          {visit.date} • {visit.provider}
                        </p>
                      </div>
                      <Badge variant="outline">{visit.type}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Chief Complaint</h4>
                        <p className="text-sm">{visit.chief_complaint}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Assessment</h4>
                        <p className="text-sm">{visit.assessment}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Plan</h4>
                        <p className="text-sm">{visit.plan}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <AuditNotes patientId={patient.id} />
          </TabsContent>
        </Tabs>
        <CodeEducationModal code={selectedCode} isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
        <ComplianceFooter />
      </div>
    </div>
  )
}
