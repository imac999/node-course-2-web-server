const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.use((req, res, next) => {
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error){
      console.log('unable to log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.redirect('/maintenance.html');
// });


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page Title',
    message: 'welcome to the template'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page Title'
  });
});

app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'Bad'
  });
});

app.listen(3000, () => {
  console.log('server up on 3000');
});
