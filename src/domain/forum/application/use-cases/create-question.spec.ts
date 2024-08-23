import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'
import { QuestionsRepository } from '../repositories/question-repository'

const fakeAnswersRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const createQuestionQuestion = new CreateQuestionUseCase(
    // eslint-disable-next-line
    fakeAnswersRepository
  )

  const { question } = await createQuestionQuestion.execute({
    authorId: '1',
    title: 'question title',
    content: 'question content',
  })

  expect(question.id).toBeTruthy()
})
