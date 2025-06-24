"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, User, Calendar, AlertTriangle, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PatientDetail from "./patient-detail"
import Analytics from "./analytics"
import { Button } from "@/components/ui/button"
import ComplianceFooter from "../components/compliance-footer"

// Mock patient data with HEDIS information
const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 67,
    gender: "Female",
    insuranceId: "MED-789456123",
    riskScore: 2.45,
    conditions: ["E11.9", "I10", "N18.3", "M79.3"],
    conditionNames: ["Type 2 Diabetes", "Hypertension", "CKD Stage 3", "Fibromyalgia"],
    lastVisit: "2024-12-15",
    missingCodes: 3,
    status: "High Risk",
    hedis: {
      overallScore: 78,
      measures: {
        "CDC-HbA1c": { status: "Met", lastDate: "2024-11-15", dueDate: "2025-02-15", value: "7.2%" },
        "CDC-Eye": { status: "Gap", lastDate: "2023-08-20", dueDate: "2024-08-20", value: null },
        "CDC-Nephropathy": { status: "Met", lastDate: "2024-10-10", dueDate: "2025-10-10", value: "Normal" },
        CBP: { status: "Gap", lastDate: "2024-12-15", dueDate: "2024-12-15", value: "145/92" },
        "COL-LDL": { status: "Met", lastDate: "2024-09-05", dueDate: "2025-09-05", value: "95 mg/dL" },
      },
      gapCount: 2,
    },
  },
  {
    id: 2,
    name: "Robert Chen",
    age: 72,
    gender: "Male",
    insuranceId: "MED-456789012",
    riskScore: 3.12,
    conditions: ["I25.10", "E78.5", "F32.9", "M16.9"],
    conditionNames: ["CAD", "Hyperlipidemia", "Depression", "Osteoarthritis"],
    lastVisit: "2024-12-10",
    missingCodes: 2,
    status: "High Risk",
    hedis: {
      overallScore: 85,
      measures: {
        "CDC-HbA1c": { status: "Met", lastDate: "2024-10-20", dueDate: "2025-01-20", value: "6.8%" },
        CBP: { status: "Met", lastDate: "2024-12-10", dueDate: "2025-03-10", value: "132/78" },
        "COL-LDL": { status: "Met", lastDate: "2024-11-05", dueDate: "2025-11-05", value: "78 mg/dL" },
      },
      gapCount: 0,
    },
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    age: 58,
    gender: "Female",
    insuranceId: "MED-234567890",
    riskScore: 1.78,
    conditions: ["I10", "E78.5", "K21.9"],
    conditionNames: ["Hypertension", "Hyperlipidemia", "GERD"],
    lastVisit: "2024-12-08",
    missingCodes: 1,
    status: "Moderate Risk",
    hedis: {
      overallScore: 72,
      measures: {
        CBP: { status: "Met", lastDate: "2024-12-08", dueDate: "2025-03-08", value: "128/82" },
        "COL-LDL": { status: "Gap", lastDate: "2023-11-15", dueDate: "2024-11-15", value: null },
      },
      gapCount: 1,
    },
  },
  {
    id: 4,
    name: "James Wilson",
    age: 81,
    gender: "Male",
    insuranceId: "MED-345678901",
    riskScore: 4.23,
    conditions: ["I50.9", "N18.4", "E11.9", "I48.91"],
    conditionNames: ["Heart Failure", "CKD Stage 4", "Type 2 Diabetes", "Atrial Fibrillation"],
    lastVisit: "2024-12-12",
    missingCodes: 4,
    status: "Very High Risk",
    hedis: {
      overallScore: 65,
      measures: {
        "CDC-HbA1c": { status: "Gap", lastDate: "2024-06-15", dueDate: "2024-12-15", value: null },
        "CDC-Eye": { status: "Gap", lastDate: "2023-05-20", dueDate: "2024-05-20", value: null },
        CBP: { status: "Gap", lastDate: "2024-12-12", dueDate: "2024-12-12", value: "165/95" },
      },
      gapCount: 3,
    },
  },
  {
    id: 5,
    name: "Linda Thompson",
    age: 63,
    gender: "Female",
    insuranceId: "MED-567890123",
    riskScore: 2.01,
    conditions: ["C78.00", "Z51.11", "F32.9"],
    conditionNames: ["Metastatic Cancer", "Chemotherapy", "Depression"],
    lastVisit: "2024-12-14",
    missingCodes: 2,
    status: "High Risk",
    hedis: {
      overallScore: 45,
      measures: {
        CBP: { status: "Met", lastDate: "2024-12-14", dueDate: "2025-03-14", value: "125/80" },
      },
      gapCount: 0,
    },
  },
  {
    id: 6,
    name: "David Kim",
    age: 55,
    gender: "Male",
    insuranceId: "MED-678901234",
    riskScore: 1.34,
    conditions: ["I10", "E78.5"],
    conditionNames: ["Hypertension", "Hyperlipidemia"],
    lastVisit: "2024-12-05",
    missingCodes: 0,
    status: "Moderate Risk",
    hedis: {
      overallScore: 90,
      measures: {
        CBP: { status: "Met", lastDate: "2024-12-05", dueDate: "2025-03-05", value: "118/75" },
        "COL-LDL": { status: "Met", lastDate: "2024-11-20", dueDate: "2025-11-20", value: "85 mg/dL" },
      },
      gapCount: 0,
    },
  },
  {
    id: 7,
    name: "Patricia Davis",
    age: 69,
    gender: "Female",
    insuranceId: "MED-789012345",
    riskScore: 2.87,
    conditions: ["J44.1", "I25.10", "E11.9", "M06.9"],
    conditionNames: ["COPD", "CAD", "Type 2 Diabetes", "Rheumatoid Arthritis"],
    lastVisit: "2024-12-11",
    missingCodes: 3,
    status: "High Risk",
    hedis: {
      overallScore: 70,
      measures: {
        "CDC-HbA1c": { status: "Met", lastDate: "2024-10-15", dueDate: "2025-01-15", value: "7.8%" },
        "CDC-Eye": { status: "Due Soon", lastDate: "2024-01-20", dueDate: "2025-01-20", value: null },
        CBP: { status: "Gap", lastDate: "2024-12-11", dueDate: "2024-12-11", value: "155/88" },
      },
      gapCount: 2,
    },
  },
  {
    id: 8,
    name: "Michael Brown",
    age: 74,
    gender: "Male",
    insuranceId: "MED-890123456",
    riskScore: 3.45,
    conditions: ["G30.9", "I10", "E11.9", "F03.90"],
    conditionNames: ["Alzheimer's Disease", "Hypertension", "Type 2 Diabetes", "Dementia"],
    lastVisit: "2024-12-09",
    missingCodes: 2,
    status: "Very High Risk",
    hedis: {
      overallScore: 55,
      measures: {
        "CDC-HbA1c": { status: "Gap", lastDate: "2024-05-10", dueDate: "2024-11-10", value: null },
        CBP: { status: "Gap", lastDate: "2024-12-09", dueDate: "2024-12-09", value: "170/92" },
      },
      gapCount: 2,
    },
  },
  {
    id: 9,
    name: "Jennifer Garcia",
    age: 61,
    gender: "Female",
    insuranceId: "MED-901234567",
    riskScore: 1.92,
    conditions: ["I10", "E78.5", "M79.3", "K21.9"],
    conditionNames: ["Hypertension", "Hyperlipidemia", "Fibromyalgia", "GERD"],
    lastVisit: "2024-12-13",
    missingCodes: 1,
    status: "Moderate Risk",
    hedis: {
      overallScore: 82,
      measures: {
        CBP: { status: "Met", lastDate: "2024-12-13", dueDate: "2025-03-13", value: "128/78" },
        "COL-LDL": { status: "Met", lastDate: "2024-10-25", dueDate: "2025-10-25", value: "92 mg/dL" },
      },
      gapCount: 0,
    },
  },
  {
    id: 10,
    name: "Thomas Anderson",
    age: 66,
    gender: "Male",
    insuranceId: "MED-012345678",
    riskScore: 2.56,
    conditions: ["I25.10", "E11.9", "N18.3", "I48.91"],
    conditionNames: ["CAD", "Type 2 Diabetes", "CKD Stage 3", "Atrial Fibrillation"],
    lastVisit: "2024-12-07",
    missingCodes: 2,
    status: "High Risk",
    hedis: {
      overallScore: 75,
      measures: {
        "CDC-HbA1c": { status: "Met", lastDate: "2024-11-07", dueDate: "2025-02-07", value: "7.1%" },
        "CDC-Nephropathy": {
          status: "Met",
          lastDate: "2024-09-15",
          dueDate: "2025-09-15",
          value: "Microalbumin positive",
        },
        CBP: { status: "Gap", lastDate: "2024-12-07", dueDate: "2024-12-07", value: "148/85" },
        "COL-LDL": { status: "Met", lastDate: "2024-08-20", dueDate: "2025-08-20", value: "88 mg/dL" },
      },
      gapCount: 1,
    },
  },
]

