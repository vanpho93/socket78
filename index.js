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
  // socket.leave(socket.id, function(){
  //   console.log(socket.rooms);
  // });

  socket.on("check", function(){
    console.log(JSON.stringify(socket.rooms));
  });

  console.log(socket.rooms);
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
      socket.join(data, function(){
        console.log(socket.rooms);
      });
      socket.emit('XAC_NHAN_TAO_ROOM', {xacNhan: 1, tenRoom: data});
      io.emit('NEW_ROOM_ACCEPT', data);
    }else{
      socket.emit('XAC_NHAN_TAO_ROOM', {xacNhan: 0, tenRoom: data});
    }
  });

  socket.on('CLIENT_JOIN_ROOM', function(data){
    socket.join(data, function(){
      console.log(socket.rooms);
    });
  });

  socket.on('NEW_MESSAGE', function(data){
    console.log(data);
  });
});
