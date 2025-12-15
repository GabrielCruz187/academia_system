"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Users, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Enrollment {
  id: string
  full_name: string
  phone: string
  cpf: string
  created_at: string
  payment_status: string
}

export default function AdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("enrollments")
          .select("id, full_name, phone, cpf, created_at, payment_status")
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError
        setEnrollments(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao carregar matrículas")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnrollments()
  }, [supabase])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const totalEnrollments = enrollments.length
  const pendingPayments = enrollments.filter((e) => e.payment_status === "aguardando_pagamento").length
  const paidEnrollments = enrollments.filter((e) => e.payment_status === "pago").length

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/40 backdrop-blur-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/balé.jpg" alt="Corpus Maria Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-light text-sm text-foreground">Corpus Maria</span>
          </div>
          <h1 className="text-lg font-light text-foreground">Painel de Administração</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/financeiro" className="text-foreground hover:text-primary transition">
              <span className="font-light text-sm">Financeiro</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-light text-sm">Voltar</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-4xl font-light text-foreground mb-2">Gerenciamento de Matrículas</h2>
          <p className="text-foreground/60 font-light">Acompanhe todos os registros de alunos</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: Users, label: "Total de Matrículas", value: totalEnrollments, color: "primary" },
            { icon: AlertCircle, label: "Aguardando Pagamento", value: pendingPayments, color: "yellow" },
            { icon: CheckCircle2, label: "Matrículas Pagas", value: paidEnrollments, color: "green" },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6 hover:border-primary/20 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-light text-foreground/70 mb-2">{stat.label}</p>
                    <p className="text-4xl font-light text-foreground">{stat.value}</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      stat.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : stat.color === "yellow"
                          ? "bg-yellow-100/60 text-yellow-700"
                          : "bg-green-100/60 text-green-700"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur border border-border/40 rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border/40">
            <h3 className="text-xl font-light text-foreground">Todas as Matrículas</h3>
            <p className="text-sm font-light text-foreground/60">Lista completa de alunos matriculados</p>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-foreground/60 font-light">Carregando matrículas...</p>
              </div>
            ) : error ? (
              <div className="p-6 bg-red-50/80 border border-red-200/40 text-red-700 rounded-lg font-light text-sm m-6">
                {error}
              </div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 font-light">Nenhuma matrícula ainda</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-foreground/5 border-border/40 hover:bg-foreground/5">
                    <TableHead className="text-foreground font-light">Nome</TableHead>
                    <TableHead className="text-foreground font-light">Telefone</TableHead>
                    <TableHead className="text-foreground font-light">CPF</TableHead>
                    <TableHead className="text-foreground font-light">Data da Matrícula</TableHead>
                    <TableHead className="text-foreground font-light">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment, idx) => (
                    <motion.tr
                      key={enrollment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-border/40 hover:bg-foreground/5 transition"
                    >
                      <TableCell className="text-foreground font-light">{enrollment.full_name}</TableCell>
                      <TableCell className="text-foreground/70 font-light">{formatPhone(enrollment.phone)}</TableCell>
                      <TableCell className="text-foreground/70 font-light">{formatCPF(enrollment.cpf)}</TableCell>
                      <TableCell className="text-foreground/70 font-light">
                        {formatDate(enrollment.created_at)}
                      </TableCell>
                      <TableCell>
                        <motion.span
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light ${
                            enrollment.payment_status === "aguardando_pagamento"
                              ? "bg-yellow-100/60 text-yellow-700"
                              : "bg-green-100/60 text-green-700"
                          }`}
                        >
                          {enrollment.payment_status === "aguardando_pagamento" ? (
                            <>
                              <AlertCircle className="w-3 h-3" /> Aguardando
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> Pago
                            </>
                          )}
                        </motion.span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


