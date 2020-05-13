const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

const { convertJSONToCSV } = require('./utils');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/download', (req, res) => {
  fs.promises.readdir(path.join(__dirname, 'conversions'))
    .then(dir => {
      res.status(200).json({ converted: dir })
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
})

app.get('/download/:filename', (req, res) => {
  res.download(path.join(__dirname, 'conversions', req.params.filename));
});

app.post('/', (req, res) => {
  let csvStr = convertJSONToCSV(JSON.parse(req.body.jsonStr));
  fs.promises.readdir(path.join(__dirname, 'conversions'))
    .then(dir => {
      if (dir.includes(`${req.body.fileName}.csv`)) {
        let pathNamesWithId = dir.filter(dirent => dirent.includes(req.body.fileName));
        // Return file name with unique id at end -- temp hack, TODO: change file names to have uuid, store in DB
        return `${req.body.fileName}${pathNamesWithId.length}.csv`
      } else {
        return `${req.body.fileName}.csv`;
      }
    })
    .then(fileName => {
      let writeStream = fs.createWriteStream(path.join(__dirname, 'conversions', fileName));
      writeStream.write(csvStr);
      writeStream.end();
      res.status(201).send(fileName);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

