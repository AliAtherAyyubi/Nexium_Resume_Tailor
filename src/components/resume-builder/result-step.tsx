"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Award,
  Download,
  Eye,
  Share2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  FileText,
  Sparkles,
  RefreshCw,
} from "lucide-react"

interface UploadedFile {
  file: File
  status: "success" | "error"
  id: string
}

interface ResultStepData {
  uploadedFile?: UploadedFile | null
  jobDescription?: string
  [key: string]: unknown
}

interface ResultStepProps {
  data: ResultStepData
  onUpdate: (data: ResultStepData) => void
  onComplete: () => void
}

interface AnalysisResult {
  overallScore: number
  matchPercentage: number
  strengths: string[]
  improvements: string[]
  missingSkills: string[]
  recommendations: string[]
  atsScore: number
  keywordMatches: number
  totalKeywords: number
}

export default function ResultStep({ data, onUpdate, onComplete }: ResultStepProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [results, setResults] = useState<AnalysisResult | null>(null)

  // Simulate analysis process
  useEffect(() => {
    const simulateAnalysis = async () => {
      setIsAnalyzing(true)
      setAnalysisProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 300)

      // Simulate analysis completion after 3 seconds
      setTimeout(() => {
        clearInterval(progressInterval)
        setAnalysisProgress(100)

        // Generate mock results based on provided data
        const mockResults: AnalysisResult = {
          overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
          matchPercentage: Math.floor(Math.random() * 25) + 70, // 70-95
          strengths: [
            "Strong technical skills alignment",
            "Relevant work experience",
            "Good educational background",
            "Professional formatting",
          ],
          improvements: [
            "Add more quantifiable achievements",
            "Include industry-specific keywords",
            "Expand on leadership experience",
            "Update contact information format",
          ],
          missingSkills: [
            "Cloud Computing (AWS/Azure)",
            "Agile/Scrum methodology",
            "Data Analysis",
            "Project Management",
          ],
          recommendations: [
            "Highlight specific achievements with numbers",
            "Add relevant certifications section",
            "Include volunteer work or side projects",
            "Optimize for ATS scanning",
          ],
          atsScore: Math.floor(Math.random() * 15) + 80, // 80-95
          keywordMatches: Math.floor(Math.random() * 10) + 15, // 15-25
          totalKeywords: 30,
        }

        setResults(mockResults)
        setIsAnalyzing(false)
        onUpdate({ analysisResults: mockResults })
        onComplete()
      }, 1000)
    }

    simulateAnalysis()
    setIsAnalyzing(false)
  }, [onUpdate, onComplete])

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 85) return CheckCircle
    if (score >= 70) return AlertTriangle
    return AlertTriangle
  }

  if (isAnalyzing) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Analyzing Your Resume</h3>
            <p className="text-gray-600 mb-6">
              Our AI is comparing your resume against the job requirements and optimizing for ATS systems...
            </p>

            <div className="max-w-md mx-auto space-y-4">
              <Progress value={analysisProgress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Processing...</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-600">Parsing Resume</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-600">Matching Keywords</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-600">Generating Report</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (!results) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mr-3">
                <Award className="h-5 w-5 text-white" />
              </div>
              Analysis Results
            </span>
            <Badge className="gradient-bg text-white">Complete</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(results.overallScore)} mb-4`}
              >
                <span className="text-2xl font-bold">{results.overallScore}</span>
              </div>
              <h3 className="font-semibold text-gray-900">Overall Score</h3>
              <p className="text-sm text-gray-600">Resume quality rating</p>
            </div>

            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(results.matchPercentage)} mb-4`}
              >
                <span className="text-2xl font-bold">{results.matchPercentage}%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Job Match</h3>
              <p className="text-sm text-gray-600">Alignment with job requirements</p>
            </div>

            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(results.atsScore)} mb-4`}
              >
                <span className="text-2xl font-bold">{results.atsScore}</span>
              </div>
              <h3 className="font-semibold text-gray-900">ATS Score</h3>
              <p className="text-sm text-gray-600">Applicant tracking system compatibility</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Target className="h-4 w-4" />
              <span>
                Keyword Matches: {results.keywordMatches}/{results.totalKeywords}
              </span>
            </div>
            <Progress value={(results.keywordMatches / results.totalKeywords) * 100} className="max-w-md mx-auto" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.improvements.map((improvement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{improvement}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Missing Skills & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Missing Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.missingSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start text-sm"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Ready to Download Your Optimized Resume?</h3>
            <p className="text-gray-600">Your resume has been analyzed and optimized for the target job position.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="gradient-bg hover:opacity-90 flex items-center px-6 py-3">
                <Download className="h-4 w-4 mr-2" />
                Download Optimized Resume
              </Button>

              <Button variant="outline" className="flex items-center px-6 py-3 bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Preview Resume
              </Button>

              <Button variant="outline" className="flex items-center px-6 py-3 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="text-purple-600 hover:text-purple-700 flex items-center"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Analyze Another Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">🎉 Analysis Complete!</h3>
            <p className="text-gray-600 mb-4">
              Your resume has been successfully analyzed and optimized for the target position.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-purple-600">{data.uploadedFile ? 1 : 0}</div>
                <div className="text-gray-600">Files Processed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{results.keywordMatches}</div>
                <div className="text-gray-600">Keywords Matched</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{results.overallScore}%</div>
                <div className="text-gray-600">Overall Score</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
