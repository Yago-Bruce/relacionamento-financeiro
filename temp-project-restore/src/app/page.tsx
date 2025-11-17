"use client"

import { useState, useEffect } from "react"
import { Heart, TrendingUp, Target, Sparkles, Plus, DollarSign, Camera, Award, Calendar, TrendingDown, MessageCircle, Bell, Building2, Settings, Activity, Smile, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme, themeStyles } from "@/lib/theme-context"

interface Mission {
  title: string
  type: string
  points: number
  completed: boolean
}

interface Reminder {
  id: number
  name: string
  amount: number
  dueDate: string
  category: string
}

export default function MoneyMates() {
  const { currentTheme } = useTheme()
  const styles = themeStyles[currentTheme]
  
  const [harmonyScore, setHarmonyScore] = useState(78)
  const [userMood, setUserMood] = useState("😌")
  const [partnerMood, setPartnerMood] = useState("😀")
  const [expenseView, setExpenseView] = useState<"weekly" | "monthly">("weekly")
  const [showAchievements, setShowAchievements] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [showBankIntegration, setShowBankIntegration] = useState(false)
  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseCategory, setExpenseCategory] = useState("")
  const [missions, setMissions] = useState<Mission[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, name: "Rent", amount: 2500, dueDate: "1st of month", category: "🏠 Housing" },
    { id: 2, name: "Netflix", amount: 15.99, dueDate: "15th of month", category: "🎬 Entertainment" },
    { id: 3, name: "Gym Membership", amount: 50, dueDate: "10th of month", category: "💪 Health" },
  ])

  const moods = ["😌", "😬", "😀", "🤯"]
  
  const expenses = {
    weekly: [
      { category: "🍔 Restaurants", amount: 340, size: 34 },
      { category: "🚗 Transportation", amount: 180, size: 18 },
      { category: "🛒 Groceries", amount: 420, size: 42 },
      { category: "🎉 Entertainment", amount: 150, size: 15 },
      { category: "❤️ Gifts", amount: 80, size: 8 },
    ],
    monthly: [
      { category: "🍔 Restaurants", amount: 1360, size: 34 },
      { category: "🚗 Transportation", amount: 720, size: 18 },
      { category: "🛒 Groceries", amount: 1680, size: 42 },
      { category: "🎉 Entertainment", amount: 600, size: 15 },
      { category: "❤️ Gifts", amount: 320, size: 8 },
      { category: "🏠 Rent", amount: 2500, size: 62 },
      { category: "💡 Bills", amount: 450, size: 11 },
    ]
  }

  const dailyMissions = [
    "Log 1 expense each",
    "Make 1 purchase with a coupon or discount",
    "Take a photo of a receipt and upload",
    "Categorize 3 random expenses",
    "Avoid impulsive purchases for 24h",
    "Save $5 today",
    "React ❤️🔥😂 to partner's Financial Story",
    "Write 1 sentence about what you learned about money today"
  ]

  const weeklyMissions = [
    "Save $40 this week",
    "Save $40 together",
    "Choose a new goal",
    "Weekly reset: review expenses for 3min",
    "Plan next weekend's expenses",
    "Reduce a recurring expense (Uber, coffee, delivery)",
    "Review paid subscriptions",
    "Add 1 value to the piggy bank",
    "Review long-term goals (trip, emergency)",
    "Adjust expense sharing",
    "Compare with last week and reflect"
  ]

  const emotionalMissions = [
    "Listen to your partner for 2 minutes without interrupting",
    "Share 1 financial fear",
    "Send 1 voice message saying: 'We're not against each other'",
    "Write 1 message admiring your partner's discipline",
    "List 3 things you admire about your partner regarding money",
    "Answer together: what does money mean to you?",
    "Talk about a childhood memory that influenced your spending habits",
    "Plan a future together (even if simple)",
    "Take a 3-minute Love Pause breathing together",
    "Reread an old argument and write how you could have solved it better"
  ]

  // Initialize missions on client side only
  useEffect(() => {
    setMissions([
      { 
        title: dailyMissions[Math.floor(Math.random() * dailyMissions.length)], 
        type: "daily", 
        points: 10, 
        completed: false 
      },
      { 
        title: weeklyMissions[Math.floor(Math.random() * weeklyMissions.length)], 
        type: "weekly", 
        points: 50, 
        completed: false 
      },
      { 
        title: emotionalMissions[Math.floor(Math.random() * emotionalMissions.length)], 
        type: "emotional", 
        points: 30, 
        completed: false 
      },
    ])
  }, [])

  const goals = [
    { name: "Miami Trip", icon: "✈️", progress: 43, current: 2150, target: 5000 },
    { name: "Emergency Fund", icon: "💸", progress: 67, current: 3350, target: 5000 },
    { name: "Wedding", icon: "💍", progress: 28, current: 5600, target: 20000 },
  ]

  const badges = [
    { name: "Peace in Pocket", icon: "🕊️", unlocked: true },
    { name: "Unstoppable Duo", icon: "🚀", unlocked: true },
    { name: "Savings Ninja", icon: "🥷", unlocked: false },
  ]

  const relationshipBox = {
    topWins: [
      "🎉 7 days without impulsive spending",
      "💰 Saved $200 more than planned",
      "🤝 Zero financial arguments this month"
    ],
    patterns: [
      "📊 Weekend spending decreased 30%",
      "🍔 Restaurant expenses are your biggest category"
    ],
    emotionalSummary: "You both feel more aligned and confident about money. Communication improved significantly! 💚",
    nextMonthPrediction: "If you maintain this pace, you'll save an extra $350 and reach your Miami Trip goal 2 months earlier! ✈️"
  }

  const getHarmonyColor = (score: number) => {
    if (score >= 70) return "from-emerald-400 to-teal-500"
    if (score >= 40) return "from-yellow-400 to-orange-400"
    return "from-red-400 to-pink-500"
  }

  const getHarmonyText = (score: number) => {
    if (score >= 70) return "Total Harmony! 💚"
    if (score >= 40) return "Neutral 💛"
    return "Attention Needed 🧡"
  }

  const currentExpenses = expenses[expenseView]
  const totalExpense = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className={`min-h-screen ${styles.background}`}>
      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-2xl">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  MoneyMates
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Money without fights. Love with planning.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Achievements Icon */}
              <button
                onClick={() => setShowAchievements(!showAchievements)}
                className="relative p-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 hover:scale-110 transition-all shadow-lg"
              >
                <Award className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  2
                </span>
              </button>

              {/* Chat Icon */}
              <button
                onClick={() => window.location.href = "/chat"}
                className="relative p-2 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 hover:scale-110 transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </button>

              {/* Settings Icon */}
              <button
                onClick={() => window.location.href = "/settings"}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-all"
              >
                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={() => window.location.href = "/rewards"}
                className="cursor-pointer hover:scale-105 transition-all"
              >
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  1,240 LovePoints
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 ${styles.card}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
              </div>
              <Button variant="ghost" onClick={() => setShowAchievements(false)}>✕</Button>
            </div>
            <div className="grid gap-4">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    badge.unlocked
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700/30"
                      : "bg-gray-50 dark:bg-gray-900/20 border-gray-300 dark:border-gray-700/30 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{badge.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{badge.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {badge.unlocked ? "Unlocked! 🎉" : "Locked"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Reminders Modal */}
      {showReminders && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 ${styles.card}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Reminders</h2>
              </div>
              <Button variant="ghost" onClick={() => setShowReminders(false)}>✕</Button>
            </div>
            <div className="space-y-3 mb-6">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{reminder.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.category}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Due: {reminder.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${reminder.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Reminder
            </Button>
          </Card>
        </div>
      )}

      {/* Bank Integration Modal */}
      {showBankIntegration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 ${styles.card}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bank Integration</h2>
              </div>
              <Button variant="ghost" onClick={() => setShowBankIntegration(false)}>✕</Button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect your US bank account to automatically track expenses and stay on top of your finances.
              </p>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700/30">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🔒 <strong>Secure & Encrypted:</strong> We use bank-level security to protect your data.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <button className="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">Chase</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect account</p>
                  </div>
                </div>
              </button>
              <button className="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">Bank of America</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect account</p>
                  </div>
                </div>
              </button>
              <button className="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">Wells Fargo</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect account</p>
                  </div>
                </div>
              </button>
              <button className="p-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">Citibank</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect account</p>
                  </div>
                </div>
              </button>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Connect Another Bank
            </Button>
          </Card>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Quick Add Expense */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-2xl">
          <h3 className="text-xl font-bold mb-4">💸 Add New Expense</h3>
          <p className="text-sm opacity-90 mb-4">Earn +10 LovePoints for each entry!</p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="amount" className="text-white mb-2 block text-sm font-semibold">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="50.00"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-white mb-2 block text-sm font-semibold">Category</Label>
              <Input
                id="category"
                type="text"
                placeholder="e.g., Groceries, Dinner"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-lg hover:scale-105 transition-all">
              <DollarSign className="w-5 h-5 mr-2" />
              Add Expense
            </Button>
            <Button size="lg" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 font-semibold shadow-lg hover:scale-105 transition-all backdrop-blur-sm">
              <Camera className="w-5 h-5 mr-2" />
              Scan Receipt
            </Button>
          </div>
        </Card>

        {/* Reminders & Bank Integration Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <Card 
            className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700/30 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setShowReminders(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Monthly Reminders</h3>
              </div>
              <Badge className="bg-blue-500 text-white border-0">{reminders.length}</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Never miss a bill payment. Set custom reminders for recurring expenses.
            </p>
            <div className="space-y-2">
              {reminders.slice(0, 2).map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{reminder.name}</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">${reminder.amount}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card 
            className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700/30 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setShowBankIntegration(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bank Integration</h3>
              </div>
              <Badge className="bg-green-500 text-white border-0">US Banks</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Connect your bank account to automatically track expenses in real-time.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="w-8 h-8 bg-green-200 dark:bg-green-800/30 rounded-lg flex items-center justify-center">
                🔒
              </div>
              <span>Bank-level security & encryption</span>
            </div>
          </Card>
        </div>

        {/* Harmony Index */}
        <Card className={`p-6 sm:p-8 mb-6 ${styles.card} border-2 border-purple-100 dark:border-purple-800/30 shadow-xl`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-br ${getHarmonyColor(harmonyScore)} p-3 rounded-2xl`}>
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Harmony Index</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">How is your couple's financial mood</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {harmonyScore}%
                  </span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{getHarmonyText(harmonyScore)}</span>
                </div>
                <Progress value={harmonyScore} className="h-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  💡 <strong>Insight:</strong> You've had 3 consecutive days without impulsive spending! Harmony is high.
                </p>
              </div>
            </div>

            {/* Mood Selector */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-700/30">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">Today's Financial Mood</h3>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">You</p>
                  <div className="flex gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setUserMood(mood)}
                        className={`text-3xl transition-all hover:scale-110 ${
                          userMood === mood ? "scale-125 drop-shadow-lg" : "opacity-50"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Partner</p>
                  <div className="flex gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setPartnerMood(mood)}
                        className={`text-3xl transition-all hover:scale-110 ${
                          partnerMood === mood ? "scale-125 drop-shadow-lg" : "opacity-50"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                  Status: Excited and Calm 🎉
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Missions */}
        <Card className={`p-6 mb-6 ${styles.card} border-2 border-blue-100 dark:border-blue-800/30`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Missions</h2>
            </div>
            <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400">
              {missions.length} active
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      mission.type === "daily"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : mission.type === "weekly"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                    }`}
                  >
                    {mission.type === "daily" ? "🟦 Daily" : mission.type === "weekly" ? "🟩 Weekly" : "💗 Emotional"}
                  </Badge>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">+{mission.points} pts</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{mission.title}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Expenses Bubbles with Toggle */}
          <Card className={`p-6 ${styles.card} border-2 border-orange-100 dark:border-orange-800/30`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Expenses</h2>
              </div>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setExpenseView("weekly")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    expenseView === "weekly"
                      ? "bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Weekly
                </button>
                <button
                  onClick={() => setExpenseView("monthly")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    expenseView === "monthly"
                      ? "bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <TrendingDown className="w-3 h-3 inline mr-1" />
                  Monthly
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center py-4">
              {currentExpenses.map((expense, idx) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  style={{
                    width: `${expense.size * 2.5}px`,
                    height: `${expense.size * 2.5}px`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">${expense.amount}</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg">
                      {expense.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total for the {expenseView === "weekly" ? "week" : "month"}
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${totalExpense.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Financial Relationship Box */}
          <Card className={`p-6 ${styles.card} border-2 border-green-100 dark:border-green-800/30`}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Financial Relationship Box</h2>
            </div>
            
            {/* Top Wins */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">🏆 Top 3 Wins This Month</h3>
              <div className="space-y-2">
                {relationshipBox.topWins.map((win, idx) => (
                  <div key={idx} className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-gray-800 dark:text-gray-200">
                    {win}
                  </div>
                ))}
              </div>
            </div>

            {/* Patterns */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">📊 Key Patterns</h3>
              <div className="space-y-2">
                {relationshipBox.patterns.map((pattern, idx) => (
                  <div key={idx} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-800 dark:text-gray-200">
                    {pattern}
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Summary */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">💚 Emotional Summary</h3>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-sm text-gray-800 dark:text-gray-200">
                {relationshipBox.emotionalSummary}
              </div>
            </div>

            {/* Next Month Prediction */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">🔮 Next Month Prediction</h3>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg text-sm text-gray-800 dark:text-gray-200 border border-yellow-200 dark:border-yellow-700/30">
                {relationshipBox.nextMonthPrediction}
              </div>
            </div>
          </Card>
        </div>

        {/* Love Economy - Real-Time Couple Economy */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 border-2 border-pink-200 dark:border-pink-700/30 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="currentColor" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Love Economy</h2>
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 ml-2">
              Real-Time
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Your couple's financial health at a glance
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Financial Security Level */}
            <div className={`p-4 ${styles.card} rounded-xl border-2 border-green-200 dark:border-green-700/30`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Financial Security</h3>
              </div>
              <div className="space-y-2">
                <Progress value={82} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">82%</span>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-0">
                    Strong
                  </Badge>
                </div>
              </div>
            </div>

            {/* Weekly Alignment */}
            <div className={`p-4 ${styles.card} rounded-xl border-2 border-blue-200 dark:border-blue-700/30`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Weekly Alignment</h3>
              </div>
              <div className="space-y-2">
                <Progress value={75} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">75%</span>
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                    Good
                  </Badge>
                </div>
              </div>
            </div>

            {/* Average Financial Mood */}
            <div className={`p-4 ${styles.card} rounded-xl border-2 border-purple-200 dark:border-purple-700/30`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Smile className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Financial Mood</h3>
              </div>
              <div className="space-y-2">
                <Progress value={78} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">78%</span>
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-0">
                    Happy
                  </Badge>
                </div>
              </div>
            </div>

            {/* Trend */}
            <div className={`p-4 ${styles.card} rounded-xl border-2 border-orange-200 dark:border-orange-700/30`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Trend</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">+12%</span>
                </div>
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 w-full justify-center">
                  📈 Improving
                </Badge>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl border-2 border-pink-300 dark:border-pink-700/30">
            <p className="text-sm text-gray-800 dark:text-gray-200 text-center">
              💕 <strong>Overall Status:</strong> Your financial relationship is thriving! Keep up the great communication and teamwork.
            </p>
          </div>
        </Card>

        {/* Goals */}
        <Card className={`p-6 ${styles.card} border-2 border-purple-100 dark:border-purple-800/30`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shared Goals</h2>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700/30 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{goal.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{goal.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{goal.progress}% completed</p>
                  </div>
                </div>
                <Progress value={goal.progress} className="h-2 mb-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">${goal.current.toLocaleString()}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${goal.target.toLocaleString()}</span>
                </div>
                <Button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Value
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
