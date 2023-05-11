const express = require('express');
const app = express();

app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(require('path').resolve(__dirname, 'build', 'index.html'));
});

app.listen(8888, () => {
  console.log(`Example app listening on port 8888`);
});
