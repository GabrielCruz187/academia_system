"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, DollarSign, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from "recharts"

interface Enrollment {
  id: string
  created_at: string
  payment_status: string
}

const ENROLLMENT_FEE = 80 // Valor fixo da matrícula em R$

export default function FinanceiroPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select("id, created_at, payment_status")
          .order("created_at", { ascending: true })

        if (error) throw error
        setEnrollments(data || [])
      } catch (err) {
        console.error("[v0] Error fetching enrollments:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnrollments()
  }, [supabase])

  // Cálculos financeiros
  const totalStudents = enrollments.length
  const activeStudents = enrollments.filter((e) => e.payment_status === "pago").length
  const totalRevenue = activeStudents * ENROLLMENT_FEE
  const pendingRevenue = enrollments.filter((e) => e.payment_status === "aguardando_pagamento").length * ENROLLMENT_FEE

  // Dados para gráfico de barras - matrículas por mês
  const enrollmentsByMonth = enrollments.reduce(
    (acc, enrollment) => {
      const date = new Date(enrollment.created_at)
      const monthKey = date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })
      acc[monthKey] = (acc[monthKey] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const monthlyData = Object.entries(enrollmentsByMonth).map(([month, count]) => ({
    month,
    matriculas: count,
    receita: count * ENROLLMENT_FEE,
  }))

  // Dados para gráfico de pizza - status de pagamento
  const paymentStatusData = [
    {
      name: "Pagas",
      value: enrollments.filter((e) => e.payment_status === "pago").length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Pendentes",
      value: enrollments.filter((e) => e.payment_status === "aguardando_pagamento").length,
      color: "hsl(var(--chart-2))",
    },
  ]

  // Dados para linha de crescimento acumulado
  const cumulativeData = monthlyData.reduce(
    (acc, curr, idx) => {
      const previous = idx > 0 ? acc[idx - 1].total : 0
      acc.push({
        month: curr.month,
        total: previous + curr.matriculas,
        receita: (previous + curr.matriculas) * ENROLLMENT_FEE,
      })
      return acc
    },
    [] as { month: string; total: number; receita: number }[],
  )

  // Matrículas do mês atual
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyEnrollments = enrollments.filter((e) => {
    const enrollDate = new Date(e.created_at)
    return enrollDate.getMonth() === currentMonth && enrollDate.getFullYear() === currentYear
  }).length

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/40 backdrop-blur-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/images/bal-c3-a9.jpg" alt="Corpus Maria Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-light text-sm text-foreground">Corpus Maria</span>
            </div>
            <h1 className="text-base sm:text-lg font-light text-foreground">Módulo Financeiro</h1>
            <Link href="/admin" className="flex items-center gap-2 text-foreground hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-light text-xs sm:text-sm">Admin</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-2">Visão Geral Financeira</h2>
          <p className="text-sm sm:text-base text-foreground/60 font-light">
            Acompanhe receitas e indicadores da academia
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-foreground/60 font-light">Carregando dados financeiros...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              {[
                {
                  icon: Users,
                  label: "Total de Alunos",
                  value: totalStudents,
                  subtext: `${activeStudents} ativos`,
                  color: "primary",
                },
                {
                  icon: DollarSign,
                  label: "Receita Acumulada",
                  value: `R$ ${totalRevenue.toFixed(2)}`,
                  subtext: "Matrículas pagas",
                  color: "green",
                },
                {
                  icon: TrendingUp,
                  label: "Receita Pendente",
                  value: `R$ ${pendingRevenue.toFixed(2)}`,
                  subtext: "Aguardando pagamento",
                  color: "yellow",
                },
                {
                  icon: Calendar,
                  label: "Matrículas do Mês",
                  value: monthlyEnrollments,
                  subtext: new Date().toLocaleDateString("pt-BR", { month: "long" }),
                  color: "blue",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(229, 197, 200, 0.3)" }}
                    className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-4 sm:p-6 hover:border-primary/20 transition"
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div
                        className={`p-2 sm:p-3 rounded-lg ${
                          stat.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : stat.color === "green"
                              ? "bg-green-100/60 text-green-700"
                              : stat.color === "yellow"
                                ? "bg-yellow-100/60 text-yellow-700"
                                : "bg-blue-100/60 text-blue-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-light text-foreground/70 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-light text-foreground mb-1">{stat.value}</p>
                    <p className="text-xs font-light text-foreground/50">{stat.subtext}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Matrículas por Mês - Bar Chart */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <Card className="bg-white/60 backdrop-blur border-border/40">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="font-light text-foreground text-base sm:text-lg">
                      Matrículas por Mês
                    </CardTitle>
                    <CardDescription className="font-light text-xs sm:text-sm">
                      Número de novas matrículas registradas mensalmente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ChartContainer
                      config={{
                        matriculas: {
                          label: "Matrículas",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[250px] sm:h-[300px]"
                    >
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="matriculas" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Status de Pagamento - Pie Chart */}
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <Card className="bg-white/60 backdrop-blur border-border/40">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="font-light text-foreground text-base sm:text-lg">
                      Status das Matrículas
                    </CardTitle>
                    <CardDescription className="font-light text-xs sm:text-sm">
                      Distribuição entre pagas e pendentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ChartContainer
                      config={{
                        pagas: {
                          label: "Pagas",
                          color: "hsl(142, 76%, 36%)",
                        },
                        pendentes: {
                          label: "Pendentes",
                          color: "hsl(48, 96%, 53%)",
                        },
                      }}
                      className="h-[250px] sm:h-[300px]"
                    >
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={paymentStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {paymentStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Crescimento Acumulado - Line Chart */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <Card className="bg-white/60 backdrop-blur border-border/40">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="font-light text-foreground text-base sm:text-lg">
                    Crescimento Acumulado
                  </CardTitle>
                  <CardDescription className="font-light text-xs sm:text-sm">
                    Total de alunos e receita ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <ChartContainer
                    config={{
                      total: {
                        label: "Total de Alunos",
                        color: "hsl(var(--primary))",
                      },
                      receita: {
                        label: "Receita (R$)",
                        color: "hsl(142, 76%, 36%)",
                      },
                    }}
                    className="h-[300px] sm:h-[350px]"
                  >
                    <LineChart data={cumulativeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis yAxisId="left" className="text-xs" />
                      <YAxis yAxisId="right" orientation="right" className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="total"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="receita"
                        stroke="hsl(142, 76%, 36%)"
                        strokeWidth={2}
                        dot={{ fill: "hsl(142, 76%, 36%)" }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8 bg-primary/10 backdrop-blur border border-primary/20 rounded-xl p-4 sm:p-6 text-center"
            >
              <p className="text-xs sm:text-sm font-light text-foreground/70">
                Valor de matrícula fixo:{" "}
                <span className="text-primary font-normal">R$ {ENROLLMENT_FEE.toFixed(2)}</span>
              </p>
              <p className="text-xs font-light text-foreground/50 mt-2">
                Estes dados são calculados automaticamente com base nas matrículas registradas no sistema.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

