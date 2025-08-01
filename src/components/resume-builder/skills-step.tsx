"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

interface SkillsStepProps {
  data: any
  onUpdate: (data: any) => void
}

export default function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [skills, setSkills] = useState<string[]>(data.skills || [])
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    onUpdate({ skills })
  }, [skills, onUpdate])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="newSkill">Add Skills</Label>
        <div className="flex gap-2">
          <Input
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, React, Node.js"
            className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
          />
          <Button onClick={addSkill} className="gradient-bg hover:opacity-90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="space-y-4">
          <Label>Your Skills</Label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 hover:from-purple-200 hover:to-blue-200 transition-all duration-300"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-red-600 transition-colors duration-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Tips for adding skills:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Include both technical and soft skills</li>
          <li>• Add skills relevant to your target job</li>
          <li>• Use industry-standard terminology</li>
          <li>• Include programming languages, tools, and frameworks</li>
        </ul>
      </div>
    </motion.div>
  )
}
