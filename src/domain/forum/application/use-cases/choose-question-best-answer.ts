import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface ChoseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChoseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChoseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    // eslint-disable-next-line
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoseQuestionBestAnswerUseCaseRequest): Promise<ChoseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(
      // eslint-disable-next-line
      answer.questionId.toString()
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id
    this.questionRepository.save(question)

    return { question }
  }
}
