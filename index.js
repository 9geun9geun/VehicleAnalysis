var AWS = require('aws-sdk');
const express = require('express');
const fileUpload = require('express-fileupload');
//var uuid = require('node-uuid');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const app = express();
const bodyParser = require('body-parser')



app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:true}));

AWS.config.loadFromPath('./credentials.json');
AWS.config.update({region: 'ap-southeast-2'});

app.get("/", function(req,res){
  res.sendFile(__dirname+ "/index.html")
});


app.get("/", function(req,res){
  res.sendFile(__dirname+ "/styles.css")
});

app.post("/upload", function(req,res){
  if(req.files){
    const photo = req.files.vehicletosearch.name;
    const client = new AWS.Rekognition();

      const params = {
        Image: {

          S3Object: {
             Bucket: "vehiclebucket",
             Name: photo
           },
        },
        MaxLabels: 10
      }
      client.detectLabels(params, function(err, response) {
        if (err) {
          console.log(err, err.stack); // an error occurred
        } else {
          console.log(`Detected labels for: ${photo.slice(0,-4)}`)
        // req.files.vehicletosearch.size=20000;
        console.log(req.files)

          for(i=0; i<10; i++){




          if (response.Labels[i].Name =="Suv" || response.Labels[i].Name =="Sedan" || response.Labels[i].Name =="Coupe" || response.Labels[i].Name =="Convertible" || response.Labels[i].Name =="Hatchback"|| response.Labels[i].Name =="Wagon" || response.Labels[i].Name =="Utility" || response.Labels[i].Name =="Van"){

            const imageURL = "https://vehiclebucket.s3-ap-southeast-2.amazonaws.com/" + photo;
            const buttonLink = "https://www.turners.co.nz/Cars/Used-Cars-for-Sale/?searchfor=" + photo.slice(0,-4);
            return res.send("<body style = background-color:#9999ff; >" +
            "<div style=text-align:center;padding-top:60px;>"+
            "<img style = border-radius:50%;width:450px; height:450px;  src=" + imageURL + ">" +
            "</div>" + "<h2 style= text-align:center; > Car Type: "+ " "+
            response.Labels[i].Name +
            "</br>" +
            " Confidence Level: " +
            Math.round(response.Labels[i].Confidence) + "%"+
            "</br>" +   "</br>"+ "<a href=" +
            buttonLink +
            "> Find similar cars at Turners </a> </h2>" );

          }
          }

            response.Labels.forEach(label => {
            console.log(`Label:      ${label.Name}`)
            console.log(`Confidence: ${label.Confidence}`)
            // console.log("Instances:")
            // label.Instances.forEach(instance => {
            //   let box = instance.BoundingBox
            //   console.log("  Bounding box:")
            //   console.log(`    Top:        ${box.Top}`)
            //   console.log(`    Left:       ${box.Left}`)
            //   console.log(`    Width:      ${box.Width}`)
            //   console.log(`    Height:     ${box.Height}`)
            //   console.log(`  Confidence: ${instance.Confidence}`)
            // })
            // console.log("Parents:")
            // label.Parents.forEach(parent => {
            //   console.log(`  ${parent.Name}`)
            // })
            // console.log("------------")
            // console.log("")

          }) // for response.labels
        } // if
      });

  }
})
app.use(express.static(__dirname+'/public'));

//const bucket = 'vehiclebucket' // the bucketname without s3://




// app.get("/", function(req, res){
//   res.send("Hello");
// })
//
// app.use(express.static(__dirname + ));
// //
// app.post('/upload', function(req, res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
// })

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //const uploadedImage = req.files.vehicletosearch;

  // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
//      if (err)
//        return res.status(500).send(err);
//
//      res.send('File uploaded!');
//    });
// });

app.listen(3000, function(){
  console.log("Server listening on port 3000")
})
