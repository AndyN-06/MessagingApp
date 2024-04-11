const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const db = require('./database');

app.post('/register', (req, res) => {
  const username = req.body.username;
  db.run('INSERT INTO users (username) VALUES (?)', [username], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id: this.lastID });
  });
});

app.get('/users', (req, res) => {
    db.all('SELECT id, username FROM users WHERE online = 1', [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  app.post('/keepalive', (req, res) => {
    const userId = req.body.userId;
    db.run('UPDATE users SET online = 1 WHERE id = ?', [userId], function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.json({ updated: this.changes });
    });
  });
  
  app.post('/message', (req, res) => {
    const { from_user, to_user, message } = req.body;
    db.run('INSERT INTO messages (from_user, to_user, message) VALUES (?, ?, ?)', [from_user, to_user, message], function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.json({ id: this.lastID });
    });
  });
  
  app.get('/messages/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all('SELECT * FROM messages WHERE to_user = ?', [userId], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(rows);
    });
  });
  