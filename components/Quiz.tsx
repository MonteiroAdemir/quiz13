import styles from "../styles/Quiz.module.css";
import QuestionModel from "../model/question";
import Question from "./Question";
import Button from "./Button";

interface QuizProps {
  question: QuestionModel;
  last: boolean;
  answeredQuestion: (question: QuestionModel) => void;
  nextStep: () => void;
}

export default function Quiz(props: QuizProps) {

  function answerProvided(indice: number) {
    if(props.question.notAnswered) {
      props.answeredQuestion(props.question.answerWith(indice));
    }
  }

  return (
    <div className={styles.quiz}>
      {props.question ? 
        <Question
          value={props.question}
          responseTime={8}
          answerProvided=
          {answerProvided}
          gameOver={props.
          nextStep}/>
      :false
      }
      <Button
        onClick={props.nextStep}
        text={props.last ? "GameOver" : "Next"}
      />
    </div>
  );
}
