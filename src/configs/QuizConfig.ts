import { BaseConfig } from '~/configs/BaseConfig'
import QuizQuestion from '~/types/configs/QuizQuestion'

export default class QuizConfig extends BaseConfig {
  getQuestions(): QuizQuestion[] {
    return [
      {
        id: 1,
        question: 'Jak se máš?',
        answers: [
          {
            id: 1,
            answer: 'Špatně.'
          },
          {
            id: 2,
            answer: 'Nevím.'
          },
          {
            id: 3,
            answer: 'Hele, nic moc.'
          },
          {
            id: 4,
            answer: 'Dobře more!',
            correct: true
          }
        ],
        hint: 'No měl by ses mít dobře!'
      }
    ]
  }
}
