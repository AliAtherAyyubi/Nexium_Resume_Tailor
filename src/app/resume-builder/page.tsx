"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Award, Upload, Briefcase } from "lucide-react"
import ResumeUploadStep from "@/components/resume-builder/resume-upload-step"
import JobDetailsStep from "@/components/resume-builder/job-details-step"
import ResultStep from "@/components/resume-builder/result-step"
// import toast from "react-hot-toast"
// import { sendResumeToAPI } from "../../../utils/api"

const steps = [
  { id: 1, title: "Upload Resume", icon: Upload, component: ResumeUploadStep },
  { id: 2, title: "Add Job", icon: Briefcase, component: JobDetailsStep },
  { id: 3, title: "Result", icon: Award, component: ResultStep },
]

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component

  const nextStep = async () => {
    // Validate resume upload for step 1
    // if (currentStep === 1) {
    //   if (!formData.uploadedFile) {
    //     toast.error("Please upload your resume before proceeding to the next step.")
    //     return
    //   }
    // }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
    // if (currentStep>1){
    //   const response = await sendResumeToAPI(formData.uploadedFile, formData.jobDescription)
    //   console.log(response)
      
    // }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (stepData: any) => {
    // setFormData((prev: any) => ({ ...prev, ...stepData }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Build Your <span className="gradient-text">Professional Resume</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Follow our step-by-step process to create an outstanding resume
            </p>
          </div>

          {/* Progress Bar with Icons */}
          <Card className="mb-5 ">
            <CardContent className="px-6 py-1">

              {/* Progress Icons */}
              <div className="flex items-center justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <motion.div
                      className={`flex items-center justify-center w-15 h-15 rounded-full border-2 transition-all duration-300 ${
                        completedSteps.includes(step.id) || step.id === currentStep
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white"
                          : "border-gray-300 text-gray-400 bg-white"
                      }`}
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>
                    <span className={`mt-2 text-sm font-medium ${
                      step.id === currentStep 
                        ? "text-purple-600 font-semibold" 
                        : "text-gray-600"
                    }`}>
                      {step.id === 1 ? "Resume" : step.id === 2 ? "Job Description" : "Result"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                {steps.find((step) => step.id === currentStep)?.icon && (
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mr-3">
                    {(() => {
                      const Icon = steps.find((step) => step.id === currentStep)?.icon!
                      return <Icon className="h-5 w-5 text-white" />
                    })()}
                  </div>
                )}
                {steps.find((step) => step.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {CurrentStepComponent && <CurrentStepComponent data={formData} onUpdate={updateFormData} onComplete={() =>{}} />}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center bg-transparent"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="flex items-center gradient-bg hover:opacity-90"
            >
              {currentStep === steps.length ? "Complete" : "Next"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
