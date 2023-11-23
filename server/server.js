require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


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



app.post('/generate', async (req, res) => {


    /*
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    //console.log(req);
    const openai = new OpenAIApi(config);
    const text = req.body.poemData;
    //console.log(req.query.poemData);
    const name = 'Labbe' */
    const prompt = `You will be provided with text delimited by triple quotes. 
    Write me a medium-length poem based on the song - artist pairs listed in the triple quotes.
    Do not write anything other the poem.
    '''${req.query.poemData}'''
    `
    /*
    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{role: "user", content: prompt}],
    });

    console.log(response.data.choices[0].message.content);
    */


    
    const openai = axios.create({
        baseURL: "https://api.openai.com/v1",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.OPENAI_API_KEY
        }
    });

    openai.post("/chat/completions", {
        model: "gpt-4",
        messages: [{role: "user", content: prompt}],
    }).then(response => {
        console.log("generated poem lol")
        console.log(response.data.choices[0].message.content)
        res.json({  
            poem: response.data.choices[0].message.content,
        })
    });



/*
    axios({
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.OPENAI_API_KEY
        },
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],   
    }).then(response => {
        console.log(response.data.choices[0].message.content);
    }); */



});

//const token = '2HjuLoU-VG4kgx3bl4u4CqQCQfC6qA3X8CUh_aO1fGrqFqhRzdGY7rz6eF_mqUsy';




/*
app.get("/lyrics", async (req, res) => {
    console.log('################################');
    axios({
        method: 'post',
        url: 'https://api.genius.com/search',
        headers: {
            'Authorization': 'Bearer'+ token,
        },
        data: {
            'q': 'Creep Radiohead'
        }
    }).then(response => {
        res.json(response);
        console.log(response);
    }).catch(err => {
        console.log(err);
    });
});*/






app.listen(3001);