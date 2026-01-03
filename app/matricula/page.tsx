"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { calculateAge, getAvailableClasses, type ClassSchedule } from "@/lib/classes-data"

export default function MatriculaPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null)
  const [availableClasses, setAvailableClasses] = useState<ClassSchedule[]>([])
  const [selectedClass, setSelectedClass] = useState<string>("")

  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone: "",
    cpf: "",
    date_of_birth: "",
    shift: "",
  })

  useEffect(() => {
    if (formData.date_of_birth) {
      const age = calculateAge(formData.date_of_birth)
      setCalculatedAge(age)
      const classes = getAvailableClasses(age)
      setAvailableClasses(classes)

      // Auto-select first available class if only one option
      if (classes.length === 1) {
        setSelectedClass(classes[0].displayName)
      } else if (classes.length === 0) {
        setSelectedClass("")
      }
    } else {
      setCalculatedAge(null)
      setAvailableClasses([])
      setSelectedClass("")
    }
  }, [formData.date_of_birth])

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
      console.log("[v0] Submitting enrollment data:", formData)

      if (!selectedClass) {
        throw new Error("Por favor, selecione uma turma")
      }

      // Validar formato do CPF
      const cpfNumbers = formData.cpf.replace(/\D/g, "")
      if (cpfNumbers.length !== 11) {
        throw new Error("CPF deve ter 11 dígitos")
      }

      const { data: existingCPF } = await supabase.from("enrollments").select("id").eq("cpf", cpfNumbers).single()

      if (existingCPF) {
        throw new Error("Este CPF já está cadastrado em nosso sistema")
      }

      const { error: dbError } = await supabase.from("enrollments").insert([
        {
          full_name: formData.full_name,
          address: formData.address,
          phone: formData.phone.replace(/\D/g, ""),
          cpf: cpfNumbers,
          date_of_birth: formData.date_of_birth,
          age: calculatedAge,
          selected_class: selectedClass,
          shift: formData.shift,
          payment_status: "aguardando_pagamento",
        },
      ])

      console.log("[v0] Insert response:", dbError ? `Error: ${dbError.message}` : "Sucesso!")

      if (dbError) throw dbError

      const params = new URLSearchParams({
        name: formData.full_name,
        age: calculatedAge?.toString() || "",
        class: selectedClass,
        shift: formData.shift,
        phone: formData.phone,
        cpf: formData.cpf,
      })

      router.push(`/confirmation?${params.toString()}`)
    } catch (err) {
      console.log("[v0] Error in handleSubmit:", err instanceof Error ? err.message : String(err))
      setError(err instanceof Error ? err.message : "Um erro ocorreu")
    } finally {
      setIsLoading(false)
    }
  }

  const formFields = [
    { name: "full_name", label: "Nome Completo da Aluna", placeholder: "Digite o nome completo", type: "text" },
    { name: "address", label: "Endereço", placeholder: "Digite o endereço completo", type: "text" },
    { name: "phone", label: "Telefone do Responsável", placeholder: "(11) 98765-4321", type: "tel" },
    { name: "cpf", label: "CPF do Responsável", placeholder: "123.456.789-00", type: "text" },
    { name: "date_of_birth", label: "Data de Nascimento da Aluna", placeholder: "", type: "date" },
  ]

  const completedSteps = Object.values(formData).filter((val) => val !== "").length + (selectedClass ? 1 : 0)
  const totalSteps = formFields.length + 1 // +1 for class selection

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/40 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo2.png" alt="Corpus Maria Logo" className="w-8 h-8 rounded-full object-cover" />
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition">
              <span className="font-light text-sm">Corpus Maria</span>
            </Link>
          </div>
          <h1 className="text-lg font-light text-foreground">Formulário de Matrícula</h1>
          <div className="w-16" />
        </nav>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-light text-foreground">Dados da Matrícula</h2>
            <p className="text-sm text-foreground/60 font-light">
              {completedSteps} de {totalSteps}
            </p>
          </div>
          <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(completedSteps / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formFields.map((field, idx) => (
            <motion.div
              key={field.name}
              className="space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Label htmlFor={field.name} className="font-light text-foreground/80">
                {field.label}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
                value={formData[field.name as keyof typeof formData]}
                onChange={(e) => {
                  if (field.name === "phone") {
                    const formatted = formatPhone(e.target.value)
                    setFormData((prev) => ({ ...prev, [field.name]: formatted }))
                  } else if (field.name === "cpf") {
                    const formatted = formatCPF(e.target.value)
                    setFormData((prev) => ({ ...prev, [field.name]: formatted }))
                  } else {
                    handleChange(e)
                  }
                }}
                maxLength={field.name === "cpf" ? 14 : undefined}
                className="rounded-lg font-light border-border/40 bg-white/60 backdrop-blur-sm"
              />
            </motion.div>
          ))}

          <AnimatePresence mode="wait">
            {calculatedAge !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 pt-4"
              >
                {/* Age Display */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-light text-primary">
                    ✨ Idade identificada: <span className="font-medium">{calculatedAge} anos</span>
                  </p>
                </div>

                {/* Available Classes */}
                {availableClasses.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="class-selection" className="font-light text-foreground/80">
                      Turmas Disponíveis para esta Idade
                    </Label>
                    <Select value={selectedClass} onValueChange={(value) => setSelectedClass(value)} required>
                      <SelectTrigger
                        id="class-selection"
                        className="rounded-lg font-light border-border/40 bg-white/60 backdrop-blur-sm"
                      >
                        <SelectValue placeholder="Selecione a turma desejada" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableClasses.map((classItem, idx) => (
                          <SelectItem key={idx} value={classItem.displayName}>
                            {classItem.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground font-light">
                      {availableClasses.length === 1
                        ? "Apenas uma turma disponível para esta faixa etária"
                        : `${availableClasses.length} turmas disponíveis para esta faixa etária`}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-amber-50/80 border border-amber-200/40 rounded-lg p-4"
                  >
                    <p className="text-sm font-light text-amber-800">
                      No momento não há turmas disponíveis para essa faixa etária. Entre em contato com a academia para
                      mais informações.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50/80 border border-red-200/40 text-red-700 px-4 py-3 rounded-lg font-light text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pt-6">
            <Button
              type="submit"
              disabled={isLoading || !selectedClass}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-light py-6 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processando..." : "Continuar para Pagamento"}
            </Button>
          </motion.div>
        </motion.form>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white/40 backdrop-blur border border-primary/10 rounded-xl p-6 text-center"
        >
          <p className="text-sm font-light text-foreground/70">
            Seus dados estão seguros e criptografados. A taxa de matrícula é de{" "}
            <span className="text-primary font-light">R$ 80,00</span>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}




