"use client"
import { BookOpen, AlertCircle, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const codeEducationData = {
  "E11.9": {
    title: "Type 2 Diabetes Mellitus without Complications",
    hcc: "HCC-19",
    definition:
      "A metabolic disorder characterized by high blood glucose levels due to insulin resistance and/or insufficient insulin production.",
    clinicalCriteria: [
      "Documented diagnosis of Type 2 diabetes",
      "Evidence of ongoing treatment (medication, diet, exercise)",
      "Laboratory evidence (HbA1c ≥6.5%, fasting glucose ≥126 mg/dL)",
      "No documented diabetic complications",
    ],
    documentationTips: [
      "Specify 'Type 2' diabetes explicitly",
      "Document current treatment regimen",
      "Include recent HbA1c values when available",
      "Note if diabetes is controlled or uncontrolled",
    ],
    commonPitfalls: [
      "Using unspecified diabetes codes",
      "Missing documentation of current treatment",
      "Not updating when complications develop",
      "Failing to document diabetes control status",
    ],
    riskWeight: 0.318,
  },
  I10: {
    title: "Essential (Primary) Hypertension",
    hcc: "HCC-96",
    definition:
      "Persistently elevated blood pressure of unknown cause, typically defined as systolic ≥140 mmHg or diastolic ≥90 mmHg.",
    clinicalCriteria: [
      "Multiple elevated blood pressure readings",
      "Documented diagnosis of hypertension",
      "Evidence of antihypertensive treatment",
      "No identified secondary cause",
    ],
    documentationTips: [
      "Document blood pressure readings when available",
      "Specify if hypertension is controlled or uncontrolled",
      "Include current antihypertensive medications",
      "Note any target organ damage if present",
    ],
    commonPitfalls: [
      "Using unspecified hypertension codes",
      "Not documenting treatment response",
      "Missing documentation of complications",
      "Failing to specify essential vs. secondary hypertension",
    ],
    riskWeight: 0.302,
  },
  "HCC-19": {
    title: "Diabetes without Complications",
    definition:
      "Hierarchical Condition Category for diabetes mellitus without documented complications affecting multiple organ systems.",
    clinicalCriteria: [
      "Documented Type 1 or Type 2 diabetes",
      "No evidence of diabetic complications",
      "Ongoing diabetes management",
      "Regular monitoring and follow-up",
    ],
    documentationTips: [
      "Ensure diabetes type is specified",
      "Document absence of complications when appropriate",
      "Include diabetes management details",
      "Regular reassessment for complications",
    ],
    commonPitfalls: [
      "Missing annual complication screening",
      "Not upgrading to complicated diabetes when appropriate",
      "Insufficient documentation of diabetes management",
      "Using unspecified diabetes codes",
    ],
    riskWeight: 0.318,
  },
}

export default function CodeEducationModal({ code, isOpen, onClose }) {
  const data = codeEducationData[code]

  if (!data) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {data.title}
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{code}</Badge>
              {data.hcc && <Badge>{data.hcc}</Badge>}
              <Badge variant="secondary">Risk Weight: {data.riskWeight}</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="definition" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="definition">Definition</TabsTrigger>
            <TabsTrigger value="criteria">Clinical Criteria</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
          </TabsList>

          <TabsContent value="definition" className="mt-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Clinical Definition</h3>
                <p className="text-blue-800">{data.definition}</p>
              </div>
              {data.riskWeight && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Risk Adjustment Impact</h3>
                  <p className="text-green-800">
                    This condition carries a risk weight of <strong>{data.riskWeight}</strong>, contributing
                    significantly to the patient's overall risk score calculation.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="criteria" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Clinical Criteria for Coding
              </h3>
              <ul className="space-y-2">
                {data.clinicalCriteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                Documentation Best Practices
              </h3>
              <ul className="space-y-2">
                {data.documentationTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="pitfalls" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Common Documentation Pitfalls
              </h3>
              <ul className="space-y-2">
                {data.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
