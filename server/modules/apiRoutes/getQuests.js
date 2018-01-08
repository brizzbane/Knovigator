const Answer = require('../../models/Answer');
const Quest = require('../../models/Quest')


export default function getQuests (req, res) {

  Quest.find(function(err, allQuests){
    if(err) {
      console.error(err)
      res.status(500).send(err)
    }

    Promise.all(allQuests.map( quest => {
      const {parent, highlightedAnswer} = quest._doc

      return new Promise((resolve, reject) => {

        if(!parent && !highlightedAnswer) {
          resolve(quest)

        } else {
          const lookupParent = parent ? new Promise((resolve, reject) => {
            Answer.findOne({_id: parent})
              .exec( (err, answer) =>{
                if(err) {
                  console.error(err)
                  reject(err)
                }

                Quest.findOne({_id: answer.quest})
                  .exec( (err, answerQuest) =>{
                    if(err) {
                      console.error(err)
                      reject(err)
                    }
                    answer._doc.questDetails = answerQuest._doc
                    quest._doc.parentDetails = answer._doc
                    resolve()
                  })
              })
          }) : null

          const lookupHighlightedAnswer = highlightedAnswer ? new Promise((resolve, reject) => {
            Answer.findOne({_id: highlightedAnswer})
              .exec( (err, answer) =>{
                if(err) {
                  console.error(err)
                  reject(err)
                }

                if(answer) {
                  quest._doc.highlightedAnswerDetails = answer._doc
                }

                resolve()
              })
          }) : null

          Promise.all([lookupParent, lookupHighlightedAnswer])
            .then( () => resolve(quest))
            .catch( e => reject(e))
        }
      })
    }))
      .then( updatedData => res.send(updatedData))
      .catch( e => res.status(500).send(e))
  })
}
