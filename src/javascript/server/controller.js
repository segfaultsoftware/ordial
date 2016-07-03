var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/world', function (request, response) {
  response.send(singletonContext.worldSerializer.serialize(singletonContext.world));
});

app.post('/world', function(request, response){
  console.log(request.body);
  singletonContext.worldSerializer.deserialize(
    JSON.stringify(request.body), 
    singletonContext.world);
  response.send(request.body);
});

app.use(express.static('public/compiled'));
app.use(express.static('public/copied'));
app.use('/spec', express.static('spec'));
app.use('/vendor', express.static('vendor'));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
