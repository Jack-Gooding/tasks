const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const db = new Database('taskList.db',{ verbose: console.log }); // ,{ verbose: console.log }

const createTable = db.prepare(`CREATE TABLE IF NOT EXISTS tasks(
                    rowid INTEGER PRIMARY KEY,
                    task TEXT NOT NULL,
                    description TEXT,
                    notes TEXT,
                    dateAdded TEXT NOT NULL,
                    dateDue TEXT,
                    dateCompleted TEXT,
                    category TEXT,
                    status INTEGER NOT NULL
)`);
createTable.run();

const insertData = db.prepare(`INSERT INTO tasks(task, description, dateAdded, status) VALUES (?, ?, ?, ?)`);
const readData = db.prepare(`SELECT rowid, * FROM tasks`);

const updateCategory = db.prepare(`UPDATE tasks SET category = ? WHERE rowid = ?`);
const updateStatus = db.prepare(`UPDATE tasks SET status = ? WHERE rowid = ?`);

/*
const insertMany = db.transaction((data) => {
  for (const row of data) {
    insertData.run(row.xPosition, row.yPosition, row.hexColour);
  }
  console.log(`db updated.`)
});
*/


//Creating pretty tables in React

//https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
//https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg



insertData.run("Testing","adding data",moment().format("Y-MM-DD, HH:mm:ss"),0);
console.log();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hi, this is a back-end server.` }));
});



app.get('/api/tasks', (req, res) => {
  console.log("tasks");
  res.send(readData.all());
})

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!`}));
});

app.post('/api/tasks', (req, res) => {
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({Response: `${req.body[Object.keys(req.body)[0]]}!`}));

  rowid = req.body.rowid;

  if (req.body.header === "status") {

    let newStatus = (req.body.value != 1) ? 1 : 0;
    updateStatus.run(newStatus, rowid)

  } else if (req.body.header === "category") {

    updateCategory.run(req.body.value, rowid);

  }




});

app.listen(4000, () =>
  console.log('Express server is running on localhost:4000')
);
