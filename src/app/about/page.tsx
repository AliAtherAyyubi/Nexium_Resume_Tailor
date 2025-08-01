"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Award, Zap, Target, Heart, Globe } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Access to 50+ professionally designed resume templates that are ATS-friendly and industry-specific.",
  },
  {
    icon: Zap,
    title: "AI-Powered Suggestions",
    description: "Get intelligent recommendations for content, formatting, and keywords to optimize your resume.",
  },
  {
    icon: Users,
    title: "Expert Reviews",
    description: "Have your resume reviewed by industry experts and career coaches for maximum impact.",
  },
  {
    icon: Globe,
    title: "Multi-Format Export",
    description: "Download your resume in PDF, DOC, or other formats optimized for different platforms.",
  },
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for perfection in every resume we help create.",
  },
  {
    icon: Heart,
    title: "Empowerment",
    description: "We believe everyone deserves a chance to showcase their best self.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "We continuously improve our platform with the latest technology.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-purple-800 bg-purple-100">
                About ResumeBuilder Pro
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Careers Through
              <span className="gradient-text"> Professional Resumes</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're on a mission to help professionals worldwide create stunning resumes that open doors to their dream
              careers. Our platform combines cutting-edge technology with expert insights to deliver results that
              matter.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "50K+", label: "Resumes Created" },
              { value: "95%", label: "Success Rate" },
              { value: "100+", label: "Templates" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              What Makes Us <span className="gradient-text">Different</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine technology, design, and career expertise to create the ultimate resume building experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Our Core Values
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl opacity-90 max-w-2xl mx-auto">
              The principles that guide everything we do at ResumeBuilder Pro.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="opacity-90 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A passionate group of designers, developers, and career experts dedicated to your success.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", image: "/placeholder.svg?height=300&width=300" },
              { name: "Michael Chen", role: "Lead Developer", image: "/placeholder.svg?height=300&width=300" },
              { name: "Emily Rodriguez", role: "Career Expert", image: "/placeholder.svg?height=300&width=300" },
            ].map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
