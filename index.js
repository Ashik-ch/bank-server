const express = require('express')
const ds = require('./dataservice')  //export express
const trans = require('./transaction')
const jwt = require("jsonwebtoken")

//app creation
const app = express()
app.use(express.json())

const jwtmiddleware = ((req, res, next) => {

    try {
        const token = req.headers["x-access-token"]
        const data = jwt.verify(token, "supersecretkey@123")
        if (req.body.acno == data.currentaccountnum) {
            next()
        }
    }

    catch {
        return {
            statuscode: 400,
            status: false, message: "login first"
        }
    }
})



//resolving http reqs
app.get('/get', (req, res) => {
    res.status(405).send("This  is a get methd")   //status code (400)
})


const appMiddleware = (req, res, next) => {
    console.log("application specific middle")
    next()
}
app.use(appMiddleware)

app.post('/post', (req, res) => {
    res.send("This  is a post methd")
})





// register api call
app.post('/register', (req, res) => {
    const result = ds.register(req.body.acno, req.body.password, req.body.uname)
    if (result) {
        res.status(result.statuscode).json(result)
    }
})

//login
app.post('/login', (req, res) => {
    const result = ds.login(req.body.acno, req.body.password)
    if (result) {
        res.status(result.statuscode).json(result)
    }
})


///Deposit
app.post('/deposit', jwtmiddleware, (req, res) => {
    const result = trans.deposit(req.body.acno, req.body.password, req.body.amt)
    if (result) {
        res.status(result.statuscode).json(result)
    }
})


//Withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {
    const result = trans.withdraw(req.body.acno, req.body.password, req.body.amt)
    if (result) {
        res.status(result.statuscode).json(result)
    }
})

app.post('/transaction', (req, res) => {
    const result = trans.transaction(req.body.acno)
    if (result) {
        res.status(result.statuscode).json(result)
    }
})






app.listen(3003, () => {
    console.log("Server listening to port number 3003");
})
