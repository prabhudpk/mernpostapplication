const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { connect } = require('./server/db');
app.use(express.json());
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {req.sendFile(path.join(__dirname,"/public","index.html"));});

app.use("/api", require("./server/routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connect();
});