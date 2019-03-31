var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require("./shims");
require("./headlessOrdial");

app.use(bodyParser.json());

app.get('/world', function (request, response) {
  response.send(singletonContext.worldSerializer.serialize(singletonContext.world));
});

app.post('/world', function (request, response) {
  console.log(request.body);
  singletonContext.worldSerializer.deserialize(
    JSON.stringify(request.body),
    singletonContext.world);
  response.send(request.body);
});

app.use(express.static('public/compiled'));
app.use('/vendor', express.static('vendor'));

app.use('/src/assets', express.static('src/assets'));
app.use('/src/css', express.static('src/css'));
app.use('/src/javascript/browser', express.static('src/javascript/browser'));
app.use('/src/javascript/lib', express.static('src/javascript/lib'));


app.use('/spec', express.static('spec'));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
