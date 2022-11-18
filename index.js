const express = require('express')
const ds = require('./dataservice')  //export express
const trans = require('./transaction')
const jwt = require("jsonwebtoken")
const cors = require('cors')

//app creation
const app = express()
app.use(express.json())

app.use(cors({
    orgin: 'http://localhost:4200/'
}))

const appMiddleware = (req, res, next) => {
    console.log("application specific middle")
    next()
}
app.use(appMiddleware)

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




app.post('/post', (req, res) => {
    res.send("This  is a post methd")
})





// register api call
app.post('/register', (req, res) => {
    ds.register(req.body.acno, req.body.password, req.body.uname)
        .then(reguser => {
            if (reguser) {
                res.status(reguser.statuscode).json(reguser)
            }
        })

})

//login
app.post('/login', (req, res) => {

    ds.login(req.body.acno, req.body.password)
        .then(loger => {
            if (loger) {
                res.status(loger.statuscode).json(loger)
            }
        })
})


///Deposit
app.post('/deposit', jwtmiddleware, (req, res) => {
    trans.deposit(req.body.acno, req.body.password, req.body.amount)
        .then(result => {
            if (result) {
                res.status(result.statuscode).json(result)

            }
        })

})


//Withdraw
app.post('/withdraw', jwtmiddleware, (req, res) => {
    trans.withdraw(req.body.acno, req.body.password, req.body.amount)
        .then(result => {
            if (result) {
                res.status(result.statuscode).json(result)

            }
        })
})

app.post('/transaction', (req, res) => {
    const result = trans.transaction(req.body.acno)
        .then(result => {
            if (result) {
                res.status(result.statuscode).json(result)

            }
        })
})






app.listen(3004, () => {
    console.log("Server listening to port number 3004");
})
