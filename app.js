const express = require('express');
const https = require('https');

//const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
//app.use(express.static("public"));
app.use(express.json());
app.use(cors());
require('dotenv').config();
// const apiKey = process.env.MAILCHIMP_API_KEY;
// const listId = process.env.MAILCHIMP_LIST_ID;
// console.log("✅ API Key Loaded:", process.env.MAILCHIMP_API_KEY ? "Yes" : "No");
// console.log("✅ List ID Loaded:", process.env.MAILCHIMP_LIST_ID ? "Yes" : "No");
//bbfe603f78275c5b285e8c65542cc1ac-us9
// app.get('/', function(req, res){
//     // https.get(url, function(response){
//     //      console.log('Server is running');
//     // })
//     res.sendFile(__dirname+'client/src/ignup.html');
// })
app.post("/", function(req, res){
    const fullName = req.body.FullName;
    const email = req.body.Mail;
    console.log(fullName, email);
    const data = {
        //js object
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fullName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);
    const url = `https://us9.api.mailchimp.com/3.0/lists/588e445829`;
    const options = {
        method: "POST",
        auth: `Sofia:40fb11b52bddf54b3162a4ead91a266a-us9`
    };


    const request = https.request(url, options, function(response){
        let responseData = '';
        response.on('data', function(chunk){
            responseData += chunk;
        });

        response.on('end', function(){
            const parsed = JSON.parse(responseData);
            console.log('Mailchimp response: ', parsed);

            if (response.statusCode === 200){
                res.send('Successfully Signed up to the Newsletter !');
            }
            else {
                res.status(400).send(parsed.detail || 'Signup Failed');
            }
        });
        // if (response.statusCode===200){
        //     res.send('Successfully signed up !! ')
        // }
        // response.on("data", function(data){
        //     const responseData = JSON.parse(data.toString());
        //     console.log('Mailchimp response: ', responseData);

        //     if (response.statusCode!==200){
        //         res.status(400).send(responseData.detail || 'signup failed');
        //     }
        // })
    });

    request.write(jsonData);
    request.end();

});
app.listen(226, function(){
    console.log('Server is running on port 226');
});
//api key for mailchimp = aedf43efa39a81fc1a95dfc48c26d42a-us9