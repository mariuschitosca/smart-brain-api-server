const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profileId = require('./controllers/profileId');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Enkidu',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => { response.send(database.users) });
app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register', (request, response) => { register.handleRegister(request, response, db, bcrypt)} );
app.get('/profile/:id', (request, response) => { profileId.handleProfileId(request, response, db) });
app.put('/image', (request, response) => { image.handleImage(request, response, db) });
app.post('/imageurl', (request, response) => { image.handleApiCall(request, response) });

const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${PORT}.`);
});