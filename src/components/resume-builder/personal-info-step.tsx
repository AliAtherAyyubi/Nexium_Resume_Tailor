"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfoStepProps {
  data: any
  onUpdate: (data: any) => void
}

export default function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    address: data.address || "",
    summary: data.summary || "",
  })

  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="John"
            className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Doe"
            className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john.doe@example.com"
            className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="123 Main St, City, State 12345"
          className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Write a brief summary of your professional background and career objectives..."
          rows={4}
          className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </motion.div>
  )
}
