require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models/index');

const corsOptions = { 
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    headers: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/treasure-island/public', express.static(path.join(__dirname, 'public')));


app.get('/treasure-island', (req, res) => {
    return res.json("welcome to treasure island app!");
});

// manager routes
app.post('/treasure-island/managers/auth', require('./middleware/isAuthMddleware'));
app.use('/treasure-island/teams', require('./routes/ManagerRoutes/TeamRouter'));
app.use('/treasure-island/winners', require('./routes/ManagerRoutes/WinnerTeamRouter'));
app.use('/treasure-island/managers', require('./routes/ManagerRoutes/ManagerRouter'));
app.use('/treasure-island/categories', require('./routes/ManagerRoutes/CategoryRouter'));
app.use('/treasure-island/advertisements', require('./routes/ManagerRoutes/AdvertisementRouter'));
app.use('/treasure-island/questions', require('./routes/ManagerRoutes/QuestionRouter'));
app.use('/treasure-island/answers', require('./routes/ManagerRoutes/AnswerRouter'));

// user routes
// app.use('/tik-tok-quiz/users', require('./routes/UserRoutes/UserRouter'));

const server = app.listen({ port: process.env.PORT || 3090 }, async () => {
    // await sequelize.sync({force:true});
    // await sequelize.sync({alter:true});
    console.log('starting on port : ' + process.env.PORT || 3090);
});