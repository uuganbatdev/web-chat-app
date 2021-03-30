const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let userNames = [];

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
	  fs.appendFile('chatLogs.txt', `\n${msg.userName}: ${msg.msg}   // Date: ${new Date()}`, (err) => {
		  if(err) console.log(err);
		  console.log('chat logged')
	  })
  });
	socket.on('add username', (userName) => {
		userNames.push(userName);
		socket.emit('update user list', userNames);
	})
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
