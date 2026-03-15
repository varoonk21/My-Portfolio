require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONT_END_URL, 
  methods: ['POST'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const emailRouter = require('./router/email.router.js');
app.use('/api', emailRouter);

app.get('/', (req, res) => {
  return res.send("I'm running");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running at PORT:${PORT}`);
});