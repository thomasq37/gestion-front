const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('./dist/'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/'}
  );
});
app.listen(process.env.PORT || 4200);
