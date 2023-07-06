require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json());





app.post('/login', (req, res) => {
    
    var code = req.body.code || null;
    axios({
       method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: {
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        }).then(response => {
            res.json({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                expires_in: response.data.expires_in
            })
            }).catch(err => {
                res.sendStatus(400);
        });


});

app.listen(3001);