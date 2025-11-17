"use client"

import { useState } from "react"
import { Heart, Camera, ArrowRight, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type OnboardingStep = "signup" | "profile" | "partner" | "complete"

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [partnerName, setPartnerName] = useState("")
  const [partnerPhoto, setPartnerPhoto] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "user" | "partner") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === "user") {
          setUserPhoto(reader.result as string)
        } else {
          setPartnerPhoto(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSkipLater = () => {
    if (step === "profile") {
      setStep("partner")
    } else if (step === "partner") {
      setStep("complete")
      // Redirect to subscription page
      window.location.href = "/subscription"
    }
  }

  const handleNext = () => {
    if (step === "signup") {
      setStep("profile")
    } else if (step === "profile") {
      setStep("partner")
    } else if (step === "partner") {
      setStep("complete")
      // Redirect to subscription page
      window.location.href = "/subscription"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              MoneyMates
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {step === "signup" && "Create your account"}
            {step === "profile" && "Set up your profile"}
            {step === "partner" && "Add your partner"}
          </p>
        </div>

        {/* Signup Step */}
        {step === "signup" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Profile Setup Step */}
        {step === "profile" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center overflow-hidden">
                  {userPhoto ? (
                    <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <label
                  htmlFor="user-photo"
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all"
                >
                  <Camera className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <input
                    id="user-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, "user")}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Upload your photo</p>
            </div>

            <div>
              <Label htmlFor="userName" className="text-gray-700 dark:text-gray-300">What should we call you?</Label>
              <Input
                id="userName"
                type="text"
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Partner Setup Step */}
        {step === "partner" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center overflow-hidden">
                  {partnerPhoto ? (
                    <img src={partnerPhoto} alt="Partner" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <label
                  htmlFor="partner-photo"
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all"
                >
                  <Camera className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <input
                    id="partner-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, "partner")}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Upload partner's photo</p>
            </div>

            <div>
              <Label htmlFor="partnerName" className="text-gray-700 dark:text-gray-300">Partner's name</Label>
              <Input
                id="partnerName"
                type="text"
                placeholder="Partner's name"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
            >
              Complete Setup
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Skip Later Button */}
        {(step === "profile" || step === "partner") && (
          <button
            onClick={handleSkipLater}
            className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            I'll do this later
          </button>
        )}

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className={`w-2 h-2 rounded-full ${step === "signup" ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`} />
          <div className={`w-2 h-2 rounded-full ${step === "profile" ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`} />
          <div className={`w-2 h-2 rounded-full ${step === "partner" ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`} />
        </div>
      </Card>
    </div>
  )
}
