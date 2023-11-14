
// trong file này dùng để sử lý logic của phần đăng nhập user

const express = require('express')
const db = require('../models/index')
const bcrypt = require('bcryptjs');


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            // check email
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                // compare password

                // kiểm tra passwork
                let user = await db.User.findOne({
                    // email thứ 2 là email mà người dùng chuyền vào để check trong db
                    where: { email: email },
                    // cần phải raw để ẩn bớt mấy cái râu ria thì mới có thể ẩn password đi được  
                    raw: true,
                    attributes: ['email', 'roleId', 'password'] // những trường mà mình muốn sâu ra
                    // nếu không muốn xâu cái password ra màn hình thì hãy tra gg :"lm thế nào để delete 1 thuộc tính của 1 javascript object"
                })
                if (user) {
                    let checkPasswork = await bcrypt.compareSync(password, user.password);
                    if (checkPasswork) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok!';
                        // cách xóa 1 thuộc tính từ javascript object
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong Password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found `
                }


            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exsit in your system. plaese try other email `
            }

            resolve(userData);

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