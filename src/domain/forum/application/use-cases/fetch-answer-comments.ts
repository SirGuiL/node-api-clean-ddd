import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswersCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswersCommentsUseCaseResponse {
  comments: AnswerComment[]
}

export class FetchAnswersCommentsUseCase {
  constructor(private commentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const comments = await this.commentsRepository.findManyByAnswerId(
      answerId,
      {
        page,
      }
    )

    return {
      comments,
    }
  }
}
