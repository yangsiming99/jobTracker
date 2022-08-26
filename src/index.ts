import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

//Routes
import jobRoutes from './routes/jobs';
import pdfRoutes from './routes/coverletter'

// const db = new database();
// db.createTable();


app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/jobs', jobRoutes);
app.use('/coverletter', pdfRoutes);

app.get('*', (req, res) => {
  console.log(__dirname)
  // res.sendFile(path.join(__dirname, '..' + '/client/dist/index.html'));
  res.redirect('http://localhost:5173')
})

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});