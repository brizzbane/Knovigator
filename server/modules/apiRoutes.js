const bodyParser = require('body-parser');
const Answer = require('../models/Answer');
const Quest = require('../models/Quest')


module.exports = (app) => {

	app.route('/api/answers')
    .post(bodyParser.json(), (req, res) => {
      const answer = new Answer(req.body);
      answer.save(function(err, data){
        if (err) {
          console.error(err);
          res.status(400).send(err);
        }
        res.send(data);
      });

    })
    .get((req, res) => {
      Answer.find(function(error, data){
        res.send(data)
      });
    })
    .patch(bodyParser.json(), (req, res)=>{
      Answer.findOne({_id: req.body._id})
        .exec( (err, doc) => {
          if(err) {
            console.error(err)
            res.status(400).send(err)
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




	app.route('/api/answers/:id')
    .get((req, res) => {
	    Answer.find({quest: req.params.id})
        .exec( (err, data) =>{
	        if(err) {
	          console.error(err)
            res.status(400).send(err)
          }
          res.send(data)
        })
    })
    .delete(function(req,res){
      Answer.findOne({
        _id:req.params.id
      }, function(error,doc){
        if (error) console.log(error);
        doc.remove();
        res.send(doc);
      })
    })





  app.route('/api/quests')
    .post(bodyParser.json(), (req, res)=>{
      const quest = new Quest(req.body)
      quest.save(function(err, data){
        if(err) {
          console.error(err)
          res.status(400).send(err)
        }
        res.send(data)
      })
    })
    .get((req, res) => {
	    Quest.find(function(error, data){
	      res.send(data)
      })
    })
    .patch(bodyParser.json(), (req, res)=>{
      Quest.findOne({_id: req.body._id})
        .exec( (err, doc) => {
          if(err) {
            console.error(err)
            res.status(400).send(err)
          }
          for (let key in req.body) {
            doc[key] = req.body[key];
          }
          doc.save();
          res.send(doc)
        })
    })



    app.route('/api/quest/:id')
      .get((req, res) => {
        Quest.findOne({_id: req.params.id})
          .exec( (err, data) =>{
            if(err) {
              console.error(err)
              res.status(400).send(err)
            }
            res.send(data)
          })
      })

    app.route('/api/quests/:id')
      .get((req, res) => {
        Quest.find({parent: req.params.id})
          .exec( (err, data) =>{
            if(err) {
              console.error(err)
              res.status(400).send(err)
            }
            res.send(data)
          })
      })


}