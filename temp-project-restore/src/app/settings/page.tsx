"use client"

import { useState } from "react"
import { Settings, User, Lock, Bell, MessageCircle, ArrowLeft, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

type SettingsTab = "profile" | "security" | "notifications" | "support"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => window.location.href = "/"}
            className="text-gray-600 dark:text-gray-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30 h-fit">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "security"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Security</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "notifications"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "support"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Support</span>
              </button>
            </nav>
          </Card>

          {/* Content */}
          <Card className="lg:col-span-3 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Profile</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your personal information</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                      Change Photo
                    </Button>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">JPG, PNG or GIF. Max 5MB.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Partner Information</h3>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-lg border border-blue-200 dark:border-blue-700/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">Partner Name</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">partner@email.com</p>
                    </div>
                    <Badge className="bg-green-500 text-white border-0">Connected</Badge>
                  </div>
                </div>

                <Button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                  Save Changes
                </Button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Keep your account secure</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password" className="text-gray-700 dark:text-gray-300">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="new-password" className="text-gray-700 dark:text-gray-300">New Password</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" className="mt-2" />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/30">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Password Requirements</p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                  Update Password
                </Button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage how you receive notifications</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Enable Notifications</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive all notifications</p>
                    </div>
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        notificationsEnabled ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          notificationsEnabled ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get updates via email</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        emailNotifications ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          emailNotifications ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Push Notifications</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get push notifications on your device</p>
                    </div>
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        pushNotifications ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          pushNotifications ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700/30">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Note:</strong> You'll always receive important notifications about your account security and financial goals.
                  </p>
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === "support" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Support</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get help when you need it</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700/30">
                    <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Get help via email within 24 hours
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      Contact Support
                    </Button>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 border-2 border-pink-200 dark:border-pink-700/30">
                    <MessageCircle className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Chat with our team in real-time
                    </p>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-600 hover:to-orange-700 text-white">
                      Start Chat
                    </Button>
                  </Card>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                        How do I connect my bank account?
                      </summary>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-4">
                        Go to Settings → Bank Integration and follow the secure connection process.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                        How do I invite my partner?
                      </summary>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-4">
                        Go to Profile settings and click "Invite Partner" to send them an invitation link.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                        Can I cancel my subscription anytime?
                      </summary>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-4">
                        Yes! You can cancel anytime from your account settings. No questions asked.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
