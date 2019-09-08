var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require("./shims");
require("./headlessOrdial");

app.use(bodyParser.json());

app.get('/world', function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(singletonContext.worldSerializer.serialize(singletonContext.world));
});

app.post('/world', function (request, response) {
  console.log(request.body);
  singletonContext.worldSerializer.deserialize(
    JSON.stringify(request.body),
    singletonContext.world);
  response.send(request.body);
});

app.use(express.static('public'));
app.use('/vendor', express.static('vendor'));

app.use('/assets', express.static('public/assets'));
app.use('/compiled/css', express.static('public/compiled/css'));
app.use('/src/javascript/browser', express.static('src/javascript/browser'));
app.use('/src/javascript/lib', express.static('src/javascript/lib'));
app.use('/src/vendor', express.static('src/vendor'));


app.use('/spec', express.static('spec'));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
