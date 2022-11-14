import questions from './questionBank'

export default function questionsforId(req:any, res:any){
  const idSelected = +req.query.id

  const unicSelectedQuestion = questions.filter(question => question.id === idSelected)

  if(unicSelectedQuestion.length === 1) {
     const selectedQuestion = 
     unicSelectedQuestion[0].shuffleAnswers()
     res.status(200).json(selectedQuestion.
     toObject())
  } else {
    res.status(204).send()
  }
}