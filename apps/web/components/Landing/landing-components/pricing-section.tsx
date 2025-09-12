"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomCard } from "@/components/ui/custom-card";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for small projects and personal websites",
    features: [
      "5 monitors",
      "1-minute checks",
      "Email alerts",
      "Basic status page",
      "30-day data retention",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "Ideal for growing businesses and teams",
    features: [
      "25 monitors",
      "30-second checks",
      "Email, SMS & Slack alerts",
      "Custom status pages",
      "1-year data retention",
      "Team collaboration",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "Advanced monitoring for large organizations",
    features: [
      "Unlimited monitors",
      "10-second checks",
      "All alert channels",
      "White-label status pages",
      "Unlimited data retention",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("pricing");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-20 bg-[#0c0c0c]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#fff] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day
              free trial with no credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <CustomCard
                key={plan.name}
                className={`relative p-8 hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-primary scale-105" : ""
                } ${isVisible ? "animate-slide-up" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#fff] mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-[#fff]">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "secondary"}
                >
                  Start Free Trial
                </Button>
              </CustomCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? We'd love to help.
            </p>
            <Button variant="ghost">Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
