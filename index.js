import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
const port = 3000;
const app = express();
const API_URL = 'https://secrets-api.appbrewery.com/';

const userName = 'timonikkum12';
const passWord = 'narender1@';
const APIKey = '63d29350-208c-44d6-b12c-c7a9038f008b';
const BearerToken = '9486c0aa-d4a7-4eab-a251-5d12eacaf96e';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended : true }));

app.get('/',(req,res)=>{ res.render('index.ejs',{content : 'API Response'}) });

app.get('/noAuth',async (req,res)=>{
    try{
        const response = await axios.get(API_URL + 'random');
        res.render('index.ejs',{ content : JSON.stringify(response.data) });
    } catch(error){
        res.status(404).send(`Error : ${error.message}`);
    }
});

app.get('/basicAuth',async (req,res)=>{
    try{
        const response = await axios.get(API_URL + 'all?page=2',{
            auth : 
            {
                username : userName,
                password : passWord,
            }
        });
        res.render('index.ejs',{ content : JSON.stringify(response.data) });
    } catch(error){
        res.status(404).send(`Error : ${error.message}`);
    }
});

app.get('/APIKeyAuth',async (req,res)=>{
    try{
        const response = await axios.get(API_URL + 'filter?',{
            params : 
            {
                score : 5,
                apiKey : APIKey,
            }
        });
        res.render('index.ejs',{ content : JSON.stringify(response.data) });
    } catch(error){
        res.status(404).send(`Error : ${error.message}`);
    }
});

const config = {
    headers : {
        Authorization : `Bearer ${BearerToken}`
    }
};

app.get('/bearerTokenAuth',async (req,res)=>{
    try{
        const response = await axios.get(API_URL + 'secrets/2',config);
        res.render('index.ejs',{ content : JSON.stringify(response.data) });
    } catch(error){
        res.status(404).send(`Error : ${error.message}`);
    }
});

app.listen(port,()=>{ console.log(`Listening on port : ${port}`) });