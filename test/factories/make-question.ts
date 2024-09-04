import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (
  overrides: Partial<QuestionProps> = {},
  // eslint-disable-next-line
  id?: UniqueEntityId
) => {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overrides,
    },
    // eslint-disable-next-line
    id
  )

  return question
}
