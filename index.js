var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
server.listen(3000);

var arrayUsername = [];
var arrayRoom = [];
app.get('/', function(req, res){
  res.render('homepage');
});

io.on('connection', function(socket){
  socket.on('NEW_USERNAME', function(data){
    if(arrayUsername.indexOf(data) == -1){
      arrayUsername.push(data);
      socket.emit('XAC_NHAN_DANG_KY', 1);
    }else{
      socket.emit('XAC_NHAN_DANG_KY', 0);
    }
  });

  socket.on('NEW_ROOM', function(data){
    if(arrayRoom.indexOf(data) == -1){
      arrayRoom.push(data);
      socket.emit('XAC_NHAN_TAO_ROOM', {xacNhan: 1, tenRoom: data});
    }else{
      socket.emit('XAC_NHAN_TAO_ROOM', {xacNhan: 0, tenRoom: data});
    }
  });
});
