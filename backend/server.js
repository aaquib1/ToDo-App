const express = require("express");
const app = express();

//Database Connection
const connectDB = require("./config/db");
connectDB();

// //Middleware
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true)
    return next();
});
app.use(express.json({ extended: true }));
app.use("/", require("./routes/api/todo"));
// app.use("/", require("./routes/api/todo"));
// app.use("/profile", require("./routes/api/profile"));
// app.use("/post", require("./routes/api/posts"));

//PORT configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT} port`));