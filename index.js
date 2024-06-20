const express = require('express');
const mysql=require('mysql')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = mysql.createConnection({
    host: '172.20.10.4',
    user: 'root',
    password: '1234',
    database: 'forrajera'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL!');
  });

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});
app.get('/marca', (req, res) => {
    const sql = 'SELECT * FROM marca';
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result)
    });
  });

app.post('/marca/add', (req, res) => {
    const { nombre,descripcion } = req.body;
    const sql = 'INSERT INTO marca VALUES (DEFAULT,?,?,1)';
    connection.query(sql, [nombre,descripcion], (err, result) => {
      if (err) throw err;
      res.json({result})
    });
  });
  
  app.put('/marca/update/:id', (req, res) => {
    const {id}=req.params
    const { nombre,descripcion } = req.body;
    const sql = 'UPDATE marca SET marca.nombre=?, marca.descripcion=? WHERE marca.id=?';
    connection.query(sql, [nombre,descripcion,id], (err, result) => {
      if (err) throw err;
      res.json({result})
    });
  });
  app.put('/marca/delete/:id', (req, res) => {
    const {id}=req.params
    const sql = 'UPDATE marca SET marca.status=0 WHERE marca.id=?';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.json({result})
    });
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
