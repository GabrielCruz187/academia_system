"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function MatriculaPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone: "",
    cpf: "",
    date_of_birth: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatCPF = (cpf: string) => {
    return cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (phone: string) => {
    return phone.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validar formato do CPF
      const cpfNumbers = formData.cpf.replace(/\D/g, "")
      if (cpfNumbers.length !== 11) {
        throw new Error("CPF deve ter 11 dígitos")
      }

      // Inserir matrícula no banco de dados
      const { error: dbError } = await supabase.from("enrollments").insert([
        {
          full_name: formData.full_name,
          address: formData.address,
          phone: formData.phone.replace(/\D/g, ""),
          cpf: cpfNumbers,
          date_of_birth: formData.date_of_birth,
          payment_status: "aguardando_pagamento",
        },
      ])

      if (dbError) throw dbError

      // Redirecionar para página de confirmação
      router.push("/confirmacao")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Um erro ocorreu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Formulário de Matrícula</h1>
          <p className="text-muted-foreground">Complete seu registro para a academia de balé</p>
        </div>

        {/* Form Card */}
        <Card className="border-border">
          <CardHeader className="bg-white border-b border-border">
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Por favor, forneça seus dados para se matricular</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome Completo</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Digite seu nome completo"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="rounded-lg"
                />
              </div>

              {/* Endereço */}
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Digite seu endereço completo"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-lg"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(11) 98765-4321"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value)
                    setFormData((prev) => ({ ...prev, phone: formatted }))
                  }}
                  className="rounded-lg"
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  placeholder="123.456.789-00"
                  required
                  value={formData.cpf}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value)
                    setFormData((prev) => ({ ...prev, cpf: formatted }))
                  }}
                  maxLength="14"
                  className="rounded-lg"
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  required
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="rounded-lg"
                />
              </div>

              {/* Mensagem de Erro */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
              )}

              {/* Botão de Envio */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold py-3"
              >
                {isLoading ? "Processando..." : "Continuar para Pagamento"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
