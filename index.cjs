const express= require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.get("/get-data",(req,res)=>{
    const fs = require("fs");
    csv = fs.readFileSync("data4.csv")
    let array = csv.toString()
    const [keys,...rest] = array.trim().split('\n').map((item) => item.split(','));
    let formedArr = rest.map((item) => {
        const object = {};
        keys.forEach((key, index) => (object[key] = item.at(index)));
        return object;
      });
    return res.json(formedArr)
})

app.listen(5000);