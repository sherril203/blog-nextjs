const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const app = express();
const path = require('path');

app.use(cors()); 
app.use(express.json());
app.use(router);
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
  res.json({ message: "API is working!" });
});


module.exports = app;  