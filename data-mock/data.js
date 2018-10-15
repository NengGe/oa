var express = require('express')
var router = express.Router()

// 增加会议
router.post('/Api/AddMeetting', function (req, res) {
  res.send({ 'status': 200, 'message': 'ok', 'result': { 'result': 0 } })
})

// 会议查询
router.get('/Api/GetRelates', function (req, res) {
  res.send({
    'status': 200,
    'message': 'ok',
    'result': {
      'RL': [{
        'id': '295',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"},{"user_name":"王耿","user_id":"2","sort":"2"},{"user_name":"j","user_id":"3","sort":"3"}],"NF":[{"user_name":"gary","user_id":"1"},{"user_name":"gary","user_id":"2"},{"user_name":"gary","user_id":"3"},{"user_name":"gary","user_id":"4"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-28T19:08:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '296',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"},{"user_name":"王耿","user_id":"2","sort":"2"},{"user_name":"j","user_id":"3","sort":"3"}],"NF":[{"user_name":"gary","user_id":"1"},{"user_name":"gary","user_id":"2"},{"user_name":"gary","user_id":"3"},{"user_name":"gary","user_id":"4"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-28T19:08:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '297',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"},{"user_name":"王耿","user_id":"2","sort":"2"},{"user_name":"j","user_id":"3","sort":"3"}],"NF":[{"user_name":"gary","user_id":"1"},{"user_name":"gary","user_id":"2"},{"user_name":"gary","user_id":"3"},{"user_name":"gary","user_id":"4"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-28T19:14:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '298',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"},{"user_name":"王耿","user_id":"2","sort":"2"},{"user_name":"j","user_id":"3","sort":"3"}],"NF":[{"user_name":"gary","user_id":"1"},{"user_name":"gary","user_id":"2"},{"user_name":"gary","user_id":"3"},{"user_name":"gary","user_id":"4"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-28T19:16:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '299',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:21:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '300',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:28:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '301',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:30:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '302',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:45:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '303',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:46:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '304',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:51:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '305',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:54:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '306',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:56:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '307',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T09:59:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '308',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:03:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '309',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:13:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '310',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:14:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '311',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"1","sort":"1"}],"NF":[{"user_name":"gary","user_id":"1"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary","user_id":"1"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:18:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '312',
        'type': '2',
        'json': '{"title":"会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"会议内容","url":[{"type":"1","url":"www.caidi.com","name":"文件名"},{"type":"2","url":"www.com","name":"文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:19:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '313',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:21:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '314',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:24:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '315',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T10:25:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '316',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T11:08:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '317',
        'type': '2',
        'json': '{"title":"test1会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T11:52:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '318',
        'type': '2',
        'json': '{"title":"test1会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T11:54:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '319',
        'type': '2',
        'json': '{"title":"test1会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T11:56:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '320',
        'type': '2',
        'json': '{"title":"test1会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T11:59:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '321',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T14:31:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '322',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T14:32:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '323',
        'type': '2',
        'json': '{"title":"关于语文教研研讨会议","start_time":"2017-09-11 09:26:00","end_time":"2017-09-11 10:26:00","content":"请收到本通知的人员，于9月11号09:00前到A03会议室参加教研研讨会，请带上纸笔。会议议题如下：","url":null,"AR":null,"NF":null,"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"南校区智囊团会议室","AS":null,"push_type":"0"}',
        'created_time': '2017-11-29T14:51:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '324',
        'type': '2',
        'json': '{"title":"关于语文教研研讨会议","start_time":"2017-09-11 09:26:00","end_time":"2017-09-11 10:26:00","content":"请收到本通知的人员，于9月11号09:00前到A03会议室参加教研研讨会，请带上纸笔。会议议题如下：","url":null,"AR":null,"NF":null,"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"南校区智囊团会议室","AS":null,"push_type":"0"}',
        'created_time': '2017-11-29T14:52:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '325',
        'type': '2',
        'json': '{"title":"关于语文教研研讨会议","start_time":"2017-09-11 09:26:00","end_time":"2017-09-11 10:26:00","content":"请收到本通知的人员，于9月11号09:00前到A03会议室参加教研研讨会，请带上纸笔。会议议题如下：","url":null,"AR":null,"NF":null,"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"南校区智囊团会议室","AS":null,"push_type":"0"}',
        'created_time': '2017-11-29T14:52:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '326',
        'type': '2',
        'json': '{"title":"关于语文教研研讨会议","start_time":"2017-09-11 09:26:00","end_time":"2017-09-11 10:26:00","content":"请收到本通知的人员，于9月11号09:00前到A03会议室参加教研研讨会，请带上纸笔。会议议题如下：","url":null,"AR":null,"NF":null,"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"南校区智囊团会议室","AS":null,"push_type":"0"}',
        'created_time': '2017-11-29T14:54:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '327',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T15:26:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '329',
        'type': '2',
        'json': '{"title":"关于语文教研研讨会议","start_time":"2017-11-29 09:26:00","end_time":"2017-11-29 10:26:00","content":"请收到本通知的人员，于9月11号09:00前到A03会议室参加教研研讨会，请带上纸笔。会议议题如下：","url":null,"AR":null,"NF":null,"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"南校区智囊团会议室","AS":null,"push_type":"0"}',
        'created_time': '2017-11-29T16:21:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '333',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T16:52:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '334',
        'type': '2',
        'json': '{"title":"test会议标题","start_time":"2017-01-02 14:26:00","end_time":"2017-01-02 18:26:00","content":"test会议内容","url":[{"type":"1","url":"www.caidi.com","name":"test文件名"},{"type":"2","url":"www.com","name":"test文件名"}],"AR":[{"user_name":"gary","user_id":"451872","sort":"1"}],"NF":[{"user_name":"gary2","user_id":"456633"}],"user_id":"451872","user_name":"SDTom","summary":"test会议纪要","address":"test会议地址","AS":[{"user_name":"gary2","user_id":"456633"}],"push_type":"0"}',
        'created_time': '2017-11-29T16:53:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }, {
        'id': '335',
        'type': '2',
        'json': '{"title":"111111关于语文教研研讨会议","start_time":"2017-11-29 09:26:00","end_time":"2017-11-29 10:26:00","content":"请收到本通知的人员，于9月11号09:00前到A03会议室参加教研研讨会，请带上纸笔。会议议题如下：","url":null,"AR":null,"NF":null,"user_id":"451872","user_name":"SDTom","summary":"会议纪要","address":"南校区智囊团会议室","AS":null,"push_type":"0"}',
        'created_time': '2017-11-29T16:56:00+08:00',
        'status': '1',
        'readys': '0',
        'cur_user_id': '0'
      }]
    }
  }
  )
})

