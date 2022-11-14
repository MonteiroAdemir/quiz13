import { shuffle } from "../functions/arrays";
import AnswerModel from "./answer";

export default class QuestionModel {
  
  //atributos
  #id: number;
  #statement: string;
  #answers: AnswerModel[];
  #answeredCorrectly: boolean;
  //#respondida: boolean

  constructor(
    
    id: any,
    statement: string,
    answers: AnswerModel[],
    answeredCorrectly = false
  ) {
    //Métodos get
    this.#id = id;
    this.#statement = statement;
    this.#answers = answers;
    this.#answeredCorrectly = answeredCorrectly;
  }
  get id() {
    return this.#id;
  }
  get statement() {
    return this.#statement;
  }
  get answers() {
    return this.#answers;
  }
  get answeredCorretly() {
    return this.#answeredCorrectly;
  }
  get notAnswered() {
    return !this.answered;
  }
  get answered() {
    for (let answer of this.#answers) {
      if (answer.revealed) return true;
    }
    return false;
  }
  answerWith(indice: number): QuestionModel {
    const answeredCorretly = this.#answers[indice]?.right;
    const answers = this.#answers.map((answer, i) => {
      const selectedAnswer = indice === i;
      const mustReveal = selectedAnswer || answer.right;
      return mustReveal ? answer.toreveal() : answer;
    });
    return new QuestionModel(
    
      this.id,
      this.statement,
      answers,
      answeredCorretly
    )
  }
  shuffleAnswers(): QuestionModel {
    let scrambledAnswers = shuffle(this.#answers);
    return new QuestionModel(
      this.#id,
      this.#statement,
      scrambledAnswers,
      this.#answeredCorrectly
    );
  }
  static createUsingObject(obj: QuestionModel): QuestionModel {
    
    const answers = obj.answers.map((answer) =>
      AnswerModel.createUsingObject(answer));
    return new QuestionModel(
      obj.id,
      obj.statement,
      answers,
      obj.answeredCorretly);
  }

  toObject() {
    return {
    
      id: this.#id,
      statement: this.#statement,
      answered: this.answered,
      answeredCorrectly: this.#answeredCorrectly,
      answers: this.#answers.map((answer) => answer.toObject()),
    };
  }
}

//Com foi implementado a FiXMe  método.  Depois de Criado o asnwer.ts - foi importado dentro de resposta como answerModel e no get respodido foi criado um for(let answer of this.#revealed){if (answer.revealed)return true} return false.
