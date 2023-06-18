type QuizAnswer = {
  id: number
  answer: string
  correct?: boolean
}

export default interface QuizQuestion {
  id: number
  question: string
  answers: QuizAnswer[]
  hint: string
}