export default function HomePage() {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")
  const [showAnalytics, setShowAnalytics] = useState(false)

  const filteredAndSortedPatients = patients
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.insuranceId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === "all" || patient.status.toLowerCase().includes(filterBy.toLowerCase())
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "riskScore") return b.riskScore - a.riskScore
      if (sortBy === "age") return b.age - a.age
      if (sortBy === "missingCodes") return b.missingCodes - a.missingCodes
      return 0
    })

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

  if (showAnalytics) {
    return <Analytics onBack={() => setShowAnalytics(false)} patients={patients} />
  }

  if (selectedPatient) {
    return <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Risk Adjustment Viewer</h1>
            <p className="text-gray-600">Monitor patient risk profiles and identify missing risk codes</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowAnalytics(true)} variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics Dashboard
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Patients</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {patients.filter((p) => p.status.includes("High Risk")).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(patients.reduce((sum, p) => sum + p.riskScore, 0) / patients.length).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missing Codes</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {patients.reduce((sum, p) => sum + p.missingCodes, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">HEDIS Gaps</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {patients.reduce((sum, p) => sum + (p.hedis?.gapCount || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Quality measure gaps</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Patient Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or insurance ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="riskScore">Risk Score</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="missingCodes">Missing Codes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="very high">Very High Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="moderate">Moderate Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient List ({filteredAndSortedPatients.length} patients)</CardTitle>
            <CardDescription>Click on a patient to view detailed risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Insurance ID</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Conditions</TableHead>
                  <TableHead>Missing Codes</TableHead>
                  <TableHead>HEDIS Score</TableHead>
                  <TableHead>Last Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>
                      {patient.age} / {patient.gender.charAt(0)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{patient.insuranceId}</TableCell>
                    <TableCell>
                      <span className="font-bold text-lg">{patient.riskScore}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeColor(patient.status)}>{patient.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.slice(0, 3).map((condition, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                        {patient.conditions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{patient.conditions.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.missingCodes > 0 ? (
                        <Badge variant="destructive">{patient.missingCodes}</Badge>
                      ) : (
                        <Badge variant="secondary">0</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600">{patient?.hedis?.overallScore || "N/A"}</span>
                        {patient?.hedis?.gapCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {patient?.hedis.gapCount} gaps
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <ComplianceFooter />
      </div>
    </div>
  )
}
