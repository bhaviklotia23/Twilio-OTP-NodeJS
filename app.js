const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { db } = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

app.use(cookieParser());

const bodyParser = require("body-parser");

// const errorMiddleware = require("./src/middleware/error");
const user = require("./src/user/user.routes");
const { hostname } = require("os");

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = parseInt(process.env.PORT, 10);

app.use(helmet());
const corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", user);
// app.use(errorMiddleware);

app.listen(PORT, () => {
  db();
  console.log(`Listening on port http://:${hostname}`);
});
