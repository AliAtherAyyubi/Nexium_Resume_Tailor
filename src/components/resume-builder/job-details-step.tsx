"use client"

import type React from "react"

import { useState,} from "react"
import { motion } from "motion/react"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface JobDetailsStepProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: () => void
}

export default function JobDetailsStep({ data, onUpdate, onComplete }: JobDetailsStepProps) {
  const [jobData, setJobData] = useState({
    // jobTitle: data.jobTitle || "",
    jobDescription: data.jobDescription || "",
    ...data,
  })

  // useEffect(() => {
  //   onUpdate(jobData)
  // }, [jobData, onUpdate])

  // Check if job details are complete and mark step as completed
  // useEffect(() => {
  //   const isComplete = jobData.jobTitle.trim() !== ""
  //   if (isComplete) {
  //     onComplete()
  //   }
  // }, [jobData.jobTitle, jobData.company, onComplete])

  const handleChange = (field: string, value: string) => {
    setJobData((prev: typeof jobData) => ({ ...prev, [field]: value }))
  }


  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault()
      action()
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Job Basic Info */}
      <div className="">
        {/* <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              value={jobData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div> */}

        <div className="space-y-2 mt-8">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            value={jobData.jobDescription}
            onChange={(e) => handleChange("jobDescription", e.target.value)}
            placeholder="Paste the job description here or describe the role you're targeting..."
            rows={20}
            className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 min-h-96"
          />
        </div>
      </div>

     
    </motion.div>
  )
}
