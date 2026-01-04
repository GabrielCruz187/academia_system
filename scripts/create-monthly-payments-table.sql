-- Create monthly_payments table to track recurring monthly fees
CREATE TABLE IF NOT EXISTS monthly_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  month INTEGER NOT NULL, -- 1-12
  year INTEGER NOT NULL,
  amount DECIMAL(10, 2) DEFAULT 100.00,
  status TEXT DEFAULT 'pending', -- 'pending' or 'paid'
  payment_date DATE,
  payment_method TEXT, -- 'pix', 'card', 'cash'
  payment_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(enrollment_id, month, year)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_monthly_payments_enrollment ON monthly_payments(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_monthly_payments_status ON monthly_payments(status);
CREATE INDEX IF NOT EXISTS idx_monthly_payments_month_year ON monthly_payments(month, year);

-- Add comment
COMMENT ON TABLE monthly_payments IS 'Monthly recurring payments for enrolled students';
