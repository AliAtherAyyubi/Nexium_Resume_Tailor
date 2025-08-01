"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceStepProps {
  data: any
  onUpdate: (data: any) => void
}

export default function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.experiences || [
      {
        id: "1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  )

  useEffect(() => {
    onUpdate({ experiences })
  }, [experiences, onUpdate])

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setExperiences([...experiences, newExperience])
  }

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id))
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
              {experiences.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                    placeholder="Company Name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                    placeholder="Job Title"
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <Button
        onClick={addExperience}
        variant="outline"
        className="w-full border-dashed border-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 bg-transparent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Experience
      </Button>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Tips for experience descriptions:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Start with action verbs (Led, Developed, Managed)</li>
          <li>• Include quantifiable achievements when possible</li>
          <li>• Focus on results and impact</li>
          <li>• Keep descriptions concise but informative</li>
        </ul>
      </div>
    </motion.div>
  )
}
