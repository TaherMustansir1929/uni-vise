import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { SAMPLE_UNIVERSITIES } from './data/index2.js'

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/uni-form', (req, res) => {
  res.json("Hello World!");
});

app.post('/api/uni-form', async (req, res) => {
  const formData = req.body
  const universities = SAMPLE_UNIVERSITIES

  const filteredUniversities = universities.filter(university => {
    return university.category.toLowerCase().includes(formData.personalInterest.toLowerCase())
  });

  const response = filteredUniversities

  res.status(200).send({ message: 'Data received successfully', data: response });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});