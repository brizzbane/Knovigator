const bodyParser = require('body-parser');
const Answer = require('../../models/Answer');
const Quest = require('../../models/Quest')
const getQuests = require('./getQuests').default
const getBranches = require('./getBranches').default


module.exports = (app) => {

  //api.postAnswer
  app.route('/api/postAnswer')
    .post(bodyParser.json(), (req, res) => {

      new Answer(req.body).save(function(err, savedAnswer){
        if (err) {
          console.error(err);
          res.status(500).send(err);
        }

        Quest.findOne({_id: req.body.quest})
          .exec( (err, quest) => {
            if(err) {
              console.error(err)
              res.status(500).send(err)
            }

            quest.highlightedAnswer = savedAnswer._doc._id;
            quest.save();
            res.send(savedAnswer)
          })
      });

    })



  //api.editAnswer
  app.route('/api/editAnswer')
    .patch(bodyParser.json(), (req, res)=>{
      Answer.findOne({_id: req.body._id})
        .exec( (err, doc) => {
          if(err) {
            console.error(err)
            res.status(500).send(err)
          }
          for (let key in req.body) {
            if(Array.isArray(doc[key])) {
              doc[key].push(req.body[key])
            } else {
              doc[key] = req.body[key]
            }
          }
          doc.save();
          res.send(doc)
        })
    })





  //api.getAnswers
	app.route('/api/getAnswers/:id')
    .get((req, res) => {
	    Answer.find({quest: req.params.id})
        .exec( (err, data) =>{
	        if(err) {
	          console.error(err)
            res.status(500).send(err)
          }
          res.send(data)
        })
    })




  //api.deleteAnswer
  app.route('/api/deleteAnswer/:id')
    .delete(function(req,res){
      Answer.remove({
        _id:req.params.id
      }, function(error,doc){
        if (error) {
          console.error(error);
          res.status(500).send(error)
        } else {
          res.status(200).send();
        }
      })
      Quest.remove({parent: req.params.id}, function (error, doc) {
        if (error) {
          console.error(error)
        }
      })
    })


  //api.deleteQuest
  app.route('/api/deleteQuest/:id')
    .delete(function(req,res){
      Quest.remove({
        _id:req.params.id
      }, function(error, doc){
        if (error) {
          res.status(500).send(error)
          console.log(error);
        } else {
          res.status(200).send();
        }
      })
      Answer.remove({
        quest: req.params.id
      }, function (error, doc) {
        if(error) {
          console.error(error)
        }
      })
    })



  //api.postQuest
  app.route('/api/postQuest')
    .post(bodyParser.json(), (req, res)=>{
      const quest = new Quest(req.body)
      quest.save(function(err, savedQuest){
        if(err) {
          console.error(err)
          res.status(500).send(err)
        }

        Answer.findOne({_id: req.body.parent})
          .exec( (err, answer) => {
            if(err) {
              console.error(err)
              res.status(500).send(err)
            }
            answer.branches.push(savedQuest._id)
            answer.save();
            res.send(savedQuest)
          })
      })
    })



  //api.getQuests
  app.route('/api/getQuests')
    .get(getQuests)



  //api.editQuest
  app.route('/api/editQuest')
    .patch(bodyParser.json(), (req, res)=>{
      Quest.findOne({_id: req.body._id})
        .exec( (err, doc) => {
          if(err) {
            console.error(err)
            res.status(500).send(err)
          }
          for (let key in req.body) {
            doc[key] = req.body[key];
          }
          doc.save();
          res.send(doc)
        })
    })



  //api.questQuery
  app.route('/api/questQuery/:id')
    .get((req, res) => {
      Quest.findOne({_id: req.params.id})
        .exec( (err, quest) =>{
          if(err) {
            console.error(err)
            res.status(500).send(err)
          }

          if(quest.parent) {
            Answer.findOne({_id: quest.parent})
              .exec( (err, answer) =>{
                if(err) {
                  console.error(err)
                  return res.status(500).send(err)
                }

                Quest.findOne({_id: answer.quest})
                  .exec( (err, parentQuest) =>{
                    if(err) {
                      console.error(err)
                      return res.status(500).send(err)
                    }
                    answer._doc.questDetails = parentQuest._doc
                    quest._doc.parentDetails = answer._doc
                  })
              })
          }

          res.send(quest)
        })
    })




  //api.getBranches
  app.route('/api/getBranches/:id')
    .get(getBranches)




  //api.getParent
  app.route('/api/getParent/:id')
    .get((req, res) => {
      Answer.findOne({_id: req.params.id})
        .exec( (err, answer) =>{
          if(err) {
            console.error(err)
            return res.status(500).send(err)
          }

          Quest.findOne({_id: answer.quest})
            .exec( (err, quest) =>{
              if(err) {
                console.error(err)
                return res.status(500).send(err)
              }
              answer._doc.questDetails = quest._doc
              res.send(answer)
            })
        })
    })


}