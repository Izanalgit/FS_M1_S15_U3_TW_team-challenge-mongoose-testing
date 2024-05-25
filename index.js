const express = require('express');
const {dbConnect} = require('./config/config');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

dbConnect();

app.use(express.json());
app.use('/',require('./routes/post'));

app.listen(PORT,()=>console.log(`Server on http://localhost:${PORT}`));

module.exports = app;