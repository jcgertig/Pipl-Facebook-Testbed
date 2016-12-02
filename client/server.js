var path = require('path');
var emojic = require('emojic');
var colorIt = require('color-it');
var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV !== 'production' ? 4000 : process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var config = require('./webpack.config.' + process.env.NODE_ENV);

  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/public', express.static('public'));
app.use('/dist', express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(colorIt(emojic.x).red() + '  ' + colorIt(JSON.stringify(err)).red()); // eslint-disable-line
    return;
  }

  var msg = colorIt(emojic.smiley).green() + '  ';
  msg += colorIt('Listening at http://localhost:').green();
  msg += colorIt(PORT).blue() + colorIt('.').green();
  console.log(msg); // eslint-disable-line
});
