export interface ClassSchedule {
  day: string
  time: string
  minAge: number
  maxAge: number
  displayName: string
}

export const BALLET_CLASSES: ClassSchedule[] = [
  // Segunda-feira
  {
    day: "Segunda-feira",
    time: "17:30 - 18:30",
    minAge: 4,
    maxAge: 6,
    displayName: "Segunda-feira, 17:30 às 18:30 (4, 5 e 6 anos)",
  },
  {
    day: "Segunda-feira",
    time: "18:30 - 19:30",
    minAge: 7,
    maxAge: 9,
    displayName: "Segunda-feira, 18:30 às 19:30 (7, 8 e 9 anos)",
  },
  {
    day: "Segunda-feira",
    time: "19:30 - 20:30",
    minAge: 13,
    maxAge: 17,
    displayName: "Segunda-feira, 19:30 às 20:30 (13 a 17 anos)",
  },
  // Terça-feira
  {
    day: "Terça-feira",
    time: "09:30 - 10:30",
    minAge: 4,
    maxAge: 6,
    displayName: "Terça-feira, 09:30 às 10:30 (4, 5 e 6 anos)",
  },
  {
    day: "Terça-feira",
    time: "17:30 - 18:30",
    minAge: 4,
    maxAge: 6,
    displayName: "Terça-feira, 17:30 às 18:30 (4, 5 e 6 anos)",
  },
  {
    day: "Terça-feira",
    time: "18:30 - 19:30",
    minAge: 10,
    maxAge: 12,
    displayName: "Terça-feira, 18:30 às 19:30 (10, 11 e 12 anos)",
  },
  {
    day: "Terça-feira",
    time: "19:30 - 20:30",
    minAge: 10,
    maxAge: 12,
    displayName: "Terça-feira, 19:30 às 20:30 (10, 11 e 12 anos)",
  },
]

// Calculate age based on birthdate
export function calculateAge(birthdate: string): number {
  const today = new Date()
  const birth = new Date(birthdate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

// Get classes available for a specific age
export function getAvailableClasses(age: number): ClassSchedule[] {
  return BALLET_CLASSES.filter((classItem) => age >= classItem.minAge && age <= classItem.maxAge)
}
