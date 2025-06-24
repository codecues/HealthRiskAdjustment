"use client"

import { ArrowLeft, TrendingUp, AlertTriangle, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function Analytics({ onBack, patients }) {
  // Mock analytics data
  const analyticsData = {
    totalPatients: patients.length,
    highRiskPatients: patients.filter((p) => p.status.includes("High Risk")).length,
    totalMissingCodes: patients.reduce((sum, p) => sum + p.missingCodes, 0),
    avgRiskScore: (patients.reduce((sum, p) => sum + p.riskScore, 0) / patients.length).toFixed(2),
    interventionCompletionRate: 73, // Mock percentage
    riskTrends: [
      { period: "Q1 2024", avgRisk: 2.1, change: "+5.2%" },
      { period: "Q2 2024", avgRisk: 2.3, change: "+9.5%" },
      { period: "Q3 2024", avgRisk: 2.4, change: "+4.3%" },
      { period: "Q4 2024", avgRisk: 2.5, change: "+4.2%" },
    ],
    topMissingHCCs: [
      { hcc: "HCC-18", condition: "Diabetes with Complications", count: 8, impact: "High" },
      { hcc: "HCC-85", condition: "Congestive Heart Failure", count: 6, impact: "Very High" },
      { hcc: "HCC-137", condition: "CKD Stage 4+", count: 5, impact: "High" },
      { hcc: "HCC-96", condition: "Ischemic Heart Disease", count: 4, impact: "Medium" },
    ],
    interventionStatus: [
      { intervention: "Diabetic Eye Exams", completed: 12, pending: 8, rate: 60 },
      { intervention: "Cardiology Consults", completed: 15, pending: 5, rate: 75 },
      { intervention: "Nephrology Referrals", completed: 8, pending: 7, rate: 53 },
      { intervention: "Lab Work Orders", completed: 18, pending: 2, rate: 90 },
    ],
    hedisMetrics: {
      avgHedisScore: 76.3,
      totalGaps: patients.reduce((sum, p) => sum + (p.hedis?.gapCount || 0), 0),
      measureCompliance: {
        "CDC-HbA1c": { met: 8, total: 10, rate: 80 },
        "CDC-Eye": { met: 5, total: 10, rate: 50 },
        "CDC-Nephropathy": { met: 7, total: 10, rate: 70 },
        CBP: { met: 6, total: 10, rate: 60 },
        "COL-LDL": { met: 9, total: 10, rate: 90 },
      },
    },
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case "Very High":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
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
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Population health metrics and risk adjustment insights</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Active in system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.avgRiskScore}</div>
              <p className="text-xs text-green-600">+4.2% from last quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missing HCC Codes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analyticsData.totalMissingCodes}</div>
              <p className="text-xs text-muted-foreground">Across all patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Intervention Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{analyticsData.interventionCompletionRate}%</div>
              <p className="text-xs text-muted-foreground">Completed this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg HEDIS Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{analyticsData.hedisMetrics.avgHedisScore}</div>
              <p className="text-xs text-muted-foreground">Quality measure compliance</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>HEDIS Measure Compliance</CardTitle>
            <CardDescription>Quality measure performance across patient population</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measure</TableHead>
                  <TableHead>Patients Met</TableHead>
                  <TableHead>Total Eligible</TableHead>
                  <TableHead>Compliance Rate</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(analyticsData.hedisMetrics.measureCompliance).map(([measure, data]) => (
                  <TableRow key={measure}>
                    <TableCell>
                      <Badge variant="outline">{measure}</Badge>
                    </TableCell>
                    <TableCell>{data.met}</TableCell>
                    <TableCell>{data.total}</TableCell>
                    <TableCell>
                      <span className={data.rate >= 70 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {data.rate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Progress value={data.rate} className="w-20" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Score Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Score Trends</CardTitle>
              <CardDescription>Quarterly average risk scores and year-over-year changes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Avg Risk Score</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.riskTrends.map((trend, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{trend.period}</TableCell>
                      <TableCell>{trend.avgRisk}</TableCell>
                      <TableCell className="text-green-600 font-medium">{trend.change}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Missing HCCs */}
          <Card>
            <CardHeader>
              <CardTitle>Most Common Missing HCCs</CardTitle>
              <CardDescription>HCC codes with highest documentation gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>HCC Code</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.topMissingHCCs.map((hcc, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Badge variant="outline">{hcc.hcc}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{hcc.condition}</TableCell>
                      <TableCell>{hcc.count}</TableCell>
                      <TableCell>
                        <Badge variant={getImpactColor(hcc.impact)}>{hcc.impact}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Intervention Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Intervention Completion Status</CardTitle>
            <CardDescription>Progress on recommended clinical interventions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analyticsData.interventionStatus.map((intervention, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{intervention.intervention}</span>
                    <span className="text-sm text-muted-foreground">
                      {intervention.completed}/{intervention.completed + intervention.pending} completed
                    </span>
                  </div>
                  <Progress value={intervention.rate} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{intervention.rate}% completion rate</span>
                    <span>{intervention.pending} pending</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Risk Distribution</CardTitle>
            <CardDescription>Breakdown of patients by risk category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {patients.filter((p) => p.status === "Very High Risk").length}
                </div>
                <p className="text-sm text-muted-foreground">Very High Risk</p>
                <p className="text-xs text-red-600">Risk Score {">"} 3.0</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {patients.filter((p) => p.status === "High Risk").length}
                </div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-xs text-orange-600">Risk Score 2.0 - 3.0</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {patients.filter((p) => p.status === "Moderate Risk").length}
                </div>
                <p className="text-sm text-muted-foreground">Moderate Risk</p>
                <p className="text-xs text-blue-600">Risk Score {"<"} 2.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
