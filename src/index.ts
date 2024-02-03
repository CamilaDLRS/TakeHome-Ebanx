require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import * as http from 'http';

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (req, res) => { res.status(200).send('Ok') });

try {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`TakeHome app is running on port ${port}.`);
   });

  process.on('SIGINT', () => {
    console.log('TakeHome app stopped by SIGINT signal.');
    });

} catch (error) {
  console.log(`Error at initiate the TakeHome app.`);
 }


