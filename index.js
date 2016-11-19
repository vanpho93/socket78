var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
server.listen(3000);

app.get('/', function(req, res){
  res.render('homepage');
});

io.on('connection', function(socket){
  console.log('Ket noi thanh cong');
});
