"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError("Email ou senha incorretos")
        setIsLoading(false)
        return
      }

      // Login bem-sucedido
      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img
              src="/logo2.png"
              alt="Corpus Maria"
              className="w-20 h-20 rounded-full object-cover mx-auto shadow-lg"
            />
          </Link>
          <h1 className="text-3xl font-light text-foreground mb-2">Painel Admin</h1>
          <p className="text-sm font-light text-foreground/60">Entre com suas credenciais</p>
        </div>

        {/* Card de login */}
        <div className="bg-white/60 backdrop-blur-md border border-border/40 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-light text-foreground/70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@corpusmaria.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white/80 border border-border/40 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-light text-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-light text-foreground/70">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white/80 border border-border/40 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-light text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50/60 border border-red-200/40 rounded-lg"
              >
                <p className="text-sm font-light text-red-700 text-center">{error}</p>
              </motion.div>
            )}

            {/* Botão de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-light transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Entrando...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm font-light text-foreground/60 hover:text-foreground transition">
            Voltar para o site
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
