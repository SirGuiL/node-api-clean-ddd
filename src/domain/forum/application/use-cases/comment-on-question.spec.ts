import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'test content',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'test content'
    )
  })
})
