express = require("express")
app = express()
app.set("view engine", "ejs")
path = __dirname + '/templates/'
app.use(express.static('static'))
views = require("./views")
app.get("/", views.main)
app.get("/list/:id/", views.listObjects)
app.get("/obj/:id/", views.object)
app.use("*", views.error404)
app.listen(3000, () => {
 console.log("Сервер починає прослуховувати підключення на порт 3000…")
}) 
