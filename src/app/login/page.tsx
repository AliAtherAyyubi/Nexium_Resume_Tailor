"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2} from "lucide-react"
import { supabase } from "@/lib/supabase"
import toast from "react-hot-toast"
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setloading] = useState(false)
  
  async function signInWithEmail(userEmail:string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: userEmail,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: 'http://localhost:3000/resume-builder',
      },
    })
    if(error){
      toast.error('System error')
    }
    else{
      toast.success('An email has been sent to your mail. Please check your inbox.',{duration:5000})
    }
    console.log(error)
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" })
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address" })
      return
    }
    
    setloading(true)
    setErrors({})
    
    try {
      await signInWithEmail(formData.email)
    } catch (error) {
      console.error("Sign in error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setloading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 mt-10">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base">Sign in to your ResumeFit account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={`pl-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg hover:opacity-90 transition-all duration-300 hover:scale-105 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
