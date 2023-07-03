export interface QuizAnswer {
  id: number
  text: string
  correct: boolean
}

export interface Quiz {
  id: number
  text: string
  hint: string
  answers: QuizAnswer[]
}
