export interface QuizAnswer {
  id: number
  answer: string
  correct?: boolean
}

export interface QuizQuestion {
  id: number
  question: string
  answers: QuizAnswer[]
  hint: string
}
