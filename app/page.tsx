"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StageCurtain } from "@/components/stage-curtain"
import { BalletParticles } from "@/components/ballet-particles"
import { FloatingSilhouette } from "@/components/floating-silhouette"
import { BreathingBackground } from "@/components/breathing-background"
import { RevealBar } from "@/components/reveal-bar"
import { CurvedStrokeAnimation } from "@/components/curved-stroke-animation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const letters = "CORPUS MARIA".split("")

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const titleVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const sectionReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      <StageCurtain />
      <BreathingBackground />
      <BalletParticles />
      <FloatingSilhouette />
      <RevealBar />
      <CurvedStrokeAnimation />

      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo2.png" alt="Corpus Maria Logo" className="w-10 h-10 object-contain" />
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
            <a href="#equipe" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Equipe
            </a>
            <a href="#uniformes" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Uniformes
            </a>
            <a href="#espetaculos" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Espetáculos
            </a>
            <a href="#familia" className="text-sm font-light text-foreground/70 hover:text-foreground transition">
              Corpus Maria é Família
            </a>
            <Link href="/matricula">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-light">
                Matricular
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
              <a
                href="#sobre"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Sobre
              </a>
              <a
                href="#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Benefícios
              </a>
              <a
                href="#turmas"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Turmas
              </a>
              <a
                href="#equipe"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Equipe
              </a>
              <a
                href="#uniformes"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Uniformes
              </a>
              <a
                href="#espetaculos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Espetáculos
              </a>
              <a
                href="#familia"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-light text-foreground/70 hover:text-foreground transition py-2"
              >
                Corpus Maria é Família
              </a>
              <Link href="/matricula" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-light w-full">
                  Matricular
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="mb-8"
          >
            <img src="/logo2.png" alt="Corpus Maria Logo" className="w-32 h-32 mx-auto object-contain opacity-80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src="/IMG_2596.jpg"
              alt="Aula de Ballet Corpus Maria"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>

          <motion.div variants={titleVariants} initial="hidden" animate="visible" className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-[0.2em] sm:tracking-[0.3em] mb-8">
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-tight">
              promovendo saúde através da <span className="text-primary">dança</span> 
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-foreground/60 font-light max-w-2xl mx-auto"
              transition={{ delay: 1 }}
            >
              Descubra uma jornada de movimento, graça e transformação. Nossa academia oferece aulas de balé em um
              ambiente refinado e acolhedor.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/matricula">
              <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-light transition-all hover:shadow-[0_0_20px_rgba(229,197,200,0.6)]"
                >
                  Realizar Matrícula
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
              <button className="px-8 py-6 rounded-full border border-primary/30 text-primary hover:bg-primary/5 font-light transition hover:shadow-[0_0_15px_rgba(229,197,200,0.4)]">
                Saiba Mais
              </button>
            </motion.div>
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

      <motion.section
        id="sobre"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/40"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/IMG_2498.jpg"
                alt="Corpus Maria - Quem Somos"
                className="w-full h-full object-cover"
              />
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
                Nosso grupo fornece um ambiente acolhendor para incentivar o desenvolvimento
              </h2>
            </div>
            <p className="text-lg text-foreground/60 font-light leading-relaxed">
              Há mais de 15 anos promovendo saúde, desenvolvimento,  disciplina através da Dança
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-foreground/70 font-light">Ambiente acolhedor e facilitador para o processo de aprendizagem.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-foreground/70 font-light">Professores capacitados.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-foreground/70 font-light">Espetataculo temático anual</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="beneficios"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
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
              { icon: "🧠", title: "Psicol��gico", desc: "Alivie stress e cultive bem-estar mental" },
              { icon: "👥", title: "Social", desc: "Crie amizades em uma comunidade acolhedora" },
              { icon: "💖", title: "Emocional", desc: "Expresse-se através da arte e movimento" },
              { icon: "✨", title: "Confiança", desc: "Ganhe autoestima e segurança pessoal" },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 30px rgba(229, 197, 200, 0.3)",
                }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + idx * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl p-8 hover:bg-white/80 transition-colors"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-light text-foreground mb-3">{benefit.title}</h3>
                <p className="text-foreground/60 font-light">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="turmas"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
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
              // Segunda-feira
              { name: "Segunda-feira - 17:30 às 18:30", age: "4, 5 e 6 anos", time: "Segunda-feira" },
              { name: "Segunda-feira - 18:30 às 19:30", age: "7, 8 e 9 anos", time: "Segunda-feira" },
              { name: "Segunda-feira - 19:30 às 20:30", age: "13, 14, 15, 16 e 17 anos", time: "Segunda-feira" },
              // Terça-feira
              { name: "Terça-feira - 9:30 às 10:30", age: "4, 5 e 6 anos", time: "Terça-feira" },
              { name: "Terça-feira - 17:30 às 18:30", age: "4, 5 e 6 anos", time: "Terça-feira" },
              { name: "Terça-feira - 18:30 às 19:30", age: "10, 11 e 12 anos", time: "Terça-feira" },
              { name: "Terça-feira - 19:30 às 20:30", age: "10, 11 e 12 anos", time: "Terça-feira" },
            ].map((classe, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 8px 25px rgba(229, 197, 200, 0.25)",
                }}
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + idx * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                className="bg-white/40 backdrop-blur border border-primary/10 rounded-xl p-6 text-center hover:bg-white/60 transition-colors"
              >
                <h3 className="text-lg font-light text-foreground mb-2">{classe.name}</h3>
                <p className="text-sm text-foreground/60 font-light mb-3">{classe.age}</p>
                <p className="text-xs text-primary font-light">{classe.time}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="equipe"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-pink-50/30"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Portifólio Corpu's Maria</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Nosso Time de Profissionais</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden hover:bg-white/80 transition group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/gio.jfif"
                  alt="Giovana Alessi Toso"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-light text-foreground mb-2 text-center">GIOVANA ALESSI TOSO</h3>
                <div className="space-y-2 text-center text-sm text-foreground/70 font-light">
                  <p>Psicóloga Especialista em Saúde Mental Coletiva</p>
                  <p>Professora de 1ª Año de Nível Elemental de Ballet Clássico</p>
                  <p>Pesquisadora do método dança movimento e terapia</p>
                  <p className="text-primary font-normal mt-4">Fundadora do Corpu's Maria</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden hover:bg-white/80 transition group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/ana.jfif"
                  alt="Ana Paula Potrich"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-light text-foreground mb-2 text-center">ANA PAULA POTRICH</h3>
                <div className="space-y-2 text-center text-sm text-foreground/70 font-light">
                  <p>Bailarina do Corpu's Maria há mais de 10 anos</p>
                  <p>Monitora responsável pelas coreografias infantis</p>
                  <p className="text-primary font-normal mt-4">Diretora de marketing do Corpu's Maria</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden hover:bg-white/80 transition group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/rafa.jfif"
                  alt="Rafaela Zanella"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-light text-foreground mb-2 text-center">RAFAELA ZANELLA</h3>
                <div className="space-y-2 text-center text-sm text-foreground/70 font-light">
                  <p>Bailarina do Corpu's Maria há 8 anos</p>
                  <p>Monitora e responsável pela recreação artística</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section

        id="uniformes"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Portifólio Corpu's Maria</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Uniformes</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-sm border border-border/40 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-light text-foreground mb-6 text-center">Uso de:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                "COLLANT (VERÃO)",
                "CAMISETA",
                "SAIA (COM MEIA CALÇA)",
                "TOP",
                "LEGGING",
                "SAPATILHA",
                "SHORT (COM MEIA CALÇA)",
                "MOLETOM",
                "COLLANT (INVERNO)",
                "MEIA CALÇA",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center text-sm font-light text-foreground/80"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="border-t border-border/40 pt-6 space-y-3 text-center">
              <p className="text-sm text-foreground/70 font-light">
                <span className="font-normal">Disponíveis para encomenda:</span> (54 984140643, Elenice)
              </p>
              <p className="text-sm text-foreground/60 font-light italic">
                Não é obrigatória a aquisição de todas as peças
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-light text-foreground mb-6 text-center">A Importância do Uniforme</h3>
            <div className="space-y-6 text-foreground/70 font-light">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  O uniforme permite que se observe com clareza a postura, o alinhamento corporal e a execução dos
                  movimentos.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  Fortalece o senso de pertencimento. Vestir o mesmo uniforme que as colegas estimula a união e o
                  espírito de equipe dentro do grupo.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  Proporciona liberdade e conforto, pois é desenvolvido especificamente para acompanhar as exigências
                  físicas do balé.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="leading-relaxed">
                  É essencial que as bailarinas venham para as aulas devidamente uniformizadas. Demonstra
                  comprometimento e contribui diretamente para o progresso técnico e artístico de cada aluna.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="espetaculos"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/30 to-background"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Portifólio Corpu's Maria</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Espetáculos</h2>
            <p className="text-lg text-foreground/60 font-light max-w-3xl mx-auto">
              Realizados de forma anual em duas sessões. Em cada ano seguimos uma temática nova, onde trabalhamos seus
              conteúdos, emocionais e culturais.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              { name: "Vida", image: "/vida.jpeg" },
              { name: "Maravilha's", image: "/Maravilha´s.jpeg" },
              { name: "Bela", image: "/bela.jpeg" },
              { name: "Rara", image: "/rara.jpeg" },
              { name: "Desejo", image: "/desejo.jpeg" },
              { name: "Valiosa", image: "/valiosa.jpeg" },
              { name: "Amare", image: "/amare.jpeg" },
              { name: "Libertá", image: "/liberta.jpeg" },
              { name: "Imortalle", image: "/imortalle.jpeg" },
              { name: "Valente", image: "/valente.jpeg" },
            ].map((show, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-xl overflow-hidden cursor-pointer group border border-primary/20 hover:border-primary/40 transition relative"
              >
                <img
                  src={show.image || "/placeholder.svg"}
                  alt={show.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-4">
                  <span className="text-lg font-light text-white drop-shadow-lg">{show.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-sm border border-border/40 rounded-2xl p-8 md:p-12 mt-12"
          >
            <h3 className="text-2xl font-light text-foreground mb-8 text-center">Organização do Espetáculo</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary text-sm">👨‍👩‍👧</span>
                  </div>
                  <div>
                    <h4 className="font-normal text-foreground mb-2">Responsabilidade dos Pais</h4>
                    <p className="text-sm text-foreground/70 font-light leading-relaxed">
                      A responsabilidade pelos custos com maquiagem, cabelo e figurino fica a cargo dos pais e
                      responsáveis das alunas, garantindo que todos estejam caracterizados de forma padronizada e
                      adequada ao tema do evento. Ainda, o custo dos ingressos para os familiares e registros
                      fotográficos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary text-sm">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-normal text-foreground mb-2">Responsabilidade da Academia</h4>
                    <p className="text-sm text-foreground/70 font-light leading-relaxed">
                      Por sua vez, a Academia Corpo e Saúde se responsabiliza por toda a estrutura do espetáculo,
                      incluindo iluminação, sonorização, impressão dos ingressos e decoração do espaço.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="familia"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-4">
            <p className="text-sm font-light text-primary uppercase tracking-widest">Comunidade</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground">Corpus Maria é Família</h2>
            <p className="text-lg text-foreground/60 font-light max-w-3xl mx-auto">
              Momentos especiais que compartilhamos juntos, celebrando a arte, o movimento e a união.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              { type: "image", src: "IMG_2455.jpg", alt: "Família Corpus Maria" },,
              { type: "image", src: "/IMG_2498.jpg", alt: "Evento Especial" },
              { type: "image", src: "IMG_2596.jpg", alt: "Celebração" },
              { type: "image", src: "alongamento.jpg", alt: "Momentos Inesquecíveis" },
            ].map((media, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 transition group"
              >
                {media.type === "image" && (
                  <img
                    src={media.src || "/placeholder.svg"}
                    alt={media.alt || "Corpus Maria Família"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {media.type === "youtube" && (
                  <iframe
                    src={media.src}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {media.type === "video" && <video src={media.src} controls className="w-full h-full object-cover" />}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-sm border border-border/40 rounded-2xl p-8 text-center"
          >
            <p className="text-foreground/70 font-light leading-relaxed">
              Aqui você pode adicionar fotos e vídeos das nossas celebrações, eventos especiais, e momentos
              inesquecíveis que vivemos como uma grande família do Corpus Maria.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/40"
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
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
      </motion.section>

      <footer className="border-t border-border/40 bg-gradient-to-b from-background to-secondary/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/acad.jpeg"
                alt="Corpo e Saúde Academia Logo"
                width={120}
                height={80}
                className="object-contain"
              />
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
              <li>
                <a href="#equipe" className="hover:text-primary transition">
                  Equipe
                </a>
              </li>
              <li>
                <a href="#uniformes" className="hover:text-primary transition">
                  Uniformes
                </a>
              </li>
              <li>
                <a href="#espetaculos" className="hover:text-primary transition">
                  Espetáculos
                </a>
              </li>
              <li>
                <a href="#familia" className="hover:text-primary transition">
                  Corpus Maria é Família
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-light text-foreground">Contato</h4>
            <ul className="space-y-2 text-sm font-light text-foreground/60">
              <li>(54) 99901-0633</li>
              <li>Constantina, RS</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-light text-foreground">Redes Sociais</h4>
            <ul className="space-y-2 text-sm font-light text-foreground/60">
              <li>
                <a href="https://www.instagram.com/corpusmariaa/" className="hover:text-primary transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/40 text-center text-sm text-foreground/50 font-light">
          <p>© 2025 Academia corpo e saúde. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}


