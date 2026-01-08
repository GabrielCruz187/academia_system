"use client"
import { LogOut, Edit, Eye, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const supabase = createClient()

export default function AdminDashboard({ user }: { user: any }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("enrollments")
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [monthlyPayments, setMonthlyPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEnrollment, setEditingEnrollment] = useState<any>(null)
  const [viewingEnrollment, setViewingEnrollment] = useState<any>(null)
  const [isEnrollmentDialogOpen, setIsEnrollmentDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [filter, setFilter] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

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

    // Fetch monthly payments
    const { data: paymentsData } = await supabase
      .from("monthly_payments")
      .select("*")
      .order("year", { ascending: false })
      .order("month", { ascending: false })
      .order("student_name")

    setEnrollments(enrollmentsData || [])
    setMonthlyPayments(paymentsData || [])
    setLoading(false)
  }

  const generateMensalidades = async () => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    for (const enrollment of enrollments) {
      const existingPayment = monthlyPayments.find(
        (p) => p.enrollment_id === enrollment.id && p.month === currentMonth && p.year === currentYear,
      )

      if (!existingPayment) {
        await fetch("/api/monthly-payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollment_id: enrollment.id,
            student_name: enrollment.full_name,
            month: currentMonth,
            year: currentYear,
            amount: 100.0,
          }),
        })
      }
    }

    fetchData()
  }

  const handleMarkAsPaid = async (paymentId: string) => {
    await fetch(`/api/monthly-payments/${paymentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "paid",
        payment_date: new Date().toISOString().split("T")[0],
      }),
    })
    fetchData()
  }

  const handleEditEnrollment = (enrollment: any) => {
    setEditingEnrollment(enrollment)
    setIsEnrollmentDialogOpen(true)
  }

  const handleSaveEnrollment = async () => {
    if (!editingEnrollment) return

    await fetch(`/api/enrollments/${editingEnrollment.id}/payment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment_status: editingEnrollment.payment_status,
      }),
    })

    setIsEnrollmentDialogOpen(false)
    setEditingEnrollment(null)
    fetchData()
  }

  const handleViewEnrollment = (enrollment: any) => {
    setViewingEnrollment(enrollment)
    setIsViewDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const formatCPFDisplay = (cpf: string) => {
    if (!cpf) return "N/A"
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return "N/A"
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const filteredEnrollments = enrollments.filter((e) => {
    if (filter === "all") return true
    if (filter === "paid") return e.payment_status === "pago"
    if (filter === "pending") return e.payment_status === "aguardando_pagamento"
    return true
  })

  const enrollmentsPaid = enrollments.filter((e) => e.payment_status === "pago").length
  const enrollmentsPending = enrollments.filter((e) => e.payment_status === "aguardando_pagamento").length
  const totalEnrollmentRevenue = enrollmentsPaid * 100

  const getMonthlyPaymentsForEnrollment = (enrollmentId: string) => {
    return monthlyPayments.filter((p) => p.enrollment_id === enrollmentId)
  }

  const enrollmentsWithPayments = enrollments.map((enrollment) => ({
    ...enrollment,
    payments: getMonthlyPaymentsForEnrollment(enrollment.id),
  }))

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

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/40 backdrop-blur-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/logo2.png"
                alt="Corpus Maria"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
              />
              <span className="font-light text-xs sm:text-sm text-foreground hidden sm:inline">Corpus Maria</span>
            </div>
            <h1 className="text-sm sm:text-lg font-light text-foreground">Painel Admin</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 text-foreground hover:text-primary transition"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-light text-xs sm:text-sm">Sair</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xs sm:text-sm font-light text-muted-foreground mb-1">Total Matrículas</div>
              <div className="text-xl sm:text-2xl font-light text-foreground">{enrollments.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xs sm:text-sm font-light text-muted-foreground mb-1">Matrículas Pagas</div>
              <div className="text-xl sm:text-2xl font-light text-green-600">{enrollmentsPaid}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xs sm:text-sm font-light text-muted-foreground mb-1">Pendentes</div>
              <div className="text-xl sm:text-2xl font-light text-orange-600">{enrollmentsPending}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xs sm:text-sm font-light text-muted-foreground mb-1">Receita Total</div>
              <div className="text-lg sm:text-xl font-light text-primary">
                R$ {formatCurrency(totalEnrollmentRevenue)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-white/60">
              <TabsTrigger value="enrollments" className="text-xs sm:text-sm">
                Matrículas
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs sm:text-sm">
                Mensalidades
              </TabsTrigger>
            </TabsList>

            {activeTab === "enrollments" && (
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white/60 text-xs sm:text-sm">
                  <SelectValue placeholder="Filtrar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="paid">Pagas</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-4">
            <Card className="bg-white/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg font-light">Matrículas (Taxa: R$ 100)</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Gerencie as taxas de matrícula das alunas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">Carregando...</div>
                ) : (
                  <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left py-3 px-2 text-xs sm:text-sm font-light">Nome</th>
                          <th className="text-left py-3 px-2 text-xs sm:text-sm font-light hidden md:table-cell">
                            CPF
                          </th>
                          <th className="text-left py-3 px-2 text-xs sm:text-sm font-light hidden lg:table-cell">
                            Turma
                          </th>
                          <th className="text-left py-3 px-2 text-xs sm:text-sm font-light hidden sm:table-cell">
                            Idade
                          </th>
                          <th className="text-left py-3 px-2 text-xs sm:text-sm font-light">Status</th>
                          <th className="text-right py-3 px-2 text-xs sm:text-sm font-light">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnrollments.map((enrollment) => (
                          <tr key={enrollment.id} className="border-b border-border/20 hover:bg-white/40 transition">
                            <td className="py-3 px-2 text-xs sm:text-sm font-medium">{enrollment.full_name}</td>
                            <td className="py-3 px-2 text-xs sm:text-sm hidden md:table-cell">
                              {formatCPFDisplay(enrollment.cpf)}
                            </td>
                            <td className="py-3 px-2 text-xs sm:text-sm hidden lg:table-cell">
                              {enrollment.selected_class || "N/A"}
                            </td>
                            <td className="py-3 px-2 text-xs sm:text-sm hidden sm:table-cell">
                              {enrollment.age || "N/A"} anos
                            </td>
                            <td className="py-3 px-2">
                              {enrollment.payment_status === "pago" ? (
                                <Badge className="bg-green-100 text-green-800 text-xs">Pago</Badge>
                              ) : (
                                <Badge variant="outline" className="border-orange-300 text-orange-700 text-xs">
                                  Pendente
                                </Badge>
                              )}
                            </td>
                            <td className="py-3 px-2 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewEnrollment(enrollment)}
                                  className="h-7 w-7 p-0 sm:h-8 sm:w-8"
                                  title="Ver detalhes"
                                >
                                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditEnrollment(enrollment)}
                                  className="h-7 w-7 p-0 sm:h-8 sm:w-8"
                                  title="Editar status"
                                >
                                  <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monthly Payments Tab */}
          <TabsContent value="monthly" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={generateMensalidades} className="w-full sm:w-auto text-xs sm:text-sm">
                Gerar Mensalidades ({MONTHS[new Date().getMonth()]})
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {enrollmentsWithPayments.map((enrollment) => (
                <Card key={enrollment.id} className="bg-white/60 backdrop-blur">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-xs sm:text-sm font-light line-clamp-2">{enrollment.full_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 sm:space-y-2">
                    {enrollment.payments.length === 0 ? (
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Sem mensalidades</p>
                    ) : (
                      enrollment.payments.map((payment: any) => (
                        <div key={payment.id} className="flex items-center justify-between text-[10px] sm:text-xs">
                          <span className="text-muted-foreground">
                            {MONTHS[payment.month - 1].substring(0, 3)}/{payment.year}
                          </span>
                          {payment.status === "paid" ? (
                            <Badge className="bg-green-100 text-green-800 text-[9px] sm:text-[10px] px-1 py-0">
                              Pago
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsPaid(payment.id)}
                              className="h-4 sm:h-5 px-1 sm:px-2 text-[9px] sm:text-[10px] border-orange-300 text-orange-700 hover:bg-orange-50"
                            >
                              Pagar
                            </Button>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Enrollment Dialog */}
        <Dialog open={isEnrollmentDialogOpen} onOpenChange={setIsEnrollmentDialogOpen}>
          <DialogContent className="max-w-sm sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Editar Matrícula</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Atualize o status de pagamento da taxa de matrícula
              </DialogDescription>
            </DialogHeader>
            {editingEnrollment && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm">Nome</label>
                  <input value={editingEnrollment.full_name} disabled className="text-xs sm:text-sm" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm">Status de Pagamento</label>
                  <select
                    value={editingEnrollment.payment_status}
                    onChange={(e) => setEditingEnrollment({ ...editingEnrollment, payment_status: e.target.value })}
                    className="text-xs sm:text-sm"
                  >
                    <option value="aguardando_pagamento">Aguardando Pagamento</option>
                    <option value="pago">Pago</option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEnrollmentDialogOpen(false)}
                className="text-xs sm:text-sm bg-white/60 border border-border/40 text-foreground hover:bg-background transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEnrollment}
                className="text-xs sm:text-sm bg-primary text-white hover:bg-primary/80 transition"
              >
                Salvar
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Enrollment Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-light flex items-center justify-between">
                Informações Completas da Aluna
                <Button variant="ghost" size="sm" onClick={() => setIsViewDialogOpen(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            {viewingEnrollment && (
              <div className="space-y-6">
                {/* Informações Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-primary border-b border-primary/20 pb-2">
                    Informações Pessoais
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Nome Completo</label>
                      <p className="text-sm font-medium">{viewingEnrollment.full_name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Data de Nascimento</label>
                      <p className="text-sm font-medium">{formatDate(viewingEnrollment.date_of_birth)}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Idade</label>
                      <p className="text-sm font-medium">{viewingEnrollment.age || "N/A"} anos</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">CPF do Responsável</label>
                      <p className="text-sm font-medium">{formatCPFDisplay(viewingEnrollment.cpf)}</p>
                    </div>
                  </div>
                </div>

                {/* Informações de Contato */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-primary border-b border-primary/20 pb-2">Contato</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Telefone</label>
                      <p className="text-sm font-medium">{formatPhoneDisplay(viewingEnrollment.phone)}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Endereço</label>
                      <p className="text-sm font-medium">{viewingEnrollment.address || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Informações da Turma */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-primary border-b border-primary/20 pb-2">
                    Informações da Turma
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Turma Selecionada</label>
                      <p className="text-sm font-medium">{viewingEnrollment.selected_class || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Turno</label>
                      <p className="text-sm font-medium">{viewingEnrollment.shift || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Informações de Pagamento */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-primary border-b border-primary/20 pb-2">
                    Pagamento da Matrícula
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Status de Pagamento</label>
                      <div className="mt-1">
                        {viewingEnrollment.payment_status === "pago" ? (
                          <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-300 text-orange-700">
                            Aguardando Pagamento
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Valor da Matrícula</label>
                      <p className="text-sm font-medium">
                        R$ {viewingEnrollment.payment_amount ? viewingEnrollment.payment_amount.toFixed(2) : "100,00"}
                      </p>
                    </div>
                    {viewingEnrollment.payment_date && (
                      <div>
                        <label className="text-xs text-muted-foreground">Data do Pagamento</label>
                        <p className="text-sm font-medium">{formatDate(viewingEnrollment.payment_date)}</p>
                      </div>
                    )}
                    {viewingEnrollment.payment_method && (
                      <div>
                        <label className="text-xs text-muted-foreground">Método de Pagamento</label>
                        <p className="text-sm font-medium">{viewingEnrollment.payment_method}</p>
                      </div>
                    )}
                  </div>
                  {viewingEnrollment.payment_notes && (
                    <div>
                      <label className="text-xs text-muted-foreground">Observações</label>
                      <p className="text-sm font-medium">{viewingEnrollment.payment_notes}</p>
                    </div>
                  )}
                </div>

                {/* Informações do Sistema */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-primary border-b border-primary/20 pb-2">
                    Informações do Sistema
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Data de Criação</label>
                      <p className="text-sm font-medium">{formatDate(viewingEnrollment.created_at)}</p>
                    </div>
                    {viewingEnrollment.enrollment_date && (
                      <div>
                        <label className="text-xs text-muted-foreground">Data de Matrícula</label>
                        <p className="text-sm font-medium">{formatDate(viewingEnrollment.enrollment_date)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
