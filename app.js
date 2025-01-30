const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(<h1>Hello World</h1>));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