//
router.get('/schoolorg/v1/getDeptAndMemberLists/:id', function (req, res) {
  console.log(req.params.id)
  let all = [{
    'dept_list': [ // 子部门列表
      {
        'id': '1',
        'tree_id': '5187489047437737282,5215494028518263026',
        'name': '特殊',
        'parent_id': '5491305326378024377',
        'level': '3',
        'path': '5004897902349720496/5491305326378024377/4842934768252247118',
        'display_order': '1'
      }
    ],
    'member_list': [ // 人员列表
      {
        'dept_id': '5491305326378024317',
        'teacher_id': '4617533461485780370',
        'user_id': '421719',
        'name': '张三',
        'is_major': 'false',
        'display_order': '0'
      },
      {
        'dept_id': '5491305326378024327',
        'teacher_id': '4618442736520958353',
        'user_id': '394349',
        'name': '李四',
        'is_major': 'false',
        'display_order': '0'
      },
      {
        'dept_id': '5491305326378024337',
        'teacher_id': '4627535207449571813',
        'user_id': '444703',
        'name': '王五',
        'is_major': 'false',
        'display_order': '0'
      }
    ]
  }, {
    'dept_list': [
      {
        'id': '2',
        'tree_id': '5187489047437737282,5215494028518263026',
        'name': 'qq2',
        'parent_id': '5491305326378024377',
        'level': '3',
        'path': '5004897902349720496/5491305326378024377/5385194709665693900',
        'display_order': '2'
      }
    ],
    'member_list': [ // 人员列表
      {
        'dept_id': '5491305326378024371',
        'teacher_id': '4617533461485780370',
        'user_id': '421711',
        'name': '张三',
        'is_major': 'false',
        'display_order': '0'
      },
      {
        'dept_id': '5491305326378024372',
        'teacher_id': '4618442736520958353',
        'user_id': '394342',
        'name': '李四',
        'is_major': 'false',
        'display_order': '0'
      },
      {
        'dept_id': '5491305326378024373',
        'teacher_id': '4627535207449571813',
        'user_id': '444704',
        'name': '王五',
        'is_major': 'false',
        'display_order': '0'
      }
    ]
  }, {
    'dept_list': [],
    'member_list': [ // 人员列表
      {
        'dept_id': '5491305326378024371',
        'teacher_id': '4617533461485780370',
        'user_id': '421711',
        'name': '张三',
        'is_major': 'false',
        'display_order': '0'
      },
      {
        'dept_id': '5491305326378024372',
        'teacher_id': '4618442736520958353',
        'user_id': '394342',
        'name': '李四',
        'is_major': 'false',
        'display_order': '0'
      },
      {
        'dept_id': '5491305326378024373',
        'teacher_id': '4627535207449571813',
        'user_id': '444704',
        'name': '王五',
        'is_major': 'false',
        'display_order': '0'
      }
    ]
  }]
  setTimeout(() => {
    res.send({
      'status': 200,
      'message': 'ok',
      'result': {
        data: all[req.params.id]
      }
    })
  }, 300)
})

