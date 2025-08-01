"use client"

import Link from "next/link"
import { FileText, X, Mail } from "lucide-react"
import { isLogin } from "@/lib/supabase"
import { useEffect, useState } from "react"
export default function Footer() {
  const [isUser, setisUser] = useState(false)
  useEffect(() => {
    isLogin().then((user) => {
      setisUser(user)
    })
  }, [])
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ResumeFit</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Create professional, ATS-friendly resumes that help you land your dream job. Trusted by thousands of
              professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <X className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a> */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href={isUser? "/resume-builder":'/login'} className="text-gray-400 hover:text-white transition-colors duration-300">
                  Resume Builder
                </Link>
              </li>
              {/* <li>
                <Link href="/templates" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Templates
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ResumeFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
