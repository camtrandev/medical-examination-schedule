
const {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    upDateUserData
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
        user: userData.user ? userData.user : {},
    })
}


// api CRUD lấy người dùng 
const handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            user: []
        })
    }
    let users = await getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok!',
        users
    })

}

// API Create New User
const handleCreateNewUser = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
// API EditUser
const handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await upDateUserData(data);
    return res.status(200).json(message)
}
// Delete User
const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "missing parameters!"
        })
    }
    let message = await deleteUser(req.body.id);
    return res.status(200).json(message);

}

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser
}