import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      // eslint-disable-next-line
      new UniqueEntityId('answer-1')
    )

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'test content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'test content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      // eslint-disable-next-line
      new UniqueEntityId('answer-1')
    )

    inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: 'author-2',
        content: 'test content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
