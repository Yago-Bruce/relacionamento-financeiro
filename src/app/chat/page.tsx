"use client"

import { useState } from "react"
import { MessageCircle, Send, X, Image, DollarSign, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: number
  sender: "you" | "partner"
  text: string
  timestamp: string
  expense?: {
    amount: number
    category: string
  }
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<"partner" | "ai">("partner")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "partner",
      text: "Hey! Did you see that $340 restaurant expense? 🍔",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      sender: "you",
      text: "Yes! That was our anniversary dinner. Worth it! 💕",
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      sender: "partner",
      text: "Absolutely! But maybe we should cook more at home this week?",
      timestamp: "10:33 AM"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "you",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleSendExpense = (amount: number, category: string) => {
    const message: Message = {
      id: messages.length + 1,
      sender: "you",
      text: "I sent you an expense to review:",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expense: { amount, category }
    }
    setMessages([...messages, message])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Chat Selector */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActiveChat("partner")}
            className={`flex-1 p-4 rounded-xl transition-all ${
              activeChat === "partner"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-semibold">Chat with Partner</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveChat("ai")}
            className={`flex-1 p-4 rounded-xl transition-all ${
              activeChat === "ai"
                ? "bg-gradient-to-r from-blue-500 to-teal-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">LoveMoney AI</span>
            </div>
          </button>
        </div>

        {/* Header */}
        <Card className="p-4 mb-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeChat === "partner" ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Partner</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">LoveMoney AI</h2>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white border-0 text-xs">
                        Always Available
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/"}
              className="text-gray-600 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {activeChat === "ai" && (
          <Card className="p-4 mb-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-2 border-blue-200 dark:border-blue-700/30">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              <strong>💡 Ask me anything about:</strong>
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                • How to save $200/month based on YOUR spending
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                • Automatic plan to reach your Miami goal
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                • How to talk to your partner about overspending
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                • Tips to improve your relationship finances
              </div>
            </div>
          </Card>
        )}

        {/* Messages */}
        <Card className="p-6 mb-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30 h-[500px] overflow-y-auto">
          {activeChat === "partner" ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.sender === "you"
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    } rounded-2xl p-4`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.expense && (
                      <div className="mt-3 p-3 bg-white/20 dark:bg-black/20 rounded-lg border border-white/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">Expense</span>
                          <Badge className="bg-white/30 text-white border-0">
                            ${message.expense.amount}
                          </Badge>
                        </div>
                        <p className="text-xs mt-1">{message.expense.category}</p>
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to LoveMoney AI! 🤖💕
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                  I'm here to help you with financial advice and relationship tips. 
                  Ask me anything about saving money, reaching your goals, or improving communication with your partner!
                </p>
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setNewMessage("How can I save $200 per month based on my spending?")}
                    className="block w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                  >
                    💰 How to save $200/month?
                  </button>
                  <button
                    onClick={() => setNewMessage("Create an automatic plan to reach my Miami Trip goal")}
                    className="block w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                  >
                    ✈️ Plan for Miami Trip goal
                  </button>
                  <button
                    onClick={() => setNewMessage("How do I talk to my partner about overspending?")}
                    className="block w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                  >
                    💬 Talk about overspending
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        {activeChat === "partner" && (
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => handleSendExpense(50, "Groceries")}
              className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Send Expense
            </Button>
            <Button
              variant="outline"
              className="border-purple-300 dark:border-purple-700"
            >
              <Image className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Input */}
        <Card className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-800/30">
          <div className="flex gap-2">
            <Input
              placeholder={activeChat === "partner" ? "Type a message..." : "Ask me anything about finances or relationships..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className={`${
                activeChat === "partner"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
              } text-white`}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
