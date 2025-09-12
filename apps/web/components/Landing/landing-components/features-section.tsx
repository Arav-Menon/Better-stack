"use client"

import { useEffect, useState } from "react"
import { CustomCard } from "@/components/ui/custom-card"

const features = [
  {
    title: "Real-Time Monitoring",
    description: "Monitor your websites and APIs 24/7 with checks every 30 seconds from multiple global locations.",
    icon: "🔍",
  },
  {
    title: "Instant Alerts",
    description: "Get notified immediately via email, SMS, Slack, or webhook when downtime is detected.",
    icon: "⚡",
  },
  {
    title: "Status Pages",
    description: "Keep your customers informed with beautiful, customizable status pages that update automatically.",
    icon: "📊",
  },
  {
    title: "Performance Insights",
    description: "Track response times, uptime trends, and performance metrics with detailed analytics.",
    icon: "📈",
  },
  {
    title: "Global Monitoring",
    description: "Monitor from 15+ locations worldwide to ensure your services are accessible everywhere.",
    icon: "🌍",
  },
  {
    title: "Team Collaboration",
    description: "Manage incidents together with your team using built-in collaboration tools and escalation policies.",
    icon: "👥",
  },
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("features")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#fff] mb-4">Everything You Need to Stay Online</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive monitoring tools designed to keep your services running smoothly and your customers happy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <CustomCard
                key={feature.title}
                className={`p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "animate-slide-up" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#fff] mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CustomCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
