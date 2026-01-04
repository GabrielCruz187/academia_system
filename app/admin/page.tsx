"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Users, CheckCircle2, AlertCircle, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Enrollment {
  id: string
  full_name: string
  phone: string
  cpf: string
  date_of_birth: string
  age: number
  selected_class: string
  shift: string
  created_at: string
  payment_status: string
  payment_amount?: number
}

interface MonthlyPayment {
  id: string
  enrollment_id: string
  student_name: string
  month: number
  year: number
  amount: number
  status: string
  payment_date: string | null
  payment_method: string | null
}

interface EnrollmentWithPayments extends Enrollment {
  monthly_payments: MonthlyPayment[]
}

export default function AdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [enrollmentsWithPayments, setEnrollmentsWithPayments] = useState<EnrollmentWithPayments[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterMonth, setFilterMonth] = useState<string>("all")
  const supabase = createClient()

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [enrollmentsResult, paymentsResult] = await Promise.all([
        supabase.from("enrollments").select("*").order("created_at", { ascending: false }),
        supabase
          .from("monthly_payments")
          .select("*")
          .order("year", { ascending: false })
          .order("month", { ascending: false }),
      ])

      if (enrollmentsResult.error) throw enrollmentsResult.error
      if (paymentsResult.error) throw paymentsResult.error

      const enrollmentsData = enrollmentsResult.data || []
      const paymentsData = paymentsResult.data || []

      const combined = enrollmentsData.map((enrollment) => ({
        ...enrollment,
        monthly_payments: paymentsData.filter((p) => p.enrollment_id === enrollment.id),
      }))

      setEnrollments(enrollmentsData)
      setEnrollmentsWithPayments(combined)
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateMonthlyPayments = async () => {
    if (!confirm(`Gerar mensalidades de ${getMonthName(currentMonth)}/${currentYear} para todas as alunas?`)) {
      return
    }

    try {
      const paymentsToCreate = enrollments.map((enrollment) => ({
        enrollment_id: enrollment.id,
        student_name: enrollment.full_name,
        month: currentMonth,
        year: currentYear,
        amount: 100,
        status: "pending",
      }))

      const { error } = await supabase.from("monthly_payments").insert(paymentsToCreate)

      if (error) throw error

      alert(`Mensalidades de ${getMonthName(currentMonth)}/${currentYear} geradas com sucesso!`)
      fetchData()
    } catch (err: any) {
      if (err.message?.includes("duplicate")) {
        alert(`As mensalidades de ${getMonthName(currentMonth)}/${currentYear} já foram geradas.`)
      } else {
        alert("Erro ao gerar mensalidades: " + err.message)
      }
    }
  }

  const markAsPaid = async (paymentId: string, type: "enrollment" | "monthly") => {
    try {
      if (type === "enrollment") {
        await supabase
          .from("enrollments")
          .update({
            payment_status: "pago",
            payment_amount: 100,
            payment_date: new Date().toISOString().split("T")[0],
          })
          .eq("id", paymentId)
      } else {
        await supabase
          .from("monthly_payments")
          .update({
            status: "paid",
            payment_date: new Date().toISOString().split("T")[0],
            payment_method: "pix",
          })
          .eq("id", paymentId)
      }

      fetchData()
    } catch (err) {
      alert("Erro ao atualizar pagamento")
    }
  }

  const getMonthName = (month: number) => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return months[month - 1]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const totalEnrollments = enrollments.length
  const pendingEnrollmentPayments = enrollments.filter((e) => e.payment_status === "aguardando_pagamento").length
  const paidEnrollments = enrollments.filter((e) => e.payment_status === "pago").length

  const allMonthlyPayments = enrollmentsWithPayments.flatMap((e) => e.monthly_payments)
  const pendingMonthlyPayments = allMonthlyPayments.filter((p) => p.status === "pending").length
  const totalMonthlyRevenue = allMonthlyPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0)
  const totalEnrollmentRevenue = enrollments
    .filter((e) => e.payment_status === "pago" && e.payment_amount)
    .reduce((sum, e) => sum + (e.payment_amount || 0), 0)

  const filteredEnrollments = enrollments.filter((e) => {
    if (filterStatus === "all") return true
    return e.payment_status === filterStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/40 backdrop-blur-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo2.png" alt="Corpus Maria" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-light text-sm text-foreground">Corpus Maria</span>
            </div>
            <h1 className="text-lg font-light text-foreground">Painel Administrativo</h1>
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-light text-sm">Voltar</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-light text-foreground/70 mb-2">Total de Alunas</p>
                <p className="text-3xl font-light text-foreground">{totalEnrollments}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-light text-foreground/70 mb-2">Matrículas Pendentes</p>
                <p className="text-3xl font-light text-foreground">{pendingEnrollmentPayments}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100/60 text-yellow-700">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-light text-foreground/70 mb-2">Mensalidades Pendentes</p>
                <p className="text-3xl font-light text-foreground">{pendingMonthlyPayments}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100/60 text-orange-700">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-light text-foreground/70 mb-2">Receita Total</p>
                <p className="text-2xl font-light text-foreground">
                  R$ {(totalEnrollmentRevenue + totalMonthlyRevenue).toFixed(2)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100/60 text-green-700">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrollments">Matrículas (Taxa R$ 100)</TabsTrigger>
            <TabsTrigger value="monthly">Mensalidades (R$ 100/mês)</TabsTrigger>
          </TabsList>

          {/* ABA DE MATRÍCULAS */}
          <TabsContent value="enrollments" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur border border-border/40 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border/40 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-light text-foreground">Taxa de Matrícula</h3>
                  <p className="text-sm font-light text-foreground/60">Pagamento único de R$ 100,00 por aluna</p>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="aguardando_pagamento">Pendentes</SelectItem>
                    <SelectItem value="pago">Pagos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-foreground/60 font-light">Carregando...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-foreground/5">
                        <TableHead className="font-light">Nome</TableHead>
                        <TableHead className="font-light">Telefone</TableHead>
                        <TableHead className="font-light">Turma</TableHead>
                        <TableHead className="font-light">Data Matrícula</TableHead>
                        <TableHead className="font-light">Status</TableHead>
                        <TableHead className="font-light">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEnrollments.map((enrollment) => (
                        <TableRow key={enrollment.id} className="border-b border-border/40">
                          <TableCell className="font-light">{enrollment.full_name}</TableCell>
                          <TableCell className="font-light text-foreground/70">
                            {formatPhone(enrollment.phone)}
                          </TableCell>
                          <TableCell className="font-light text-foreground/70">{enrollment.selected_class}</TableCell>
                          <TableCell className="font-light text-foreground/70">
                            {formatDate(enrollment.created_at)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light ${
                                enrollment.payment_status === "aguardando_pagamento"
                                  ? "bg-yellow-100/60 text-yellow-700"
                                  : "bg-green-100/60 text-green-700"
                              }`}
                            >
                              {enrollment.payment_status === "aguardando_pagamento" ? (
                                <>
                                  <AlertCircle className="w-3 h-3" /> Pendente
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-3 h-3" /> Pago
                                </>
                              )}
                            </span>
                          </TableCell>
                          <TableCell>
                            {enrollment.payment_status === "aguardando_pagamento" && (
                              <Button
                                size="sm"
                                onClick={() => markAsPaid(enrollment.id, "enrollment")}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Marcar como Pago
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* ABA DE MENSALIDADES */}
          <TabsContent value="monthly" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur border border-border/40 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-light text-foreground mb-1">Gerar Mensalidades Automaticamente</h3>
                  <p className="text-sm text-foreground/60 font-light">
                    Crie cobranças de R$ 100,00 para todas as alunas do mês atual ({getMonthName(currentMonth)}/
                    {currentYear})
                  </p>
                </div>
                <Button onClick={generateMonthlyPayments} className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Gerar Mensalidades
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12 bg-white/60 rounded-xl">
                  <p className="text-foreground/60 font-light">Carregando...</p>
                </div>
              ) : (
                enrollmentsWithPayments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="bg-white/60 backdrop-blur border border-border/40 rounded-xl overflow-hidden"
                  >
                    <div className="p-4 bg-foreground/5 border-b border-border/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-light text-lg text-foreground">{enrollment.full_name}</h4>
                          <p className="text-sm text-foreground/60 font-light">
                            {formatPhone(enrollment.phone)} • {enrollment.selected_class}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-light text-foreground/70">
                            {enrollment.monthly_payments.filter((p) => p.status === "paid").length} de{" "}
                            {enrollment.monthly_payments.length} pagas
                          </p>
                          <p className="text-xs font-light text-foreground/50">
                            {enrollment.monthly_payments.filter((p) => p.status === "pending").length} pendentes
                          </p>
                        </div>
                      </div>
                    </div>

                    {enrollment.monthly_payments.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-foreground/60 font-light text-sm">Nenhuma mensalidade gerada ainda</p>
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {enrollment.monthly_payments.map((payment) => (
                            <div
                              key={payment.id}
                              className={`p-3 rounded-lg border ${
                                payment.status === "paid"
                                  ? "bg-green-50/60 border-green-200/40"
                                  : "bg-yellow-50/60 border-yellow-200/40"
                              }`}
                            >
                              <div className="text-center mb-2">
                                <p className="text-xs font-light text-foreground/70">
                                  {getMonthName(payment.month)}/{payment.year}
                                </p>
                                <p className="text-sm font-light text-foreground">R$ {payment.amount.toFixed(2)}</p>
                              </div>
                              {payment.status === "pending" ? (
                                <Button
                                  size="sm"
                                  onClick={() => markAsPaid(payment.id, "monthly")}
                                  className="w-full text-xs bg-green-600 hover:bg-green-700"
                                >
                                  Pagar
                                </Button>
                              ) : (
                                <div className="flex items-center justify-center gap-1 text-green-700">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span className="text-xs font-light">Pago</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}







