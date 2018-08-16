const fs = require("fs")
const routeInput = "./example.csv"
const routeOutput = "./example.json"
fs.readFile(routeInput, 'utf8', function(err, data) {
    if (err) throw err;
    let keys = data.match(/^[\w,]*/g)[0].split(",");
    let lines = data.match(/^\d+\/\d+\/\d+\s.*$/gim);
    lines = lines.map(x=>x.replace(/\s*,/gim,","));
    let result = [...lines.map(line=>{
        const obj = {};
        const lineSplit = line.split(",");
        keys.forEach((k,i)=>{
            obj[k] = lineSplit[i];
        })
        return obj
    })]
    fs.writeFile(routeOutput,JSON.stringify(result), 'utf8', ()=>{
        console.log("csv a json transformado exitosamente!!")
    })
});