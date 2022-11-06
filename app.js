const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
      members:[{
      email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName  }
        }]
      };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/2512bc0c5d"
    const options = {
      method: 'POST',
      auth: "utkarsh:c73850a5c788e8e18712514cca521506-us20"
    }

    const request = https.request(url, options, function(response){

      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }
      else
      res.sendFile(__dirname + "/failure.html");

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/")
})


app.listen(process.env.PORT || port , () => {
  console.log(`Server is live on port:${port}`)
})


// API KEY
// e381dff2829baa134c761423ba487821-us20

// Audience ID
// 2512bc0c5d