
const bcrypt = require('bcryptjs');
const db = require('../models/index')

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNmuber: data.phoneNmuber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });

            // trả về 1 chuối messgae -- tương đương với câu lênh return
            resolve('ok create a new user succeed')
        } catch (e) {
            reject(e)
        }
    })

}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser

}