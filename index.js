var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: {fileSize: 100*1000*1000} })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
