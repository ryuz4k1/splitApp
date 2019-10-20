let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);


var mysql = require('mysql');
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "helloworld"
});

app.use(function(req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.post("/addpost1",function(req,res){
    console.log(req);
    con.connect(function(err) {
        console.log("Connected!");
        var sql = "INSERT INTO chat (sender,receiver,message) VALUES ('"+req.body.sender+"', '"+req.body.receiver+"','"+req.body.message+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
});


// Set up route
app.get('/hello', (req, res) =>
{
    res.json({ message: 'hello world' });
});

io.on('connection', (socket) => {

    socket.on('disconnect', function(){
        io.emit('users-changed', {user: socket.nickname, event: 'left'});
    });

    socket.on('set-nickname', (nickname) => {
        socket.nickname = nickname;
        io.emit('users-changed', {user: nickname, event: 'joined'});
    });

    socket.on('add-message', (message) => {
        io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
    });

    socket.on('message',(message) => {
        io.emit('message',{messages : message})
    });


    /**
    socket.on('subscribe', function(room) {
        console.log('joining room', room);
        socket.join(room);
    });

    socket.on('send message', function(data) {
        console.log('sending room post', data.room);
        socket.broadcast.to(data.room).emit('conversation private post', {
            message: data.message
        });
    });

     **/

});

var port = process.env.PORT || 80;

http.listen(port, function(){
    console.log('listening in http://192.168.1.65:' + port);
});