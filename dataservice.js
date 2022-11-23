const jwt = require('jsonwebtoken')
const dbs = require('./dbs')

// database = {
//     1000: { acno: 1000, uname: "Ashik", password: 1000, Balance: 10000, transaction: [] }
// }

const register = (acno, password, uname) => {
    return dbs.User.findOne({ acno })
        .then(reguser => {
            if (reguser) {
                console.log("usrefd:", reguser);
                return {
                    "statuscode": 422,
                    "status": false,
                    "message": "User Already Exist",
                    uname
                }
            } else {
                const newuser = new dbs.User({
                    acno,
                    uname,
                    password,
                    balance: 0,
                    transaction: []
                })
                newuser.save() //saving i nto database

                return {
                    "statuscode": 200,
                    "status": true,
                    message: "User created succcesfully",
                    uname
                    // message: "User created succcesfully"
                }
            }
        })
}



///Login

const login = (acno, password) => {
    return dbs.User.findOne({ "acno": acno, "password": password })
        .then(user => {
            // console.log("logger:", user)
            if (user) {
                currentname = user.uname
                currentaccountnum = acno

                // if (acno in database) {
                // if (password == database[acno]['password']) {
                //     uname = database[acno]['uname']
                // var username = database[acno]["uname"]
                // var accountnumber = database[acno]["acno"]

                ///token creation

                const token = jwt.sign({
                    currentaccountnum: acno
                }, "supersecretkey@123")

                return {
                    "statuscode": 200,
                    "status": true,
                    currentname,
                    currentaccountnum,
                    token,
                    message: "Login succcesful"
                }
            }
            else {
                return {
                    "statuscode": 400,
                    "status": false,
                    "message": "Incorect Password"
                }
            }
        })
}

// else {
//     return {
//         "statuscode": 400,
//         "status": false,
//         "message": "Not Registered"
//         }





module.exports = { register, login }