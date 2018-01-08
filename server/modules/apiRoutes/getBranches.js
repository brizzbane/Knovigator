const Answer = require('../../models/Answer');
const Quest = require('../../models/Quest')


export default function getBranches (req, res) {

  const lookupBranches = new Promise((resolve, reject) => {
    Quest.find({parent: req.params.id})
      .exec( (err, quests) =>{
        if(err) {
          console.error(err)
          reject(err)
        }

        let hasComments = false

        quests.forEach( quest => {
          if(quest.title === 'Comments:') {
            hasComments = true
          }

          if(quest.highlightedAnswer) {
            Answer.findOne({_id: quest.highlightedAnswer})
              .exec( (err, answer) =>{
                if(err) {
                  console.error(err)
                  reject(err)
                }

                quest._doc.highlightedAnswerDetails = answer._doc
              })
          }
        })

        if(!hasComments) {
          new Quest({
            author: 'systemAdmin',
            title: 'Comments:',
            parent: req.params.id
          })
            .save(function(err, savedQuest){
              if(err) {
                console.error(err)
                reject(err)
              }
              quests.push(savedQuest)
            })
        }

        resolve(quests)
      })
  })

  const lookupParent = new Promise((resolve, reject) => {
    Answer.findOne({_id: req.params.id})
      .exec( (err, answer) =>{
        if(err) {
          console.error(err)
          reject(err)
        }

        Quest.findOne({_id: answer.quest})
          .exec( (err, quest) =>{
            if(err) {
              console.error(err)
              reject(err)
            }

            answer._doc.questDetails = quest._doc
            resolve(answer)
          })
      })
  })

  Promise.all([lookupBranches, lookupParent])
    .then( data => res.send({
      branches: data[0],
      parent: data[1]
    }))
    .catch( e => res.status(500).send(e))
}