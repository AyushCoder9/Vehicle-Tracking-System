const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3000;

const dummyData = require('./dummyData.json');

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

let currentIndex = 0;

app.get('/api/route', (req, res) => {
  res.json(dummyData);
});

app.get('/api/current-location', (req, res) => {
  const data = dummyData[currentIndex];
  currentIndex = (currentIndex + 1) % dummyData.length;
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});