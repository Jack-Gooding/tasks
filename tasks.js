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
                    status INTEGER NOT NULL,
                    archive INTEGER NOT NULL
)`);
createTable.run();

const insertData = db.prepare(`INSERT INTO tasks(task, description, dateAdded, category, status, archive) VALUES (?, ?, ?, ?, ?, 0)`);
const readData = db.prepare(`SELECT rowid, * FROM tasks WHERE archive != 1`);

const updateCategory = db.prepare(`UPDATE tasks SET category = ? WHERE rowid = ?`);
const updateStatus = db.prepare(`UPDATE tasks SET status = ? WHERE rowid = ?`);
const updateTask = db.prepare(`UPDATE tasks SET task = ? WHERE rowid = ?`);
const updateNotes = db.prepare(`UPDATE tasks SET notes = ? WHERE rowid = ?`);
const updateDescription = db.prepare(`UPDATE tasks SET description = ? WHERE rowid = ?`);
const updateCompletedDate = db.prepare(`UPDATE tasks SET dateCompleted = ? WHERE rowid = ?`);

//const deleteRow = db.prepare(`DELETE FROM tasks WHERE rowid = ?`);
const deleteRow = db.prepare(`UPDATE tasks SET archive = 1 WHERE rowid = ?`);

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

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/


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

  rowid = req.body.rowid;

  if (req.body.header === "status") {

    let newStatus = (req.body.value) ? 1 : 0;
    let compDate;
    console.log("Setting status to"+req.body.value);
    updateStatus.run(newStatus, rowid);
    if (newStatus == 1) {
      updateCompletedDate.run(moment().format("Y-MM-DD HH:mm:ss"), rowid);
    } else if (newStatus == 0) {
      updateCompletedDate.run(null, rowid);
    }

  } else if (req.body.header === "category") {

    updateCategory.run(req.body.value, rowid);

  } else if (req.body.header === "task") {

    updateTask.run(req.body.value, rowid);

  } else if (req.body.header === "description") {

    updateDescription.run(req.body.value, rowid);

  } else if (req.body.header === "notes") {

    updateNotes.run(req.body.value, rowid);
  }


  res.send(readData.all());


});

app.post('/api/delete', (req, res) => {
  console.log(req.body.rowid);
  let rowid = req.body.rowid;

  deleteRow.run(rowid);


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");


  res.send(readData.all());

});

app.post('/api/create', (req, res) => {

  let category = "";
  if (req.body.category) {
    category = req.body.category;
  }
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");

  insertData.run("New task","",moment().format("Y-MM-DD HH:mm:ss"),category,0);

  res.send(readData.all());

});

app.listen(4000, () =>
  console.log('Express server is running on localhost:4000')
);
