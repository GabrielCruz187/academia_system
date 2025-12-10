"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ENROLLMENT_FEE = 80.0

export default function ConfirmacaoPage() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de enviar o comprovante de inscrição na Academia de Balé. Realizei a inscrição e estou realizando o pagamento da taxa de inscrição de R$ 80,00.",
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Matrícula Confirmada!</h1>
          <p className="text-muted-foreground">Complete seu pagamento para finalizar sua matrícula</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Payment Info */}
          <Card className="border-border">
            <CardHeader className="bg-white border-b border-border">
              <CardTitle>Informações de Pagamento</CardTitle>
              <CardDescription>Detalhes da Taxa de Matrícula</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Fee Display */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taxa de Matrícula:</span>
                  <span className="text-2xl font-bold text-primary">R$ {ENROLLMENT_FEE.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Formas de Pagamento</h3>

                {/* PIX */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-foreground">Transferência PIX</h4>
                  <div className="bg-white rounded-lg p-4 border-2 border-border">
                    <p className="text-sm text-muted-foreground mb-2">Escaneie o QR Code:</p>
                    <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                      {/* Placeholder para QR Code - Usuário irá substituir */}
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <span className="text-sm text-muted-foreground text-center">
                          QR Code PIX
                          <br />
                          (Substitua esta imagem)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold py-3"
                  onClick={() => {
                    // Placeholder para link de pagamento externo
                    alert("Link de pagamento com cartão de crédito será redirecionado aqui")
                  }}
                >
                  Pagar com Cartão de Crédito
                </Button>

                {/* WhatsApp */}
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold py-3 bg-transparent"
                  onClick={handleWhatsAppClick}
                >
                  Enviar Comprovante pelo WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Instructions */}
          <Card className="border-border bg-primary/5">
            <CardHeader className="border-b border-border">
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Escolha uma Forma de Pagamento</h4>
                    <p className="text-sm text-muted-foreground">
                      PIX para transferências instantâneas ou cartão de crédito
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Complete o Pagamento</h4>
                    <p className="text-sm text-muted-foreground">Siga as instruções da forma de pagamento escolhida</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Envie o Comprovante</h4>
                    <p className="text-sm text-muted-foreground">Compartilhe seu recibo pelo WhatsApp para confirmar</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Horário das Aulas</h4>
                    <p className="text-sm text-muted-foreground">Receba seu horário das aulas por e-mail</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-border mt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Tem dúvidas?</p>
                <p className="text-sm text-muted-foreground">Entre em contato pelo WhatsApp para suporte</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="border-border rounded-lg bg-transparent">
              Voltar para Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