router.get('/mobicampus/assets/v1/gettypelist', function (req, res) {
  res.send(require('./data-assets-type'))
})

// 所有部门人员
router.get('/schoolorg/v1/getDeptsWithMemberList', function (req, res) {
  res.send(
    { 'status': 200, 'message': 'ok', 'result': { 'data': [{ 'id': '4727807785392167089', 'name': '课程研究中心', 'path': '4727807785392167089', 'path_names': '课程研究中心', 'member_list': [{ 'dept_id': '4727807785392167089', 'teacher_id': '4614973062978602400', 'user_id': '492635', 'name': '毕晓东', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4615949843892209473', 'user_id': '492597', 'name': '凌宸', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4621722187974587190', 'user_id': '492594', 'name': '黄惠敏', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4622949705973563951', 'user_id': '492522', 'name': '杨洪', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4624912501294295618', 'user_id': '512547', 'name': '杨成军', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4628012438345698752', 'user_id': '492726', 'name': '周晓兰', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4645776768126464751', 'user_id': '492691', 'name': '胡洁婷', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4664099303286867574', 'user_id': '492752', 'name': '卓  丹', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4684679233318961748', 'user_id': '492623', 'name': '胡雅', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4690689923820584789', 'user_id': '492671', 'name': '林谨', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4698709036520343324', 'user_id': '455591', 'name': '数学科组长', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '4699295533808394739', 'user_id': '492742', 'name': '王磊', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '5436459486400808072', 'user_id': '455846', 'name': '王锐', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '5533766038479454957', 'user_id': '455596', 'name': '潘倩', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '5539512782090925094', 'user_id': '455847', 'name': '李本', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '5608824680312004624', 'user_id': '455849', 'name': '胡联理', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4727807785392167089', 'teacher_id': '5725803271800206709', 'user_id': '455851', 'name': '李赵伟', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '4931362918049192454', 'name': '学校发展中心', 'path': '4931362918049192454', 'path_names': '学校发展中心', 'member_list': [{ 'dept_id': '4931362918049192454', 'teacher_id': '4649993119736771613', 'user_id': '492681', 'name': '代梅花', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4931362918049192454', 'teacher_id': '4650325081869844451', 'user_id': '492769', 'name': '周洪岩', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4931362918049192454', 'teacher_id': '4801024884635059087', 'user_id': '455593', 'name': '数学老师B', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4931362918049192454', 'teacher_id': '4832556170644302677', 'user_id': '455544', 'name': '学校管理员', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4931362918049192454', 'teacher_id': '4937950497372925934', 'user_id': '455587', 'name': '张浩然', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4931362918049192454', 'teacher_id': '4970188195674541161', 'user_id': '455589', 'name': '罗帅', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4931362918049192454', 'teacher_id': '5322344193008064967', 'user_id': '455590', 'name': '语文老师B', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '5261426194692660360', 'name': '办公室', 'path': '4931362918049192454/5261426194692660360', 'path_names': '学校发展中心/办公室', 'member_list': [{ 'dept_id': '5261426194692660360', 'teacher_id': '0', 'user_id': '0', 'name': '', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '5383097854779599015', 'name': '校长室', 'path': '4931362918049192454/5383097854779599015', 'path_names': '学校发展中心/校长室', 'member_list': [{ 'dept_id': '5383097854779599015', 'teacher_id': '0', 'user_id': '0', 'name': '', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '5317454385503830767', 'name': '教师发展中心', 'path': '5317454385503830767', 'path_names': '教师发展中心', 'member_list': [{ 'dept_id': '5317454385503830767', 'teacher_id': '4655129449633387340', 'user_id': '492596', 'name': '康姝倩', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5317454385503830767', 'teacher_id': '4659723770581477843', 'user_id': '492712', 'name': '吴衍香', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5317454385503830767', 'teacher_id': '4671939584393414827', 'user_id': '492624', 'name': '谢沁燕', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5317454385503830767', 'teacher_id': '4674973199099000859', 'user_id': '492674', 'name': '官秀珍', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5317454385503830767', 'teacher_id': '4937950497372925934', 'user_id': '455587', 'name': '语文科组长', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5317454385503830767', 'teacher_id': '4970188195674541161', 'user_id': '455589', 'name': '罗帅', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '4686192761008088649', 'name': '教师三部', 'path': '5317454385503830767/4686192761008088649', 'path_names': '教师发展中心/教师三部', 'member_list': [{ 'dept_id': '4686192761008088649', 'teacher_id': '0', 'user_id': '0', 'name': '', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '4741259121837820896', 'name': '教师二部', 'path': '5317454385503830767/4741259121837820896', 'path_names': '教师发展中心/教师二部', 'member_list': [{ 'dept_id': '4741259121837820896', 'teacher_id': '5142171535450874508', 'user_id': '455857', 'name': '高中老师', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4741259121837820896', 'teacher_id': '5157333180061579391', 'user_id': '455854', 'name': '英语老师1', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4741259121837820896', 'teacher_id': '5238752956872648540', 'user_id': '455848', 'name': '语文老师1', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '4972082705249806424', 'name': '教师四部', 'path': '5317454385503830767/4972082705249806424', 'path_names': '教师发展中心/教师四部', 'member_list': [{ 'dept_id': '4972082705249806424', 'teacher_id': '5495241734322580744', 'user_id': '455592', 'name': '数学老师A', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4972082705249806424', 'teacher_id': '5500909182730993216', 'user_id': '455852', 'name': '数学老师2', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '4972082705249806424', 'teacher_id': '5533766038479454957', 'user_id': '455596', 'name': '英语老师B', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }, { 'id': '5145120472606055759', 'name': '教师一部', 'path': '5317454385503830767/5145120472606055759', 'path_names': '教师发展中心/教师一部', 'member_list': [{ 'dept_id': '5145120472606055759', 'teacher_id': '5157333180061579391', 'user_id': '455854', 'name': '英语老师1', 'is_major': 'true', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5145120472606055759', 'teacher_id': '5238752956872648540', 'user_id': '455848', 'name': '语文老师1', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }, { 'dept_id': '5145120472606055759', 'teacher_id': '5333624844335330216', 'user_id': '455595', 'name': '英语老师A', 'is_major': 'false', 'display_order': '0', 'state': '0', 'is_deleted': 'false' }] }] } }
  )
})

// 行为制度
router.get('/palm/v2/rules', function (req, res) {
  res.send({
    "status": 200,
    "message": "ok",
    "result": {
      "classAllRules": [
        {
          "rule_id": "234",
          "rule_name": "卫生减分",
          "rule_type": "2",
          "class_id": "5015483610072272084"
        }
      ],
        "classRules": [ //班级行为列表
        {
          "class_id": "5015483610072272084",
          "rule_id": "234",
          "rule_name": "卫生减分",
          "rule_type": "2",
          "item_id": "1265",
          "parentItem_id": "0",
          "item_name": "带食物进教室",
          "score": "-1.5"
        }
      ],
      "schoolAllRules": [    //学校行为第一级列表
        {
          "rule_id": "39",
          "rule_name": "礼仪规范",
          "rule_type": "1",
          "period_id": "1003"
        },
        {
          "rule_id": "113",
          "rule_name": "宿舍常规管理",
          "rule_type": "5",
          "period_id": "1003"
        },
        {
          "rule_id": "138",
          "rule_name": "考试规范管理",
          "rule_type": "1",
          "period_id": "1003"
        },
        {
          "rule_id": "-1",
          "rule_name": "班级自我管理",
          "rule_type": "-1",
          "period_id": "0"
        },
        {
          "rule_id": "-2",
          "rule_name": "学校德育管理",
          "rule_type": "-2",
          "period_id": "0"
        },
        {
          "rule_id": "-3",
          "rule_name": "掌上班级",
          "rule_type": "-3",
          "period_id": "0"
        }
      ],
      "schoolRules": [   //学校行为列表（包含多级行为）
        {
          "class_id": "0",
          "rule_id": "39",
          "rule_name": "礼仪规范",
          "rule_type": "1",
          "item_id": "181",
          "parentItem_id": "0",
          "item_name": "仪表",
          "score": "-1",
          "period_id": "1003"
        }
      ]
    }
  })
})

module.exports = router
