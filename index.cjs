const express = require('express');
const cors = require('cors');
// const at=  require('core-js');

const app = express();

app.use(cors());
app.use(express.json())

app.get("/get-data", async (req, res) => {
  // const fs = require("fs");
  console.log("csv");
  try {
    const csv = await fetch('https://raw.githubusercontent.com/udit0012/exoplanetBackend/main/data4.csv')
    console.log(csv);
    const data = await csv.text()
    let array = data.toString()
    const [keys,...rest] = array.trim().split('\n').map((item) => item.split(','));
    let formedArr = rest.map((item) => {
        const object = {};
        keys.forEach((key, index) => (object[key] = item.at(index)));
        return object;
      });
    console.log("data", formedArr);
    return res.json(formedArr)
  } catch (error) {
    console.log(error);
  }


})

app.listen(5000);