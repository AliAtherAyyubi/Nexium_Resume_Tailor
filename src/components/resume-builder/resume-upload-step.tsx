"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  FileText, X, CheckCircle, File, Download, } from "lucide-react"
import FileUpload from "../kokonutui/file-upload"

interface ResumeUploadStepProps {
  data: ResumeUploadData
  onUpdate: (data: ResumeUploadData) => void
  onComplete: () => void
}

interface ResumeUploadData {
  uploadedFile?: UploadedFile | null
  [key: string]: unknown
}

interface UploadedFile {
  file: File
  status: "success" | "error"
  id: string
}

export default function ResumeUploadStep({ data, onUpdate, onComplete }: ResumeUploadStepProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(data.uploadedFile || null)

  // Update parent component when file changes
  useEffect(() => {
    onUpdate({ uploadedFile })
  }, [uploadedFile, onUpdate])

  // Mark step as completed when file is successfully uploaded
  useEffect(() => {
    if (uploadedFile && uploadedFile.status === "success") {
      onComplete()
    }
  }, [uploadedFile, onComplete])

  const handleUploadSuccess = (file: File) => {
    const newFile: UploadedFile = {
      file,
      status: "success",
      id: Date.now().toString(),
    }
    setUploadedFile(newFile)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === "application/pdf") return FileText
    return File
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Upload Area */}
      <FileUpload
        acceptedFileTypes={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}
        maxFileSize={5 * 1024 * 1024} // 5 MB
        onUploadSuccess={handleUploadSuccess}
        currentFile={uploadedFile?.file}
        onFileRemove={removeFile}
      />

      {/* Uploaded File */}
      {uploadedFile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Uploaded Resume</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Successfully Uploaded
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {(() => {
                      const FileIcon = getFileIcon(uploadedFile.file.type)
                      return <FileIcon className="h-5 w-5 text-gray-600" />
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 truncate max-w-xs">{uploadedFile.file.name}</h4>
                    <p className="text-sm text-gray-500">{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = URL.createObjectURL(uploadedFile.file)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = uploadedFile.file.name
                        a.click()
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      {/* <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded mr-2">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            💡 Tips for Better Results
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Upload your most recent resume version
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Ensure text is clear and readable
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                PDF format works best for parsing
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Include contact information
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Use standard section headings
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Avoid images or complex formatting
              </li>
            </ul>
          </div>
        </CardContent>
      </Card> */}
    </motion.div>
  )
}
