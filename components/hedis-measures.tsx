"use client"

import { useState } from "react"
import { CheckCircle, AlertTriangle, Clock, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const hedisEducationData = {
  "CDC-HbA1c": {
    title: "Comprehensive Diabetes Care - HbA1c Testing",
    description: "Percentage of members 18-75 years of age with diabetes who had HbA1c testing",
    specification: "At least one HbA1c test during the measurement year",
    target: "Annual testing required",
    clinicalRationale:
      "HbA1c testing provides a 2-3 month average of blood glucose levels and is essential for diabetes management",
    interventions: [
      "Schedule quarterly HbA1c testing for poorly controlled diabetes",
      "Annual testing minimum for well-controlled diabetes",
      "Patient education on importance of regular monitoring",
    ],
  },
  "CDC-Eye": {
    title: "Comprehensive Diabetes Care - Eye Exam",
    description: "Percentage of members 18-75 years of age with diabetes who had an eye exam",
    specification: "Diabetic retinal screening performed by an eye care professional",
    target: "Annual dilated eye exam",
    clinicalRationale: "Early detection and treatment of diabetic retinopathy can prevent vision loss",
    interventions: [
      "Refer to ophthalmologist or optometrist",
      "Schedule annual dilated eye exam",
      "Patient education on diabetic eye disease risks",
    ],
  },
  "CDC-Nephropathy": {
    title: "Comprehensive Diabetes Care - Nephropathy Screening",
    description: "Percentage of members 18-75 years of age with diabetes who had nephropathy screening",
    specification: "Urine microalbumin test or ACE inhibitor/ARB therapy",
    target: "Annual screening",
    clinicalRationale: "Early detection of diabetic kidney disease allows for interventions to slow progression",
    interventions: [
      "Order annual urine microalbumin test",
      "Consider ACE inhibitor or ARB therapy",
      "Monitor kidney function with serum creatinine",
    ],
  },
  CBP: {
    title: "Controlling High Blood Pressure",
    description: "Percentage of members 18-85 years of age with hypertension whose BP was adequately controlled",
    specification: "Blood pressure <140/90 mmHg",
    target: "<140/90 mmHg for most patients",
    clinicalRationale: "Blood pressure control reduces risk of cardiovascular events, stroke, and kidney disease",
    interventions: [
      "Medication optimization",
      "Lifestyle counseling (diet, exercise, weight management)",
      "Home blood pressure monitoring",
    ],
  },
  "COL-LDL": {
    title: "Statin Therapy for Patients with Cardiovascular Disease",
    description:
      "Percentage of males 21-75 and females 40-75 years of age with cardiovascular disease who were dispensed a statin",
    specification: "LDL-C screening and statin therapy as appropriate",
    target: "LDL-C <100 mg/dL (or <70 mg/dL for high risk)",
    clinicalRationale:
      "Statin therapy reduces cardiovascular events in patients with established cardiovascular disease",
    interventions: [
      "Initiate or optimize statin therapy",
      "Monitor lipid levels",
      "Patient education on cardiovascular risk reduction",
    ],
  },
}

export default function HedisMeasures({ patient }) {
  const [selectedMeasure, setSelectedMeasure] = useState(null)
  const [isEducationOpen, setIsEducationOpen] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case "Met":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Gap":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Due Soon":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Met":
        return "default"
      case "Gap":
        return "destructive"
      case "Due Soon":
        return "secondary"
      default:
        return "outline"
    }
  }

  const handleMeasureClick = (measureCode) => {
    setSelectedMeasure(measureCode)
    setIsEducationOpen(true)
  }

  if (!patient.hedis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>HEDIS Quality Measures</CardTitle>
          <CardDescription>No HEDIS data available for this patient</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const hedisScore = patient.hedis.overallScore
  const measures = patient.hedis.measures
  const gapCount = patient.hedis.gapCount

  return (
    <div className="space-y-6">
      {/* HEDIS Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            HEDIS Quality Measures Overview
          </CardTitle>
          <CardDescription>
            Healthcare Effectiveness Data and Information Set (HEDIS) quality measure compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{hedisScore}</div>
              <p className="text-sm text-muted-foreground">Overall HEDIS Score</p>
              <Progress value={hedisScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Object.values(measures).filter((m) => m.status === "Met").length}
              </div>
              <p className="text-sm text-muted-foreground">Measures Met</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{gapCount}</div>
              <p className="text-sm text-muted-foreground">Quality Gaps</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HEDIS Measures Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Individual HEDIS Measures</CardTitle>
          <CardDescription>
            Click on a measure code to learn more about specifications and interventions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Measure</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Value</TableHead>
                <TableHead>Last Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(measures).map(([code, measure]) => (
                <TableRow key={code}>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleMeasureClick(code)} className="font-mono">
                      {code}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{hedisEducationData[code]?.title || "Unknown Measure"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(measure.status)}
                      <Badge variant={getStatusColor(measure.status)}>{measure.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{measure.value || "N/A"}</TableCell>
                  <TableCell>{measure.lastDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {measure.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {measure.status === "Gap" && (
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    )}
                    {measure.status === "Due Soon" && (
                      <Button size="sm" variant="secondary">
                        Remind
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* HEDIS Education Modal */}
      <Dialog open={isEducationOpen} onOpenChange={setIsEducationOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {selectedMeasure && hedisEducationData[selectedMeasure]?.title}
            </DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="mt-2">
                {selectedMeasure}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          {selectedMeasure && hedisEducationData[selectedMeasure] && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Measure Description</h3>
                <p className="text-blue-800">{hedisEducationData[selectedMeasure].description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Specification</h3>
                  <p className="text-green-800 text-sm">{hedisEducationData[selectedMeasure].specification}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">Target</h3>
                  <p className="text-purple-800 text-sm">{hedisEducationData[selectedMeasure].target}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Clinical Rationale</h3>
                <p className="text-gray-700 text-sm">{hedisEducationData[selectedMeasure].clinicalRationale}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">Recommended Interventions</h3>
                <ul className="text-yellow-800 text-sm space-y-1">
                  {hedisEducationData[selectedMeasure].interventions.map((intervention, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      {intervention}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
