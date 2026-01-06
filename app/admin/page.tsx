import { redirect } from "next/navigation"
import { createClient as createServerClient } from "@/lib/supabase/server"
import AdminDashboard from "./dashboard"

interface Enrollment {
  id: string
  full_name: string
  phone: string
  cpf: string
  date_of_birth: string
  age: number
  selected_class: string
  shift: string
  created_at: string
  payment_status: string
  payment_amount?: number
}

interface MonthlyPayment {
  id: string
  enrollment_id: string
  student_name: string
  month: number
  year: number
  amount: number
  status: string
  payment_date: string | null
  payment_method: string | null
}

interface EnrollmentWithPayments extends Enrollment {
  monthly_payments: MonthlyPayment[]
}

export default async function AdminPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return <AdminDashboard user={user} />
}







