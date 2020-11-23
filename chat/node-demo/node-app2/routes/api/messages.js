// @login & register
const express = require('express')
const router = express.Router()
const passport = require('passport')

const Message = require('../../models/Message')


// $route  POST api/messages/addmsg
// @desc   添加消息记录
// @access private
router.post('/addmsg', passport.authenticate('jwt', { session: false }), (req, res) => {
  const messageFields = {};
  // 判断用户是否存在
  Message.findOne({ target: req.body.target, user_id: req.body.user_id })
    .then(message => {
      if (!message) {
        if (req.body.target) messageFields.target = req.body.target;
        if (req.body.user_id) messageFields.user_id = req.body.user_id;
        messageFields.count = req.body.count;
        if (req.body.message) messageFields.message = req.body.message;
        new Message(messageFields).save().then(message => res.json(message));
      }
      else {
        message.message = req.body.message;
        message.count = req.body.count;
        message.save().then(message => res.json(message));
      }
    })


})

// $route  GET api/messages/msg/:user_id
// @desc   获取用户的所有消息记录
// @access private
router.get('/msg/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Message.find()
    .then(messages => {
      if (!messages) {
        errors.nomessage = "没有任何消息";
        res.status(404).json(errors);
      }
      let result = messages.filter(message => {
        return message.user_id == req.params.user_id
      })
      res.json(result);
    })
    .catch(err => res.status(404).json(err));
})

module.exports = router