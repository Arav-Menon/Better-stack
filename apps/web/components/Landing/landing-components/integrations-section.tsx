"use client"

import { useEffect, useRef } from "react"

const companies = [
  { name: "Google", logo: "/google-logo.jpg" },
  { name: "Netflix", logo: "/netflix-logo.jpg" },
  { name: "Meta", logo: "/meta-logo.jpg" },
  { name: "PayPal", logo: "/paypal-logo.jpg" },
  { name: "Ping", logo: "/ping-logo.jpg" },
  { name: "Pleo", logo: "/pleo-logo.jpg" },
  { name: "Algora", logo: "/algora-logo.jpg" },
]

export function IntegrationsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">As used by</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            StatusGuard is tried and trusted by leading tech teams and many Fortune 500 companies.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-16 overflow-hidden whitespace-nowrap"
            style={{
              width: "calc(200% + 64px)",
              animation: "none", // Controlled by JavaScript
            }}
          >
            {/* First set of logos */}
            {companies.map((company, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 flex items-center justify-center">
                <img
                  src={company.logo || "/placeholder.svg?height=60&width=120&query=company logo"}
                  alt={`${company.name} logo`}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 flex items-center justify-center">
                <img
                  src={company.logo || "/placeholder.svg?height=60&width=120&query=company logo"}
                  alt={`${company.name} logo`}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                />
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}
