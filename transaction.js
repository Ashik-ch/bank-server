const ds = require('./dataservice')  //import express
let database = ds.database


const deposit = (acno, password, amt) => {
    if (acno in database) {
        if (password == database[acno]["password"]) {
            bal = database[acno]["Balance"] = database[acno]["Balance"] + amt
            database[acno]['transaction'].push ({      // for transaction history
            "mode": "online",
            "Amount": amt,
            "balance": bal
            })

            return {
                statuscode: 202,
                status: true,
                "msg": "amount Deposited",
                amt,
                bal
            }

        } else {
            return {
                "statuscode": 401,
                "status": false,
                "message": "inncorrect password"
            }
        }
    }
    else {
        return {
            "statuscode": 405,
            "status": false,
            "message": "No such user"
        }
    }
}

const withdraw = (acno, password, amt) => {
    if (acno in database) {
        if (password == database[acno]["password"]) {
            bal = database[acno]["Balance"] = Number(database[acno]["Balance"]) - Number(amt)
            database[acno]['transaction'].push({
                "mode": "online",
                "Amount": amt,
                "balance": bal
            })

            return {
                statuscode: 201,
                status: true,
                "msg": "Amount Withdrawn",
                amt,
                bal
            }
        } else {
            return {
                "statuscode": 401,
                "status": false,
                "message": "Incorrect Password"
            }
        }
    } else {
        return {
            "statuscode": 451,
            "status": false,
            "message": "No such user"
        }
    }
}




const transaction = (acno) => {
    database = ds.database
    if (acno in database) {
        return {
            "statuscode": 200,
            "status": true,
            transaction: database[acno]['transaction']
        }
    }
}















module.exports = { deposit, withdraw,transaction }