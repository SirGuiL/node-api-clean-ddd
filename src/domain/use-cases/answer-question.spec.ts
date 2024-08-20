import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "answer content",
  });

  expect(answer.content).toEqual("answer content");
});
