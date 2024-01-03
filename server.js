const express = require("express");
const app = express();
const {connectDB} = require("./config/db");
const rateLimit = require('express-rate-limit');
const authRoutes = require("./routes/auth.router")
const noteRoutes = require("./routes/note.router")

const REQ_LIMIT = 100
const REQ_WINDOW = 15 * 60 * 1000

//middleware
app.use(express.json());

//connect to database
connectDB();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: REQ_WINDOW, // 15 minutes
  limit: REQ_LIMIT, // limit each IP to 100 requests per windowMs
  message: `You can only make ${REQ_LIMIT} requests every ${REQ_WINDOW}.`,
});
app.use(limiter);

//routes
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes);


//listen to PORT
const PORT = 5000 || process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

module.exports = server