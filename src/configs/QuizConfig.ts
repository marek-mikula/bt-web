import { BaseConfig } from '~/configs/BaseConfig'
import QuizQuestion from '~/types/configs/QuizQuestion'

export default class QuizConfig extends BaseConfig {
  getQuestions(): QuizQuestion[] {
    return [
      {
        id: 1,
        question:
          'Jaký je klíčový rozdíl mezi „hot wallet“ a „cold wallet“ v úložišti kryptoměn?',
        answers: [
          {
            id: 1,
            answer: 'Teplota, při které je peněženka udržována'
          },
          {
            id: 2,
            answer: 'Kompatibilita peněženky s různými kryptoměnami'
          },
          {
            id: 3,
            answer: 'Schopnost peněženky generovat nové adresy kryptoměn'
          },
          {
            id: 4,
            answer: 'Připojení peněženky k internetu',
            correct: true
          }
        ],
        hint: '“Hot wallet” je připojena k internetu a je vhodná pro časté obchodování, zatímco “cold wallet” je offline, nabízí vylepšené zabezpečení pro dlouhodobé skladování a má podobu fyzického zařízení.'
      }
    ].map((question: QuizQuestion): QuizQuestion => {
      // shuffle answers
      question.answers = this.context.$_.shuffle(question.answers)
      return question
    })
  }
}
