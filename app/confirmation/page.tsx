"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ArrowRight, Smartphone, Bell } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const ENROLLMENT_FEE = 80.0

function ConfirmacaoContent() {
  const searchParams = useSearchParams()

  // Recuperar dados da matrícula da URL
  const studentName = searchParams.get("name") || ""
  const studentAge = searchParams.get("age") || ""
  const selectedClass = searchParams.get("class") || ""
  const shift = searchParams.get("shift") || ""
  const phone = searchParams.get("phone") || ""
  const cpf = searchParams.get("cpf") || ""

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de enviar o comprovante de inscrição na Academia de Balé. Realizei a inscrição e estou realizando o pagamento da taxa de inscrição de R$ 80,00.",
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  const handleNotifyAcademy = () => {
    const academyPhone = "5499010633" // (54) 99901-0633

    const message = encodeURIComponent(
      `🩰 *NOVA MATRÍCULA RECEBIDA*\n\n` +
        `👧 *Aluna:* ${studentName}\n` +
        `📅 *Idade:* ${studentAge} anos\n` +
        `📚 *Turma:* ${selectedClass}\n` +
        `🕐 *Turno:* ${shift}\n` +
        `📱 *Telefone do Responsável:* ${phone}\n` +
        `🆔 *CPF:* ${cpf}\n\n` +
        `_Matrícula registrada no sistema._`,
    )

    window.open(`https://wa.me/${academyPhone}?text=${message}`, "_blank")
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-background to-pink-50/40">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/40 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/bal-c3-a9.jpg" alt="Corpus Maria Logo" className="w-8 h-8 rounded-full object-cover" />
            <Link href="/" className="text-foreground hover:text-primary transition font-light text-sm">
              Corpus Maria
            </Link>
          </div>
          <Link href="/" className="text-foreground/60 hover:text-primary transition font-light text-sm">
            ← Voltar para início
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-foreground mb-4">Matrícula Confirmada!</h1>
          <p className="text-lg text-foreground/60 font-light">Parabéns! Sua inscrição foi registrada com sucesso.</p>
        </motion.div>

        {studentName && (
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-primary/5 to-pink-50/50 border border-primary/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-light text-foreground mb-4 text-center">Dados da Matrícula</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground/60 font-light">Aluna</p>
                <p className="text-foreground font-medium">{studentName}</p>
              </div>
              <div>
                <p className="text-foreground/60 font-light">Idade</p>
                <p className="text-foreground font-medium">{studentAge} anos</p>
              </div>
              <div>
                <p className="text-foreground/60 font-light">Turma</p>
                <p className="text-foreground font-medium">{selectedClass}</p>
              </div>
              <div>
                <p className="text-foreground/60 font-light">Turno</p>
                <p className="text-foreground font-medium">{shift}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Info Card */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur border border-primary/10 rounded-2xl p-8 mb-8"
        >
          <div className="text-center space-y-6">
            <div>
              <p className="text-sm font-light text-foreground/70 uppercase tracking-widest mb-2">Taxa de Matrícula</p>
              <p className="text-5xl font-light text-primary">R$ {ENROLLMENT_FEE.toFixed(2)}</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <p className="text-sm font-light text-foreground/80">
                Escolha uma forma de pagamento para completar sua matrícula
              </p>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* PIX */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6 hover:border-primary/20 transition"
          >
            <h3 className="text-lg font-light text-foreground mb-4">Transferência PIX</h3>
            <div className="bg-white rounded-lg p-6 flex items-center justify-center border-2 border-dashed border-primary/20 mb-4">
              <div className="text-center">
                <div className="text-5xl mb-2">✦</div>
                <p className="text-xs text-foreground/60 font-light">QR Code PIX</p>
              </div>
            </div>
            <p className="text-xs text-foreground/60 font-light text-center">Escaneie o código com seu banco</p>
          </motion.div>

          {/* Credit Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/60 backdrop-blur border border-border/40 rounded-xl p-6 hover:border-primary/20 transition"
          >
            <h3 className="text-lg font-light text-foreground mb-4">Cartão de Crédito</h3>
            <a
              href="https://payment-link-v3.stone.com.br/pl_93xpWRkLjgzNAeeC3HpAbQ4e0E8MwO1o"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-light py-4 transition-all hover:shadow-lg text-center"
            >
              Pagar com Cartão
              <ArrowRight className="w-4 h-4 inline ml-2" />
            </a>
            <p className="text-xs text-foreground/60 font-light text-center mt-4">Parcelamento disponível</p>
          </motion.div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur border border-green-200/40 rounded-2xl p-6 mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-light text-foreground mb-2">Próximo Passo: Notificações</h3>
            <p className="text-sm text-foreground/60 font-light">
              Use os botões abaixo para enviar as informações necessárias via WhatsApp
            </p>
          </div>

          <div className="space-y-4">
            {/* Botão 1: Notificar Academia */}
            <button
              onClick={handleNotifyAcademy}
              className="w-full bg-gradient-to-r from-purple-50 to-purple-50/50 border border-purple-200/60 rounded-xl p-5 hover:border-purple-300/80 transition hover:bg-purple-50/80 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-700" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-purple-900 mb-1">1. Notificar a Academia</p>
                <p className="text-xs text-purple-700/80 font-light">
                  Envia automaticamente os dados da matrícula (nome, turma, horário) para o WhatsApp da academia
                </p>
              </div>
            </button>

            {/* Botão 2: Enviar Comprovante */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-50 to-green-50/50 border border-green-200/60 rounded-xl p-5 hover:border-green-300/80 transition hover:bg-green-50/80 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-green-900 mb-1">2. Enviar Comprovante de Pagamento</p>
                <p className="text-xs text-green-700/80 font-light">
                  Após realizar o pagamento, use este botão para enviar o comprovante via WhatsApp
                </p>
              </div>
            </button>
          </div>

          <div className="mt-4 bg-blue-50/50 border border-blue-200/40 rounded-lg p-4">
            <p className="text-xs text-blue-900/80 font-light text-center">
              💡 Clique no primeiro botão agora para notificar a academia. Depois, faça o pagamento e use o segundo
              botão para enviar o comprovante.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="bg-primary/5 border border-primary/10 rounded-2xl p-8"
        >
          <h3 className="text-lg font-light text-foreground mb-6">Resumo dos Próximos Passos</h3>
          <div className="space-y-4">
            {[
              { num: "1", text: "Clique em 'Notificar a Academia' para avisar sobre sua matrícula" },
              { num: "2", text: "Escolha uma forma de pagamento (PIX ou Cartão)" },
              { num: "3", text: "Complete o pagamento seguindo as instruções" },
              { num: "4", text: "Clique em 'Enviar Comprovante' e anexe o comprovante de pagamento" },
              { num: "5", text: "Aguarde a confirmação e receba seu horário das aulas" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-light text-sm">
                  {step.num}
                </div>
                <div className="flex items-center">
                  <p className="text-foreground/80 font-light">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Info */}
        <motion.div {...fadeInUp} transition={{ delay: 0.7 }} className="text-center mt-12">
          <p className="text-sm text-foreground/60 font-light mb-4">Tem dúvidas ou precisa de ajuda?</p>
          <Link href="/">
            <Button
              variant="outline"
              className="border-border/40 bg-transparent rounded-lg font-light hover:bg-foreground/5"
            >
              Entre em Contato
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function ConfirmacaoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <ConfirmacaoContent />
    </Suspense>
  )
}
