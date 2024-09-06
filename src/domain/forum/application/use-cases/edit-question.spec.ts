import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      // eslint-disable-next-line
      new UniqueEntityId('question-1')
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'test question',
      content: 'test content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'test question',
      content: 'test content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      // eslint-disable-next-line
      new UniqueEntityId('question-1')
    )

    inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'test question',
        content: 'test content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
