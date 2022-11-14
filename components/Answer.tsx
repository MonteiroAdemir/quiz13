import styles from "../styles/Answer.module.css";
import AnswerModel from "../model/answer";

interface AnswerProps {
  
  value: AnswerModel;
  indice: number;
  font: string;
  fontBackgroundColor: string;
  answerProvided: (indice: number) => void;
}
export default function Answer(props: AnswerProps) {
  const answer = props.value;
  const answerRevealed = answer.revealed ? styles.answerRevealed : "";
  return (
    <div
      className={styles.answer}
      onClick={() => props.answerProvided(props.indice)}
    >
      <div className={`${answerRevealed} ${styles.contentAnswer}`}>
        <div className={styles.front}>
          <div
            className={styles.font}
            style={{ backgroundColor: props.fontBackgroundColor }}
          >
            {props.font}
          </div>

          <div className={styles.value}>{answer.value}</div>
        </div>
        <div className={styles.verse}>
          {answer.right ? (
            <div className={styles.right}>
              <div>The answer correct is...</div>
              <div className={styles.value}>{answer.value}</div>
            </div>
          ) : (
            <div className={styles.wrong}>
              <div>the answer is wrong...</div>
              <div className={styles.value}>{answer.value}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
