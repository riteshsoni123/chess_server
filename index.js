require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
// const erroeHandler = require("./middleware/error");
const cors = require("cors");

connectDB();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/game", require("./routes/game"));

app.use("/api/auth", require("./routes/auth"));
// app.use("/api/private", require("routes/private"));

// app.use(erroeHandler);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
