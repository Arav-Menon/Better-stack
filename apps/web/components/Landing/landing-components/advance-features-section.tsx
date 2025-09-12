"use client"

import { useState } from "react"
import { CustomCard } from "@/components/ui/custom-card"

const advancedFeatures = [
  {
    id: "ai-insights",
    title: "AI-Powered Insights",
    description:
      "Machine learning algorithms analyze your monitoring data to predict potential issues before they occur.",
    icon: "🤖",
    details: [
      "Predictive failure analysis",
      "Anomaly detection patterns",
      "Performance trend forecasting",
      "Automated root cause analysis",
    ],
  },
  {
    id: "global-monitoring",
    title: "Global Monitoring Network",
    description: "Monitor from 50+ locations worldwide to ensure your services are accessible from anywhere.",
    icon: "🌍",
    details: [
      "50+ monitoring locations",
      "Multi-region failover detection",
      "Geographic performance insights",
      "CDN performance monitoring",
    ],
  },
  {
    id: "custom-scripting",
    title: "Custom Script Monitoring",
    description: "Run complex monitoring scenarios with custom JavaScript to test user journeys and business logic.",
    icon: "⚡",
    details: [
      "JavaScript-based monitoring",
      "Multi-step user journey testing",
      "API workflow validation",
      "Custom assertion logic",
    ],
  },
  {
    id: "incident-management",
    title: "Advanced Incident Management",
    description:
      "Streamlined incident response with automated escalation, post-mortem generation, and team collaboration.",
    icon: "🚨",
    details: [
      "Automated escalation policies",
      "Incident timeline tracking",
      "Post-mortem report generation",
      "Team collaboration tools",
    ],
  },
]

export function AdvancedFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState("ai-insights")

  return (
    <section className="py-20 bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fff] mb-4">Advanced Monitoring Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Go beyond basic uptime monitoring with enterprise-grade features designed for modern infrastructure
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {advancedFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`p-6 rounded-lg border text-white cursor-pointer transition-all duration-300 ${
                  activeFeature === feature.id
                    ? "bg-[#0c0c0c] border-primary shadow-lg"
                    : "bg-[#0c0c0c] border-border hover:border-primary/50"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-8">
            <CustomCard className="p-8">
              {advancedFeatures
                .filter((feature) => feature.id === activeFeature)
                .map((feature) => (
                  <div key={feature.id} className="animate-fade-in">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="text-3xl">{feature.icon}</div>
                      <h3 className="text-2xl font-bold text-[#fff]">{feature.title}</h3>
                    </div>
                    <p className="text-[#fff] mb-6">{feature.description}</p>
                    <div className="space-y-3">
                      {feature.details.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </CustomCard>
          </div>
        </div>
      </div>
    </section>
  )
}
