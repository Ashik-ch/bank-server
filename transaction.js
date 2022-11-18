// const ds = require('./dataservice')  //import express
const dbs = require("./dbs")


const deposit = (acno, password, amount) => {
    // if (acno in database) {
    //     if (password == database[acno]["password"]) {
    //         bal = database[acno]["Balance"] = database[acno]["Balance"] + amount
    //         database[acno]['transaction'].push ({      // for transaction history

    var amount = parseInt(amount)
    return dbs.User.findOne({ acno, password })

        .then(user => {
            console.log("USER", user)
            if (user) {
                user.balance += amount
                user.transaction.push({
                    "type": "Deposit",
                    "mode": "online",
                    "Amount": amount
                    // "balance": user.balace

                })
                user.save()


                return {
                    statuscode: 202,
                    status: true,
                    "msg": `amount ${amount} Deposited, Balance: ${user.balance}`,
                    amount
                    // balance
                }

            } else {
                return {
                    "statuscode": 401,
                    "status": false,
                    "message": "inncorrect password"
                }
            }
        })
}

// else {
// return {
//     "statuscode": 405,
//     "status": false,
//     "message": "No such user"
// }

const withdraw = (acno, password, amount) => {
    var amount = parseInt(amount)
    return dbs.User.findOne({ acno, password })

        .then(user => {
            console.log("USER", user)
            if (user) {
                user.balance -= amount
                user.transaction.push({
                    "type": "Deposit",
                    "mode": "online",
                    "Amount": amount,
                    // "balance": 0

                })
                user.save()


                return {
                    statuscode: 202,
                    status: true,
                    "msg": `amount ${amount} withdrawed, Balance: ${user.balance}`,
                    amount,
                    // balance
                }

            } else {
                return {
                    "statuscode": 401,
                    "status": false,
                    "message": "incorrect password"
                }
            }
        })
}



const transaction = (acno) => {
    return dbs.User.findOne({ acno })
        .then(data => {
            if (data) {

                return {
                    "statuscode": 200,
                    "status": true,
                    transaction: database[acno]['transaction']
                }

            }
        })
}















module.exports = { deposit, withdraw, transaction }