import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

export const makeAnswerComment = (
  overrides: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId
) => {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overrides,
    },
    id
  )

  return answerComment
}
