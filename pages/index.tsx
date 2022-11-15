import { useEffect, useState } from "react";
import QuestionModel from "../model/question";
import Quiz from "../components/Quiz";
import { useRouter } from "next/router";
import { idText } from "typescript";

const BASE_URL = "http://localhost:3000/api";

export default function Home() {
  const router = useRouter();

  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [question, setQuestion] = useState<QuestionModel>();
  const [rightAnswers, setRightAnswers] = useState<number>(0);

  async function loadQuestionIds() {
    const answer = await fetch(`${BASE_URL}/quiz`);
    const questionIds = await answer.json();
    setQuestionIds(questionIds);
  }

  async function loadQuestion(idQuestion: number) {
    const answer = await fetch(`${BASE_URL}/questions/${idQuestion}`);
    const json = await answer.json();
    const newQuestion = QuestionModel.createUsingObject(json);
    setQuestion(newQuestion);
  }
  useEffect(() => {
    loadQuestionIds();
  }, []);

  useEffect(() => {
    questionIds.length > 0 && loadQuestion(questionIds[0]);
  }, [questionIds]);

  function answeredQuestion(answeredQuestion: QuestionModel) {
    setQuestion(answeredQuestion);

    const answeredCorrectly = answeredQuestion.answeredCorretly;
    setRightAnswers(rightAnswers + (answeredCorrectly ? 1 : 0));
  }

  function nextQuestionId() {
    const nextIndice = questionIds.indexOf(question.id) + 1;
    return questionIds[nextIndice];
  }

  function nextStep() {
    const nextId = nextQuestionId();
    nextId ? nextQuestion(nextId) : finish();
  }

  function nextQuestion(nextId: number) {
    loadQuestion(nextId);
  }

  function finish() {
    router.push({
      pathname: "/result",
      query: {
        total: questionIds.length,
        right: rightAnswers,
      },
    })
  }

  return question ? (
    <Quiz
      question={question}
      last={nextQuestionId() === null}
      answeredQuestion={answeredQuestion}
      nextStep={nextStep}
    />
  ) : (
    false
  );
}
