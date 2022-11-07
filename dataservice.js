database = {
    1000: { acno: 1000, uname: "Vigensh", password: 1000, Balance: 10000 }
}



const register = (acno, pswd, uname) => {

    if (acno in database) {
        return {
            "statuscode": 422,
            "status": false,
            "message": "User already exist"
        }
    } else {
        database[acno] = {
            "acno": acno,
            'password': pswd,
            "uname": uname,
            Balance: 0
        }
        console.log("database", database)
        return {
            "statuscode": 200,
            "status": true,
            "message": "User created succcesfully"
        }
    }
}

const login=(acno, password)=> {
   
    if (acno in database) {
        if (password == database[acno]['password']) {
            username = database[acno]['uname']
       
            return {
                "statuscode": 200,
                "status": true,
                "message": "Login succcesful"
            }
        } else {
            return {
                "statuscode": 400,
                "status": false,
                "message": "Incorect Password"
            }
        }
    } else {
        return {
            "statuscode": 400,
            "status": false,
            "message": "Not Registered"
        }
    }
}



///////////////////


//Deposit  by thunderstorm

const deposit = (acno, password, amt) => {
    if (acno in database) {
        if (password == database[acno]["password"]) {
            database[acno]["Balance"] = Number(database[acno]["Balance"]) + Number(amt)
            database[acno]['Transaction'] = {
                "Amount": amt
            }
            bal = database[acno]["Balance"]
            return {
                statuscode: 202,
                status: true,
                "msg": "amount Deposited",
                bal
            }
        } else {
            return {
                "statuscode": 401,
                "status": false,
                "message": "inncorrect password"
            }
        }
    } else {
        return {
            "statuscode": 401,
            "status": false,
            "message": "No such user"
        }
    }
}


const withdraw = (acno, password, amt) => {
    if (acno in database) {
        if (password == database[acno]["password"]) {
            database[acno]["Balance"] = Number(database[acno]["Balance"]) - Number(amt)
            database[acno]['Transaction'] = {
                "Amount": amt
            }
            bal = database[acno]["Balance"]
            return {
                statuscode: 202,
                status: true,
                "msg": "Amount Withdrawn",
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
            "statuscode": 401,
            "status": false,
            "message": "No such user"
        }
    }
}






module.exports = { register, login, deposit, withdraw }
