const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => res.render('index.ejs'))

app.listen(port);