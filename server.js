// ---Dependencys
const express = require('express');
const path = require('path');
const open = require('open');
// -----------------------------------CONFIG-------------------------------
const app = express();
// -----------------------------------MIDDLEWARES-------------------------------
app.use(express.static(path.join(__dirname, 'dist'))); // serve static files

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening ${port} ... `);
  open(`http://localhost:${port}/`);
});
