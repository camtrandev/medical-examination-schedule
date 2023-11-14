const express = require('express')
const db = require('../models/index')

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                // compare password
                resolve({})
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exsit in your system. plaese try other email `
                resolve(userData);
            }
        } catch (e) {
            reject(e)
        }
    })
}
// kiểm tra xem useremail đã có trong hệ thong chưa 
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin,
    checkUserEmail
}