
const express = require('express');


let getHomePage = (req, res) => {
    return res.render('homePage.ejs')
}

module.exports= {
    getHomePage
}