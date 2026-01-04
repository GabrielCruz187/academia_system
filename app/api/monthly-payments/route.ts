import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  const { searchParams } = new URL(request.url)
  const enrollmentId = searchParams.get("enrollment_id")
  const month = searchParams.get("month")
  const year = searchParams.get("year")

  let query = supabase
    .from("monthly_payments")
    .select("*")
    .order("year", { ascending: false })
    .order("month", { ascending: false })

  if (enrollmentId) {
    query = query.eq("enrollment_id", enrollmentId)
  }
  if (month) {
    query = query.eq("month", Number.parseInt(month))
  }
  if (year) {
    query = query.eq("year", Number.parseInt(year))
  }

  const { data, error } = await query

  if (error) {
    console.log("[v0] Error fetching monthly payments:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    const body = await request.json()
    console.log("[v0] Received monthly payment data:", body)

    const { enrollment_id, student_name, month, year, amount = 100.0 } = body

    if (!enrollment_id || !student_name || !month || !year) {
      console.log("[v0] Missing required fields")
      return NextResponse.json(
        { error: "Missing required fields: enrollment_id, student_name, month, year" },
        { status: 400 },
      )
    }

    console.log("[v0] Inserting monthly payment:", { enrollment_id, student_name, month, year, amount })

    const { data, error } = await supabase
      .from("monthly_payments")
      .insert({
        enrollment_id,
        student_name,
        month,
        year,
        amount,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.log("[v0] Error inserting monthly payment:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Successfully created monthly payment:", data)
    return NextResponse.json(data)
  } catch (err) {
    console.log("[v0] Unexpected error in POST /api/monthly-payments:", err)
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 })
  }
}

