const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req, res) => {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);
});


app.listen(port, () => {
  console.log(`Server is live on port:${port}`)
})


// API KEY
// e381dff2829baa134c761423ba487821-us20