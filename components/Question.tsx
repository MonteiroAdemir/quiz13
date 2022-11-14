import styles from "../styles/Question.module.css";
import QuestionModel from "../model/question";
import Statement from "./Statement";
import Timer from "./Timer.";
import Answer from "./Answer";

const fonts = [
  { value: "A", color: "#F2C866" },
  { value: "B", color: "#F266BA" },
  { value: "C", color: "#85D4F2" },
  { value: "D", color: "#BCE596" },
];

interface QuestionProps {
  value: QuestionModel;
  responseTime?: number;
  answerProvided: (indice: number) => void;
  gameOver: () => void;
}

export default function Question(props: QuestionProps):any {
  const question = props.value;

  function renderAnswers() {
    return question.answers.map((answer, i)=> {
      return (
        <Answer
          key={`${question.id}-${i}`}
          value={answer}
          indice={i}
          font={fonts[i].value}
          fontBackgroundColor={fonts[i].color}
          answerProvided={props.answerProvided}
        />
      );
    });
  }
  return (
    <div className={styles.question}>
      <Statement text={question.statement} />
      <Timer
        key={question.id}
        duration={props.responseTime ?? 10}
        gameOver={props.gameOver}
      />
      {renderAnswers()}
    </div>
  );
}
