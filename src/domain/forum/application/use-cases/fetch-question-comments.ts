import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsCommentsUseCaseResponse {
  comments: QuestionComment[]
}

export class FetchQuestionsCommentsUseCase {
  constructor(private commentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const comments = await this.commentsRepository.findManyByQuestionId(
      questionId,
      {
        page,
      }
    )

    return {
      comments,
    }
  }
}
