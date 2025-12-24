import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { payment_status, payment_amount, payment_method, payment_date, notes } = body

    // Update enrollment payment information
    const { data, error } = await supabase
      .from("enrollments")
      .update({
        payment_status,
        payment_amount,
        payment_method,
        payment_date: payment_date || new Date().toISOString(),
        notes,
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating payment:", error)
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Payment update failed:", error)
    return NextResponse.json({ success: false, error: "Falha ao atualizar pagamento" }, { status: 500 })
  }
}
