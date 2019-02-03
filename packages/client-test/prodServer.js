const express = require('express');
const path = require('path');

const app = express();

const rootDoc = path.join(__dirname, 'dist');
app.use(express.static(rootDoc));
app.get('*', (req, res) => res.sendFile(path.join(rootDoc, 'index.html')));

const port = 3001;
const server = app.listen(port, ()=>console.log(`Starting server on port ${[port]}`));
