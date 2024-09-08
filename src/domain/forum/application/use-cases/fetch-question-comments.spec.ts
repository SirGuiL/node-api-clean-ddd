import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionsCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionsCommentsUseCase

describe('Fetch question questioncomments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionsCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question questioncomments', async () => {
    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-comment-1'),
        // eslint-disable-next-line
      })
    )

    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-comment-1'),
        // eslint-disable-next-line
      })
    )

    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-comment-1'),
        // eslint-disable-next-line
      })
    )

    const { comments } = await sut.execute({
      questionId: 'question-comment-1',
      page: 1,
    })

    expect(comments).toHaveLength(3)
  })

  it('should be able to fetch paginated question questioncomments', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-comment-1'),
          // eslint-disable-next-line
        })
      )
    }

    const { comments } = await sut.execute({
      questionId: 'question-comment-1',
      page: 2,
    })

    expect(comments).toHaveLength(2)
  })
})
