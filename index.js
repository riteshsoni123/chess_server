require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
// const erroeHandler = require("./middleware/error");
const cors = require("cors");
// const { Socket } = require("dgram");

connectDB();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/game", require("./routes/game"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// app.use(erroeHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: `${process.env.FRONTEND_URL}`, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.username;
  socket.join(id);

  socket.on("sendChallange", (data) => {
    socket.broadcast.to(data.id).emit("recieveChallange", data.sender);
  });

  socket.on("acceptChallange", (data) => {
    socket.broadcast.to(data.id).emit("acceptedChallange", data.sender);
  });
  socket.on("declineChallange", (data) => {
    // console.log("reached at decline challange");
    socket.broadcast.to(data.id).emit("declineChallange", data.sender);
  });
  socket.on("sendMessage", (data) => {
    socket.broadcast.to(data.id).emit("recieveMessage", data.message);
  });
  socket.on("sendCoinToss", (data) => {
    // console.log("recieved coin toss", data);
    socket.broadcast.to(data.id).emit("recieveCoinToss", data.sender);
  });

  socket.on("sendMoves", (data) => {
    // console.log("recieved coin toss", data);
    socket.broadcast.to(data.id).emit("recievedMoves", data);
  });
  socket.on("offerDraw", (data) => {
    socket.broadcast.to(data.id).emit("recieveDrawOffer", data);
  });
  socket.on("acceptDraw", (data) => {
    socket.broadcast.to(data.id).emit("drawAccepted", data);
  });
  socket.on("userResigned", (data) => {
    socket.broadcast.to(data.id).emit("opponentResigned", data);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
