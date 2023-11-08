const argList = process.argv.slice(2)
let inputFileName
let dbFileName
if (argList.length == 2) {
	inputFileName = argList[0]
	dbFileName = argList[1]
} else {
	inputFileName = 'fileSource.json'
	dbFileName = 'db.json'
}

const Datastore = require('nedb')
const db = new Datastore({ filename: dbFileName, autoload: true })
const fs=require('fs')
if (fs.existsSync(dbFileName)) {
    fs.stat(dbFileName, (err, stats) => {
        if (err) {
            console.error(err)
            return
        }
        if (stats.size > 0) {
            throw("Помилка: файл " + dbFileName + " уже існує і непустий!")
        }
    })
}
let n = 0
let data = fs.readFileSync(inputFileName)
let list = JSON.parse(data)
for (let i=0; i < list.length; i++) {
    let obj = list[i]
    db.insert(obj, (err, newDoc) => { 
        n++
        if (i == list.length - 1) {
        console.log("Успішно створено файл БД " + dbFileName + " з " + n + " документами.")
        }
    })
}
