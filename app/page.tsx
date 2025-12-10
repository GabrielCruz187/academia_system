import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white/50 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <span className="text-xl font-semibold text-foreground">Academia de Balé</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-8 text-center">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Bem-vindo à <span className="text-primary">Academia de Balé</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Experimente a elegância e graça do balé clássico. Junte-se à nossa comunidade de bailarinos e descubra sua
              paixão pela dança.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
            <div className="bg-white rounded-lg p-6 border border-border">
              <div className="text-3xl mb-3">🩰</div>
              <h3 className="font-semibold text-foreground">Professores Profissionais</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Instrutores experientes com credenciais internacionais
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-border">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-foreground">Estúdio Moderno</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Instalações de última geração com espelhos e pisos especializados
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-border">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-semibold text-foreground">Apresentações</h3>
              <p className="text-sm text-muted-foreground mt-2">Recitais regulares e oportunidades de palco</p>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Link href="/matricula">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold"
              >
                Realizar Matrícula
              </Button>
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-muted-foreground">
            Já matriculado?{" "}
            <Link href="/admin" className="text-primary hover:underline">
              Ver status de matrícula
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
