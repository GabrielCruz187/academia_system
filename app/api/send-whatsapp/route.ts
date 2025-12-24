import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentName, responsiblePhone, selectedClass, age, cpf } = body

    // Número do WhatsApp da academia
    const academyPhone = "5499910633" // (54) 99901-0633

    // Criar mensagem formatada com todas as informações
    const message = `🩰 *NOVA MATRÍCULA - CORPUS MARIA*

📝 *Dados da Aluna:*
Nome: ${studentName}
Idade: ${age} anos

📞 *Responsável:*
Telefone: ${responsiblePhone}
CPF: ${cpf}

🎭 *Turma Matriculada:*
${selectedClass}

✅ Status: Aguardando pagamento
💰 Valor: R$ 80,00

---
Matrícula realizada através do sistema online.`

    // Criar link do WhatsApp com a mensagem
    const whatsappLink = `https://wa.me/${academyPhone}?text=${encodeURIComponent(message)}`

    // Retornar o link para abrir no cliente
    return NextResponse.json({
      success: true,
      whatsappLink,
      message: "Link do WhatsApp gerado com sucesso",
    })
  } catch (error) {
    console.error("[v0] Error generating WhatsApp link:", error)
    return NextResponse.json({ success: false, error: "Erro ao gerar link do WhatsApp" }, { status: 500 })
  }
}
