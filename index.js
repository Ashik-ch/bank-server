const express = require('express')
const ds = require('./dataservice')  //export express
const trans = require('./transaction')

//app creation
const app = express()
app.use(express.json())




//resolving http reqs
app.get('/get', (req, res) => {
    res.status(405).send("This  is a get methd")   //status code (400)
})

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
app.post('/deposit', (req, res) => {
    const result = trans.deposit(req.body.acno, req.body.password, req.body.amt)
    if (result) {
        res.status(result.statuscode).json(result)
    }
})


//Withdraw
app.post('/withdraw', (req, res) => {
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






app.listen(3004, () => {
    console.log("Server listening to port number 3004");
})
