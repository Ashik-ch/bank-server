const jwt = require('jsonwebtoken')
const dbs = require('./dbs')

// database = {
//     1000: { acno: 1000, uname: "Ashik", password: 1000, Balance: 10000, transaction: [] }
// }


const register = (acno, pswd, uname) => {


    // if (acno in database) {      //local database
    //     uname = database[acno]["uname"]

    return dbs.User.findOne({ acno })
        .then(reguser => {
            if (reguser) {
                console.log("usrefd:",reguser);
                return {
                    "statuscode": 422,
                    "status": false,
                    "message": "User Already Exist",
                    uname
                }

            } else {
                // database[acno] = {
                //     "acno": acno,
                //     'password': pswd,
                //     "uname": uname,
                //     Balance: 0
                const newuser = new dbs.User({
                    acno,
                    uname,
                    pswd,
                    Balance: 0,
                    transaction: []
                })
                newuser.save()    //saving into database
                // console.log("database", )
                return {
                    "statuscode": 200,
                    "status": true,
                    uname,
                    "message": "User created succcesfully"
                }
            }
        }
  )

}



///Login

const login = (acno, password) => {
    if (acno in database) {
        // if (password == database[acno]['password']) {
        //     uname = database[acno]['uname']
        var username = database[acno]["uname"]
        var accountnumber = database[acno]["acno"]
        const token = jwt.sign({
            currentaccountnum: acno
        }, "supersecretkey@123")


        return {
            "statuscode": 200,
            "status": true,
            username,
            accountnumber,
            token,
            "message": "Login succcesful",
        }
    } else {
        return {
            "statuscode": 400,
            "status": false,
            "message": "Incorect Password"
        }
    }
}
// else {
//     return {
//         "statuscode": 400,
//         "status": false,
//         "message": "Not Registered"
//         }





module.exports = { register, login }