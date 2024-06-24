require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dataRoute = require('./routes/data');
app.use('/api', dataRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
