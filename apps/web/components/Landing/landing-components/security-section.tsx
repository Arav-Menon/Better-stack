"use client";

import { CustomCard } from "@/components/ui/custom-card";

const securityFeatures = [
  {
    title: "SOC 2 Type II Compliant",
    description: "Independently audited security controls and processes",
    icon: "🛡️",
  },
  {
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest using AES-256",
    icon: "🔒",
  },
  {
    title: "GDPR Compliant",
    description: "Full compliance with European data protection regulations",
    icon: "📋",
  },
  {
    title: "99.99% Uptime SLA",
    description:
      "Guaranteed availability with financial penalties for downtime",
    icon: "⚡",
  },
  {
    title: "Multi-Factor Authentication",
    description: "Secure access with TOTP, SMS, and hardware key support",
    icon: "🔐",
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions and team management capabilities",
    icon: "👥",
  },
];

export function SecuritySection() {
  return (
    <section className="py-20 bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fff] mb-4">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your monitoring data is protected by industry-leading security
            measures and compliance standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <CustomCard key={index} className="p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#fff] mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CustomCard>
          ))}
        </div>

        <div className="bg-[#121313] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#fff] mb-4">
            Security Documentation & Certifications
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Access our complete security documentation, penetration testing
            reports, and compliance certificates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-background border border-border rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-foreground">
                SOC 2 Type II
              </span>
            </div>
            <div className="bg-background border border-border rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-foreground">
                ISO 27001
              </span>
            </div>
            <div className="bg-background border border-border rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-foreground">GDPR</span>
            </div>
            <div className="bg-background border border-border rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-foreground">
                HIPAA Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
