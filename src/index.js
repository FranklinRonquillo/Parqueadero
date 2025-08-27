import express from 'express';
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});