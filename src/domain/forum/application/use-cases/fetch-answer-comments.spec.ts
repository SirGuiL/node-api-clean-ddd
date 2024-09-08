import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswersCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswersCommentsUseCase

describe('Fetch answer answercomments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswersCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer answercomments', async () => {
    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-comment-1'),
        // eslint-disable-next-line
      })
    )

    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-comment-1'),
        // eslint-disable-next-line
      })
    )

    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-comment-1'),
        // eslint-disable-next-line
      })
    )

    const { comments } = await sut.execute({
      answerId: 'answer-comment-1',
      page: 1,
    })

    expect(comments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer answercomments', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-comment-1'),
          // eslint-disable-next-line
        })
      )
    }

    const { comments } = await sut.execute({
      answerId: 'answer-comment-1',
      page: 2,
    })

    expect(comments).toHaveLength(2)
  })
})
