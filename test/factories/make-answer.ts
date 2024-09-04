import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

export const makeAnswer = (
  overrides: Partial<AnswerProps> = {},
  // eslint-disable-next-line
  id?: UniqueEntityId
) => {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overrides,
    },
    // eslint-disable-next-line
    id
  )

  return answer
}
