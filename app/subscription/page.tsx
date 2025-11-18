"use client"

import { useState } from "react"
import { Heart, Check, Sparkles, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type PlanType = "monthly" | "annual"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("monthly")

  const plans = {
    monthly: {
      price: 9.99,
      period: "month",
      savings: null,
      features: [
        "Unlimited expense tracking",
        "Financial Harmony Index",
        "Daily & Weekly Missions",
        "Shared Goals (up to 5)",
        "Basic Achievements",
        "Partner Chat",
        "Email Support"
      ]
    },
    annual: {
      price: 99.99,
      period: "year",
      savings: "Save $20/year",
      features: [
        "Everything in Monthly",
        "Unlimited Shared Goals",
        "Premium Achievements & Badges",
        "Advanced Financial Insights",
        "Bank Integration (US Banks)",
        "Monthly Reminders",
        "Priority Support",
        "Early Access to New Features"
      ]
    }
  }

  const currentPlan = plans[selectedPlan]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your relationship with money. Start managing finances together with love and fun!
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              selectedPlan === "monthly"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan("annual")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all relative ${
              selectedPlan === "annual"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700"
            }`}
          >
            Annual
            {plans.annual.savings && (
              <Badge className="absolute -top-3 -right-3 bg-green-500 text-white border-0">
                {plans.annual.savings}
              </Badge>
            )}
          </button>
        </div>

        {/* Plan Card */}
        <Card className="max-w-2xl mx-auto p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {selectedPlan === "monthly" ? "Monthly Plan" : "Annual Plan"}
              </h2>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ${currentPlan.price}
              </span>
              <span className="text-xl text-gray-600 dark:text-gray-400">
                /{currentPlan.period}
              </span>
            </div>
            {selectedPlan === "annual" && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-semibold">
                That's only $8.33/month! 🎉
              </p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {currentPlan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-1 rounded-full mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Benefits Highlights */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-700/30">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Better Finances</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Track & improve together</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Less Conflicts</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Harmony over arguments</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Fun & Engaging</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Gamified experience</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => window.location.href = "/"}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Cancel anytime. No questions asked. 💜
          </p>
        </Card>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>30-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" fill="currentColor" />
            <span>Loved by 10,000+ Couples</span>
          </div>
        </div>
      </div>
    </div>
  )
}
