"use client"

import { useState } from "react"
import { Plus, User, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AuditNotes({ patientId }) {
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: "Dr. Sarah Williams",
      timestamp: "2024-12-15 14:30",
      note: "Reviewed missing HCC-18 code. Patient shows signs of diabetic retinopathy on recent exam. Scheduling ophthalmology consult.",
      type: "Clinical Review",
    },
    {
      id: 2,
      author: "Jane Smith, RN",
      timestamp: "2024-12-10 09:15",
      note: "Patient education provided regarding diabetes management. Updated care plan to include quarterly HbA1c monitoring.",
      type: "Care Coordination",
    },
  ])
  const [newNote, setNewNote] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: notes.length + 1,
        author: "Current User", // In real app, would get from auth
        timestamp: new Date().toLocaleString(),
        note: newNote,
        type: "Clinical Review",
      }
      setNotes([note, ...notes])
      setNewNote("")
      setIsDialogOpen(false)
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Clinical Review":
        return "default"
      case "Care Coordination":
        return "secondary"
      case "Documentation":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Audit Trail & Clinical Notes
            </CardTitle>
            <CardDescription>Clinical review notes and documentation audit trail</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Clinical Note</DialogTitle>
                <DialogDescription>Document clinical review findings or care coordination activities</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your clinical note here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addNote}>Add Note</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{note.author}</span>
                  <Badge variant={getTypeColor(note.type)}>{note.type}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {note.timestamp}
                </div>
              </div>
              <p className="text-sm leading-relaxed pl-6">{note.note}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No clinical notes recorded yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
