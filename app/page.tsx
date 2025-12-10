"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { BalletAnimation } from "@/components/ballet-animation"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  }

  return (
    <div className="bg-gradient-to-b from-pink-50 via-background to-pink-50/30">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/balé.jpg" alt="Corpus Maria Logo" className="w-10 h-10 rounded-full object-cover" />
            <span className="text-lg font-light text-foreground tracking-wide">Corpus Maria</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Sobre
            </a>
            <a href="#beneficios" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Benefícios
            </a>
            <a href="#turmas" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Turmas
            </a>
            <Link href="/matricula">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-light">
                Matricular
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-br from-pink-50 via-white to-pink-100/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-secondary/3 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <BalletAnimation />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground tracking-tight"
              style={{ lineHeight: "1.2" }}
            >
              A elegância da <span className="text-primary">dança</span> clássica
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-foreground/60 font-light max-w-2xl mx-auto"
              transition={{ delay: 0.2 }}
            >
              Descubra uma jornada de movimento, graça e transformação. Nossa academia oferece aulas de balé em um
              ambiente refinado e acolhedor.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/matricula">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-light transition-all hover:shadow-lg"
              >
                Realizar Matrícula
              </Button>
            </Link>
            <button className="px-8 py-6 rounded-full border border-primary/30 text-primary hover:bg-primary/5 font-light transition">
              Saiba Mais
            </button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="pt-8"
          >
            <ChevronDown className="w-5 h-5 text-primary/40 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-6xl font-light text-primary/30">✦</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-sm font-light text-primary uppercase tracking-widest">Quem Somos</p>
              <h2 className="text-4xl sm:text-5xl font-light text-foreground">
                Uma comunidade dedicada à arte da dança
              </h2>
            </div>
            <p className="text-lg text-foreground/60 font-light leading-relaxed">
              Há mais de 15 anos, nossa academia cultiva a paixão pelo balé clássico. Nossos instrutores profissionais
              guiam cada aluno em sua jornada de descoberta, movimento e expressão artística.
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-foreground/70 font-light">Ambiente acolhedor e inclusivo</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-foreground/70 font-light">Professores certificados internacionalmente</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-foreground/70 font-light">Apresentações e recitais anuais</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="beneficios"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Transformação</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Benefícios do balé</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: "💪", title: "Físico", desc: "Desenvolva força, flexibilidade e resistência" },
              { icon: "🧘", title: "Postural", desc: "Melhore sua postura e alinhamento corporal" },
              { icon: "🧠", title: "Psicológico", desc: "Alivie stress e cultive bem-estar mental" },
              { icon: "👥", title: "Social", desc: "Crie amizades em uma comunidade acolhedora" },
              { icon: "💖", title: "Emocional", desc: "Expresse-se através da arte e movimento" },
              { icon: "✨", title: "Confiança", desc: "Ganhe autoestima e segurança pessoal" },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl p-8 hover:bg-white/80 transition"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-light text-foreground mb-3">{benefit.title}</h3>
                <p className="text-foreground/60 font-light">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="turmas" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Programação</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Turmas para todos os níveis</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[
              { name: "Infantil 1", age: "3-5 anos", time: "Seg e Qua 14:00" },
              { name: "Infantil 2", age: "6-8 anos", time: "Ter e Qui 15:00" },
              { name: "Intermediária 1", age: "9-12 anos", time: "Seg e Qua 16:30" },
              { name: "Intermediária 2", age: "13-16 anos", time: "Ter e Qui 18:00" },
              { name: "Adulta", age: "17+", time: "Sab 10:00" },
            ].map((classe, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur border border-primary/10 rounded-xl p-6 text-center hover:bg-white/60 transition"
              >
                <h3 className="text-lg font-light text-foreground mb-2">{classe.name}</h3>
                <p className="text-sm text-foreground/60 font-light mb-3">{classe.age}</p>
                <p className="text-xs text-primary font-light">{classe.time}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Uniforms Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Essencial</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Uniformes</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Vestiário Infantil", desc: "Maillot rosa pastel, collant branco e sapatilhas" },
              { title: "Vestiário Júnior", desc: "Maillot standard, collant preto e sapatilhas profissionais" },
              { title: "Vestiário Adulto", desc: "Opções variadas de maillot, collant e sapatilhas" },
            ].map((uniform, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white/50 border border-border/40 rounded-xl p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full mb-6" />
                <h3 className="text-xl font-light text-foreground mb-3">{uniform.title}</h3>
                <p className="text-foreground/60 font-light">{uniform.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Performances Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Apresentações</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Nossos espetáculos</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((_, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl overflow-hidden cursor-pointer group"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl font-light text-primary/30 group-hover:scale-110 transition">✦</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Pronto para começar sua jornada?</h2>
            <p className="text-lg text-foreground/60 font-light">
              Matricule-se agora e descubra a beleza do balé clássico
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/matricula">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-light"
              >
                Matricular Agora
              </Button>
            </Link>
            <button className="px-8 py-6 rounded-full border border-foreground/20 text-foreground hover:bg-foreground/5 font-light transition">
              Download de Informações
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-gradient-to-b from-background to-secondary/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-light">✦</span>
              </div>
              <span className="font-light text-foreground">Academia de Balé</span>
            </div>
            <p className="text-sm text-foreground/60 font-light">Elegância em movimento</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-light text-foreground">Links</h4>
            <ul className="space-y-2 text-sm font-light text-foreground/60">
              <li>
                <a href="#sobre" className="hover:text-primary transition">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-primary transition">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#turmas" className="hover:text-primary transition">
                  Turmas
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-light text-foreground">Contato</h4>
            <ul className="space-y-2 text-sm font-light text-foreground/60">
              <li>(11) 9999-9999</li>
              <li>contato@academiadebale.com.br</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-light text-foreground">Redes Sociais</h4>
            <ul className="space-y-2 text-sm font-light text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/40 text-center text-sm text-foreground/50 font-light">
          <p>© 2025 Academia de Balé. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}


