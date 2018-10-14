const fs = require("fs")
const path = require("path")


function csvToJson(input = null,output = './result.json') {
    if(input){
        var routeInput =  !input.endsWith(".csv") ? input+'.csv' : input;;
        var routeOutput = !output.endsWith(".json") ? output+'.json' : output;
        try{
            fs.readFile(routeInput, 'utf8', function (err, data) {
                if (err) console.log(err);
                let keys = data.match(/^[\w,]*/g)[0].split(",");
                let lines = data.match(/^.*\n*$/gim);
                lines = lines.map(x => x.replace(/\s*,/gim, ","));
                let result = [...lines.map(line => {
                    const obj = {};
                    const lineSplit = line.split(",");
                    keys.forEach((k, i) => {
                        obj[k] = lineSplit[i];
                    })
                    return obj
                })]
                fs.writeFile(routeOutput, JSON.stringify(result), 'utf8', () => {
                    console.log("successful!")
                })
            });
        }catch(err){
            console.log(err)
        }
    }else{
        console.log("Input file path required!")
    }
}

module.exports = csvToJson;