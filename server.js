const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'https://gestion-front-7b998d8ddb5b.herokuapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.static('./dist/'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/'}
  );
});
app.listen(process.env.PORT || 4200);
