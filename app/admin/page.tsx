"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"

interface Enrollment {
  id: string
  full_name: string
  phone: string
  cpf: string
  enrollment_date: string
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
          .select("id, full_name, phone, cpf, enrollment_date, payment_status")
          .order("enrollment_date", { ascending: false })

        if (fetchError) throw fetchError
        setEnrollments(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao carregar matrículas")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

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

  const getStatusColor = (status: string) => {
    if (status === "aguardando_pagamento") return "bg-yellow-100 text-yellow-800"
    if (status === "pago") return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    if (status === "aguardando_pagamento") return "Aguardando Pagamento"
    if (status === "pago") return "Pago"
    return status
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Painel de Administração</h1>
            <p className="text-muted-foreground mt-1">Gerenciamento de Matrículas</p>
          </div>
          <Button
            variant="outline"
            className="border-border rounded-lg bg-transparent"
            onClick={() => (window.location.href = "/")}
          >
            Voltar para Início
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total de Matrículas</p>
                <p className="text-3xl font-bold text-foreground">{enrollments.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Aguardando Pagamento</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {enrollments.filter((e) => e.payment_status === "aguardando_pagamento").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Pago</p>
                <p className="text-3xl font-bold text-green-600">
                  {enrollments.filter((e) => e.payment_status === "pago").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollments Table */}
        <Card className="border-border">
          <CardHeader className="bg-white border-b border-border">
            <CardTitle>Todas as Matrículas</CardTitle>
            <CardDescription>Lista completa de alunos matriculados</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando matrículas...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma matrícula ainda</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted border-border">
                      <TableHead className="text-foreground font-semibold">Nome</TableHead>
                      <TableHead className="text-foreground font-semibold">Telefone</TableHead>
                      <TableHead className="text-foreground font-semibold">CPF</TableHead>
                      <TableHead className="text-foreground font-semibold">Data da Matrícula</TableHead>
                      <TableHead className="text-foreground font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id} className="border-border hover:bg-muted/50">
                        <TableCell className="text-foreground font-medium">{enrollment.full_name}</TableCell>
                        <TableCell className="text-muted-foreground">{formatPhone(enrollment.phone)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatCPF(enrollment.cpf)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(enrollment.enrollment_date)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(enrollment.payment_status)}`}
                          >
                            {getStatusLabel(enrollment.payment_status)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
