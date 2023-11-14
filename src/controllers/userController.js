
const {
    handleUserLogin
} = require('../services/userService');

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inouts parameter!'
        })
    }

    let userData = await handleUserLogin(email, password);
    // các bước sau khi người dùng đăng nhập vào hệ thông
    // 1- check email exist
    // 2- kiểm tra pasword có tồn tại trong databasc không 
    // 3- return UserInfor
    // 4- access-token: JWT json web token 

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin
}