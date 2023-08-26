const express = require('express');
const cors = require('cors');
const axios = require('axios')
// const at=  require('core-js');

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", async (req, res) => {
  // const fs = require("fs");
  // console.log("csv");
  try {
    const csv = await axios('https://raw.githubusercontent.com/udit0012/exoplanetBackend/main/data4.csv')
    // console.log(csv.data);
    const data = await csv.data
    let array = data.toString()
    const [keys,...rest] = array.trim().split('\n').map((item) => item.split(','));
    let formedArr = rest.map((item) => {
        const object = {};
        keys.forEach((key, index) => (object[key] = item.at(index)));
        return object;
      });
    // console.log("data", formedArr);
    return res.json(formedArr)
  } catch (error) {
    console.log(error);
  }


})

app.listen(5000);