import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'test content',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'test content'
    )
  })
})
