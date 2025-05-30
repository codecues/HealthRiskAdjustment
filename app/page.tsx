"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, User, Calendar, AlertTriangle, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PatientDetail from "./patient-detail"

// Mock patient data
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
  },
]

export default function HomePage() {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

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

  if (selectedPatient) {
    return <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Risk Adjustment Viewer</h1>
          <p className="text-gray-600">Monitor patient risk profiles and identify missing risk codes</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    <TableCell>{patient.lastVisit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
