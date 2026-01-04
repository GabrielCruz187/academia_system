"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, DollarSign, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export default function MensalidadesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [monthlyPayments, setMonthlyPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPayment, setEditingPayment] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchData()
  }, [selectedMonth, selectedYear])

  const fetchData = async () => {
    setLoading(true)

    // Fetch enrollments
    const { data: enrollmentsData } = await supabase
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false })

    // Fetch monthly payments for selected month/year
    const { data: paymentsData } = await supabase
      .from("monthly_payments")
      .select("*")
      .eq("month", selectedMonth)
      .eq("year", selectedYear)
      .order("student_name")

    setEnrollments(enrollmentsData || [])
    setMonthlyPayments(paymentsData || [])
    setLoading(false)
  }

  const generateMissingPayments = async () => {
    const existingPaymentIds = new Set(monthlyPayments.map((p) => p.enrollment_id))
    const missingEnrollments = enrollments.filter((e) => !existingPaymentIds.has(e.id))

    console.log("[v0] Generating payments for enrollments:", missingEnrollments)

    for (const enrollment of missingEnrollments) {
      const studentName = enrollment.full_name || "Aluna sem nome"

      console.log("[v0] Creating payment for:", {
        enrollment_id: enrollment.id,
        student_name: studentName,
      })

      const response = await fetch("/api/monthly-payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollment_id: enrollment.id,
          student_name: studentName,
          month: selectedMonth,
          year: selectedYear,
          amount: 100.0,
        }),
      })

      const result = await response.json()
      console.log("[v0] API response:", result)
    }

    fetchData()
  }

  const handleEditPayment = (payment: any) => {
    setEditingPayment(payment)
    setIsDialogOpen(true)
  }

  const handleSavePayment = async () => {
    if (!editingPayment) return

    await fetch(`/api/monthly-payments/${editingPayment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: editingPayment.status,
        amount: editingPayment.amount,
        payment_date: editingPayment.payment_date,
        payment_method: editingPayment.payment_method,
        payment_notes: editingPayment.payment_notes,
      }),
    })

    setIsDialogOpen(false)
    setEditingPayment(null)
    fetchData()
  }

  const totalPendente = monthlyPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount || 0), 0)

  const totalPago = monthlyPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/images/acad.jpeg" alt="Corpus Maria Logo" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mensalidades</h1>
              <p className="text-sm text-gray-600">Gerenciamento de pagamentos mensais</p>
            </div>
          </div>
        </div>

        {/* Month/Year Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label>Mês</Label>
                <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(Number.parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((month, idx) => (
                      <SelectItem key={idx} value={(idx + 1).toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Label>Ano</Label>
                <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(Number.parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2024, 2025, 2026, 2027, 2028].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generateMissingPayments} className="mt-6">
                <Plus className="h-4 w-4 mr-2" />
                Gerar Mensalidades
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">R$ {totalPendente.toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">
                {monthlyPayments.filter((p) => p.status === "pending").length} mensalidades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ {totalPago.toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">
                {monthlyPayments.filter((p) => p.status === "paid").length} mensalidades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">R$ {(totalPendente + totalPago).toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">{monthlyPayments.length} mensalidades</p>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Mensalidades - {MONTHS[selectedMonth - 1]} {selectedYear}
            </CardTitle>
            <CardDescription>Gerencie os pagamentos mensais de cada aluna</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-gray-500">Carregando...</p>
            ) : monthlyPayments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Nenhuma mensalidade gerada para este mês</p>
                <Button onClick={generateMissingPayments}>
                  <Plus className="h-4 w-4 mr-2" />
                  Gerar Mensalidades
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluna</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Pagamento</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.student_name}</TableCell>
                        <TableCell>R$ {Number.parseFloat(payment.amount || 0).toFixed(2)}</TableCell>
                        <TableCell>
                          {payment.status === "paid" ? (
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                          ) : (
                            <Badge variant="outline" className="border-orange-300 text-orange-700">
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString("pt-BR") : "-"}
                        </TableCell>
                        <TableCell className="capitalize">{payment.payment_method || "-"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditPayment(payment)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Payment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Mensalidade</DialogTitle>
              <DialogDescription>
                Atualize as informações de pagamento de {editingPayment?.student_name}
              </DialogDescription>
            </DialogHeader>

            {editingPayment && (
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select
                    value={editingPayment.status}
                    onValueChange={(value) => setEditingPayment({ ...editingPayment, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="paid">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingPayment.amount || 100}
                    onChange={(e) => setEditingPayment({ ...editingPayment, amount: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Data do Pagamento</Label>
                  <Input
                    type="date"
                    value={editingPayment.payment_date || ""}
                    onChange={(e) => setEditingPayment({ ...editingPayment, payment_date: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Método de Pagamento</Label>
                  <Select
                    value={editingPayment.payment_method || ""}
                    onValueChange={(value) => setEditingPayment({ ...editingPayment, payment_method: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="card">Cartão</SelectItem>
                      <SelectItem value="cash">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Observações</Label>
                  <Textarea
                    value={editingPayment.payment_notes || ""}
                    onChange={(e) => setEditingPayment({ ...editingPayment, payment_notes: e.target.value })}
                    placeholder="Adicione observações..."
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSavePayment}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

