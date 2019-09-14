const jsonServer = require('json-server');
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

app.use('/api', middlewares);
app.use('/api', router);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/rtc-v1'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/rtc-v1/index.html'));
});

app.listen(port, () => console.log(`RT-Chat app listening on port ${port}!`))