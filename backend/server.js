const express = require('express');

const dotenv = require('dotenv');

const {chats} = require('./data/data')

const connectDB = require('./config/db');

const userRoutes = require('./routes/user')

const chatRoutes = require("./routes/chatRoutes");

const messageRoute = require("./routes/messageRoute")

const { notFound, errorHandler } = require('./middleware/error');

const app = express();

app.use(express.json());  // to accept json data

dotenv.config();

connectDB();


app.get('/', (req, res) => {-
    res.send("Api is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;


const server = app.listen(port, console.log("App is running"));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
    console.log("connected to socket.io"); 
    
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room" + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));


    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});