import express from 'express';
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server ok');
});
