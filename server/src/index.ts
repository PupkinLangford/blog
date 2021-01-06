import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(3000, () => {
  console.log('now listening for requests on port 3000');
});

export default app;
