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
                    "amount": amount,
                    time: new Date(),
                    "balance": user.balance

                })
                user.save()


                return {
                    statuscode: 202,
                    status: true,
                    "message": `amount ${amount} Deposited, Balance: ${user.balance}`,
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


const withdraw = (acno, password, amount) => {
    var amount = parseInt(amount)
    return dbs.User.findOne({ acno, password })

        .then(user => {
            console.log("USER", user)
            if (user) {
                user.balance -= amount
                user.transaction.push({
                    "type": "withdraw",
                    "mode": "online",
                    "amount": amount,
                    time: new Date(),
                    "balance": user.balance


                })
                user.save()


                return {
                    statuscode: 202,
                    status: true,
                    "message": `amount ${amount} withdrawed, Balance: ${user.balance}`,
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
                    transaction: data.transaction
                }

            }
        })
}

const deleteac = (acno) => {
    return dbs.User.deleteOne({ acno })
        .then(user => {
            if (user) {
                return {
                    statuscode: 203,
                    "status": true,
                    "acno": acno

                }
            }
        })
}









module.exports = { deposit, withdraw, transaction,deleteac }