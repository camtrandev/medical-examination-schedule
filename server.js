const express = require('express');
import bodyParser from "body-parser";
const configViewEngine = require('./src/config/viewEngine');
import initWebroutes from './src/routes/web';
require('dotenv').config();
const connectDB = require('./src/config/Databasc');

let app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

configViewEngine(app);
initWebroutes(app);

connectDB();

let port = process.env.PORT || 2004;

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})