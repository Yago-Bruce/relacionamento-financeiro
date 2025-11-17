"use client"

import { useState } from "react"
import { Sparkles, ArrowLeft, Lock, Check, Star, Palette, Sticker, Award, Volume2, Zap, FileText, Target, GraduationCap, Users, Gift, Crown, TrendingUp, Trophy, Gem, PartyPopper, RotateCcw, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme, themeStyles } from "@/lib/theme-context"

interface Reward {
  id: number
  name: string
  description: string
  cost: number
  icon: any
  unlocked: boolean
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  themeId?: string
  locked?: boolean // Para rewards bloqueados temporariamente
  oneTimeOnly?: boolean // Para rewards que só podem ser comprados uma vez
}

export default function RewardsPage() {
  const INITIAL_POINTS = 10000 // Pontos iniciais para teste
  const [userPoints, setUserPoints] = useState(INITIAL_POINTS)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showConfetti, setShowConfetti] = useState(false)
  const [lastUnlocked, setLastUnlocked] = useState<string | null>(null)
  const [unlockedRewards, setUnlockedRewards] = useState<Set<number>>(new Set())
  const [viewMode, setViewMode] = useState<"shop" | "purchased">("shop") // Nova funcionalidade: alternar entre loja e comprados
  
  const { currentTheme, setTheme, unlockTheme, unlockedThemes } = useTheme()
  const styles = themeStyles[currentTheme]

  const initialRewards: Reward[] = [
    // COMMON - Agrupados
    { id: 1, name: "Romance Theme", description: "Exclusive pink & red visual theme", cost: 50, icon: Palette, unlocked: false, category: "themes", rarity: "common", themeId: "romance", oneTimeOnly: true },
    { id: 3, name: "Galaxy Love Theme", description: "Cosmic purple & blue theme", cost: 50, icon: Palette, unlocked: false, category: "themes", rarity: "common", themeId: "galaxy", oneTimeOnly: true },
    { id: 11, name: "Success Sound Pack", description: "Special sounds for achievements", cost: 60, icon: Volume2, unlocked: false, category: "sounds", rarity: "common" },
    { id: 12, name: "Victory Vibrations", description: "Haptic feedback for wins", cost: 60, icon: Zap, unlocked: false, category: "sounds", rarity: "common" },
    { id: 13, name: "Fireworks Animation", description: "Celebrate goals with fireworks", cost: 70, icon: Zap, unlocked: false, category: "animations", rarity: "common" },
    { id: 14, name: "Flying Hearts", description: "Hearts float when you save", cost: 70, icon: Zap, unlocked: false, category: "animations", rarity: "common" },
    { id: 15, name: "Coin Rain", description: "Money shower on achievements", cost: 70, icon: Zap, unlocked: false, category: "animations", rarity: "common" },
    { id: 5, name: "Couple Stickers Pack", description: "Animated stickers for chat", cost: 80, icon: Sticker, unlocked: false, category: "stickers", rarity: "common", oneTimeOnly: true },
    { id: 6, name: "Love Reactions Pack", description: "Special emoji reactions", cost: 80, icon: Sticker, unlocked: false, category: "stickers", rarity: "common", oneTimeOnly: true },
    
    // RARE - Agrupados
    { id: 7, name: "Minimalist Love Badge", description: "Show your simple lifestyle", cost: 100, icon: Award, unlocked: false, category: "badges", rarity: "rare" },
    { id: 8, name: "Economic Duo Badge", description: "Master of savings together", cost: 100, icon: Award, unlocked: false, category: "badges", rarity: "rare" },
    { id: 9, name: "Budget Ninja Badge", description: "Stealth mode savings expert", cost: 100, icon: Award, unlocked: false, category: "badges", rarity: "rare" },
    { id: 10, name: "Impulse Cure Badge", description: "Defeated impulsive spending", cost: 100, icon: Award, unlocked: false, category: "badges", rarity: "rare" },
    { id: 19, name: "Super Anti-Impulse Mission", description: "Challenge: 7 days no impulse buys", cost: 150, icon: Target, unlocked: false, category: "missions", rarity: "rare" },
    { id: 20, name: "No Delivery Challenge", description: "3 days without food delivery", cost: 150, icon: Target, unlocked: false, category: "missions", rarity: "rare" },
    { id: 21, name: "Extra Income Mission", description: "1-hour side hustle challenge", cost: 150, icon: Target, unlocked: false, category: "missions", rarity: "rare" },
    { id: 22, name: "Save Without Pain Course", description: "5-min course on easy savings", cost: 180, icon: GraduationCap, unlocked: false, category: "courses", rarity: "rare", locked: true },
    { id: 23, name: "Money Talk Course", description: "How to discuss finances peacefully", cost: 180, icon: GraduationCap, unlocked: false, category: "courses", rarity: "rare", locked: true },
    { id: 24, name: "Emotional Spending Course", description: "Avoid emotional purchases", cost: 180, icon: GraduationCap, unlocked: false, category: "courses", rarity: "rare", locked: true },
    { id: 16, name: "Impulsivity Report", description: "Deep analysis of spending patterns", cost: 200, icon: FileText, unlocked: false, category: "reports", rarity: "rare", locked: true },
    { id: 17, name: "Couple Comparison Report", description: "See how you compare to others", cost: 200, icon: FileText, unlocked: false, category: "reports", rarity: "rare", locked: true },
    { id: 18, name: "Advanced Emotional Report", description: "Financial mood insights", cost: 200, icon: FileText, unlocked: false, category: "reports", rarity: "rare", locked: true },
    
    // EPIC - Agrupados
    { id: 25, name: "Premium Couple Avatar", description: "Exclusive animated avatars", cost: 250, icon: Users, unlocked: false, category: "avatars", rarity: "epic", oneTimeOnly: true },
    { id: 26, name: "Mood-Based Avatars", description: "Avatars that change with finances", cost: 250, icon: Users, unlocked: false, category: "avatars", rarity: "epic", oneTimeOnly: true },
    { id: 27, name: "Forgiveness Card", description: "One guilt-free purchase pass", cost: 500, icon: Gift, unlocked: false, category: "special", rarity: "epic" },
    
    // LEGENDARY - Agrupados
    { id: 28, name: "Early Access VIP", description: "Test new features first", cost: 1000, icon: Crown, unlocked: false, category: "vip", rarity: "legendary", oneTimeOnly: true },
    { id: 30, name: "Couple Leaderboard Access", description: "Join the top savers showcase", cost: 2000, icon: Trophy, unlocked: false, category: "vip", rarity: "legendary", locked: true },
    { id: 29, name: "20% Subscription Discount", description: "One month at 20% off", cost: 3000, icon: TrendingUp, unlocked: false, category: "vip", rarity: "legendary" },
    { id: 31, name: "Budget Royalty Avatar", description: "King & Queen of budgeting", cost: 5000, icon: Crown, unlocked: false, category: "collections", rarity: "legendary", oneTimeOnly: true },
    { id: 32, name: "Infinite Wealth Theme", description: "Ultra-premium gold theme", cost: 5000, icon: Gem, unlocked: false, category: "collections", rarity: "legendary", themeId: "infinite-wealth", locked: true, oneTimeOnly: true },
    { id: 33, name: "Super Couple Sticker", description: "Legendary animated sticker", cost: 5000, icon: Star, unlocked: false, category: "collections", rarity: "legendary", oneTimeOnly: true },
  ]

  const categories = [
    { id: "all", name: "All Rewards", icon: Sparkles },
    { id: "themes", name: "Themes", icon: Palette },
    { id: "stickers", name: "Stickers", icon: Sticker },
    { id: "badges", name: "Badges", icon: Award },
    { id: "sounds", name: "Sounds", icon: Volume2 },
    { id: "animations", name: "Animations", icon: Zap },
    { id: "reports", name: "Reports", icon: FileText },
    { id: "missions", name: "Missions", icon: Target },
    { id: "courses", name: "Courses", icon: GraduationCap },
    { id: "avatars", name: "Avatars", icon: Users },
    { id: "special", name: "Special", icon: Gift },
    { id: "vip", name: "VIP", icon: Crown },
    { id: "collections", name: "Collections", icon: Gem },
  ]

  const handleRedeemReward = (reward: Reward) => {
    // Verifica se o reward está bloqueado
    if (reward.locked) {
      return
    }

    // Verifica se é one-time only e já foi comprado
    if (reward.oneTimeOnly && unlockedRewards.has(reward.id)) {
      return
    }

    if (userPoints >= reward.cost && !unlockedRewards.has(reward.id)) {
      // Deduz os pontos
      setUserPoints(prev => prev - reward.cost)
      
      // Marca como desbloqueada
      setUnlockedRewards(prev => new Set([...prev, reward.id]))
      
      // Se for um tema, desbloqueia no contexto
      if (reward.themeId) {
        unlockTheme(reward.themeId as any)
      }
      
      // Mostra feedback visual
      setLastUnlocked(reward.name)
      setShowConfetti(true)
      
      // Remove o confetti após 3 segundos
      setTimeout(() => {
        setShowConfetti(false)
        setLastUnlocked(null)
      }, 3000)
    }
  }

  const handleReset = () => {
    setUserPoints(INITIAL_POINTS)
    setUnlockedRewards(new Set())
    setLastUnlocked(null)
    setShowConfetti(false)
    setTheme("default")
  }

  const rewards = initialRewards.map(reward => ({
    ...reward,
    unlocked: unlockedRewards.has(reward.id)
  }))

  const filteredRewards = selectedCategory === "all" 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory)

  // Filtra por modo de visualização
  const displayedRewards = viewMode === "shop" 
    ? filteredRewards 
    : filteredRewards.filter(r => r.unlocked)

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "common": return "from-gray-400 to-gray-500"
      case "rare": return "from-blue-400 to-blue-600"
      case "epic": return "from-purple-400 to-purple-600"
      case "legendary": return "from-yellow-400 to-orange-500"
      default: return "from-gray-400 to-gray-500"
    }
  }

  const getRarityBadge = (rarity: string) => {
    switch(rarity) {
      case "common": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      case "rare": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "epic": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className={`min-h-screen ${styles.background}`}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce">
            <PartyPopper className="w-32 h-32 text-yellow-400 drop-shadow-2xl" />
          </div>
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      {/* Success Toast */}
      {lastUnlocked && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <Card className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Reward Unlocked! 🎉</p>
                <p className="text-sm opacity-90">{lastUnlocked}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className={`${styles.header} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => window.location.href = "/"}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  LovePoints Rewards
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Exchange your points for amazing rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Test
              </Button>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-lg px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {userPoints} Points
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Test Mode Banner */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold">🧪 Test Mode Active</p>
              <p className="text-sm opacity-90">You have {INITIAL_POINTS.toLocaleString()} test points. Click "Redeem" to simulate purchases!</p>
            </div>
          </div>
        </Card>

        {/* View Mode Toggle */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setViewMode("shop")}
            variant={viewMode === "shop" ? "default" : "outline"}
            className={viewMode === "shop" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : ""}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Shop
          </Button>
          <Button
            onClick={() => setViewMode("purchased")}
            variant={viewMode === "purchased" ? "default" : "outline"}
            className={viewMode === "purchased" ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" : ""}
          >
            <Package className="w-4 h-4 mr-2" />
            My Rewards ({unlockedRewards.size})
          </Button>
        </div>

        {/* Theme Selector (for unlocked themes) */}
        {unlockedThemes.size > 1 && viewMode === "purchased" && (
          <Card className={`p-6 mb-6 ${styles.card}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Palette className="w-6 h-6" />
              Active Theme
            </h2>
            <div className="flex flex-wrap gap-3">
              {Array.from(unlockedThemes).map((theme) => (
                <Button
                  key={theme}
                  onClick={() => setTheme(theme as any)}
                  variant={currentTheme === theme ? "default" : "outline"}
                  className={currentTheme === theme ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : ""}
                >
                  {theme === "default" && "Default"}
                  {theme === "romance" && "💕 Romance"}
                  {theme === "miami" && "🌴 Miami"}
                  {theme === "galaxy" && "🌌 Galaxy"}
                  {theme === "pink-finance" && "💼 Pink Finance"}
                  {theme === "infinite-wealth" && "👑 Infinite Wealth"}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Points Progress */}
        {viewMode === "shop" && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white border-0 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Your LovePoints Balance</h2>
                <p className="text-sm opacity-90">Keep earning to unlock more rewards!</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold">{userPoints.toLocaleString()}</p>
                <p className="text-sm opacity-90">points</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Unlocked: {unlockedRewards.size} / {rewards.length} rewards</span>
                <span>{Math.round((unlockedRewards.size / rewards.length) * 100)}%</span>
              </div>
              <Progress value={(unlockedRewards.size / rewards.length) * 100} className="h-3 bg-white/30" />
            </div>
          </Card>
        )}

        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                      : `${styles.card} text-gray-700 dark:text-gray-300 hover:shadow-md`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Empty State for Purchased */}
        {viewMode === "purchased" && displayedRewards.length === 0 && (
          <Card className={`p-12 text-center ${styles.card}`}>
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No rewards purchased yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to unlock amazing rewards!
            </p>
            <Button
              onClick={() => setViewMode("shop")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Go to Shop
            </Button>
          </Card>
        )}

        {/* Rewards Grid */}
        {displayedRewards.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRewards.map((reward) => {
              const Icon = reward.icon
              const canAfford = userPoints >= reward.cost
              const isLocked = reward.locked
              const alreadyOwned = reward.oneTimeOnly && reward.unlocked
              
              return (
                <Card
                  key={reward.id}
                  className={`p-6 transition-all hover:shadow-xl ${
                    reward.unlocked
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700/30"
                      : isLocked
                      ? "bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-300 dark:border-gray-700/30 opacity-60"
                      : canAfford
                      ? `${styles.card} border-2 border-purple-200 dark:border-purple-700/30 cursor-pointer hover:scale-105`
                      : "bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700/30 opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getRarityColor(reward.rarity)}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={getRarityBadge(reward.rarity)}>
                      {reward.rarity.toUpperCase()}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {reward.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {reward.description}
                  </p>

                  {reward.oneTimeOnly && !reward.unlocked && (
                    <Badge variant="outline" className="mb-3 border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300">
                      <Star className="w-3 h-3 mr-1" />
                      One-Time Only
                    </Badge>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {reward.cost} pts
                      </span>
                    </div>
                    
                    {reward.unlocked ? (
                      <Badge className="bg-green-500 text-white border-0">
                        <Check className="w-4 h-4 mr-1" />
                        Owned
                      </Badge>
                    ) : isLocked ? (
                      <Badge variant="outline" className="border-orange-300 text-orange-600 dark:border-orange-600 dark:text-orange-400">
                        <Lock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    ) : alreadyOwned ? (
                      <Badge className="bg-green-500 text-white border-0">
                        <Check className="w-4 h-4 mr-1" />
                        Owned
                      </Badge>
                    ) : canAfford ? (
                      <Button
                        size="sm"
                        onClick={() => handleRedeemReward(reward)}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      >
                        Redeem
                      </Button>
                    ) : (
                      <Badge variant="outline" className="border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* How to Earn More */}
        {viewMode === "shop" && (
          <Card className={`p-6 mt-8 ${styles.card} border-2 border-blue-200 dark:border-blue-700/30`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              How to Earn More LovePoints
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 ${styles.card} rounded-xl`}>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Log Expenses</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+10 pts each</p>
              </div>
              <div className={`p-4 ${styles.card} rounded-xl`}>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Complete Missions</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+10-50 pts</p>
              </div>
              <div className={`p-4 ${styles.card} rounded-xl`}>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Reach Goals</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+100 pts</p>
              </div>
              <div className={`p-4 ${styles.card} rounded-xl`}>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Daily Streaks</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+5 pts/day</p>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
