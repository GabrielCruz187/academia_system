"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ArrowRight, Smartphone } from "lucide-react"

const ENROLLMENT_FEE = 80.0

export default function ConfirmacaoPage() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de enviar o comprovante de inscrição na Academia de Balé. Realizei a inscrição e estou realizando o pagamento da taxa de inscrição de R$ 80,00.",
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
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
            <img src="/balé.jpg" alt="Corpus Maria Logo" className="w-8 h-8 rounded-full object-cover" />
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
            <button
              onClick={() => alert("Link de pagamento com cartão de crédito será redirecionado aqui")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-light py-4 transition-all hover:shadow-lg"
            >
              Pagar com Cartão
              <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
            <p className="text-xs text-foreground/60 font-light text-center mt-4">Parcelamento disponível</p>
          </motion.div>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.button
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          onClick={handleWhatsAppClick}
          className="w-full bg-gradient-to-r from-green-50 to-green-50/50 border border-green-200/40 rounded-xl p-6 hover:border-green-300/60 transition hover:bg-green-50/80 flex items-center justify-center gap-3 mb-8"
        >
          <Smartphone className="w-5 h-5 text-green-700" />
          <span className="font-light text-green-900">Enviar Comprovante pelo WhatsApp</span>
        </motion.button>

        {/* Steps */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="bg-primary/5 border border-primary/10 rounded-2xl p-8"
        >
          <h3 className="text-lg font-light text-foreground mb-6">Próximos Passos</h3>
          <div className="space-y-4">
            {[
              { num: "1", text: "Escolha uma forma de pagamento" },
              { num: "2", text: "Complete o pagamento seguindo as instruções" },
              { num: "3", text: "Envie o comprovante pelo WhatsApp" },
              { num: "4", text: "Receba seu horário das aulas por e-mail" },
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

