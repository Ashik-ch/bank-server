database = {
    1000: { acno: 1000, uname: "Vigensh", password: 1000, Balance: 10000, transaction: [] }
}


const register = (acno, pswd, uname) => {

    if (acno in database) {
        uname = database[acno]["uname"]
        return {
            "statuscode": 422,
            "status": false,
            "message": "User Already Exist",
            uname
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
            uname,
            "message": "User created succcesfully"
        }
    }
}


///Login

const login = (acno, password) => {
    if (acno in database) {
        if (password == database[acno]['password']) {
            uname = database[acno]['uname']

            return {
                "statuscode": 200,
                "status": true,
                uname,
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




module.exports = { register, login ,database}