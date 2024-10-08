import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      }
    )

    if (!answers) {
      throw new Error('Answers not found.')
    }

    return {
      answers,
    }
  }
}
