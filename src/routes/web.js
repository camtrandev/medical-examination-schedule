const express = require('express');
const {
  getHomePage,
  getCrud,
  postCrud
}
  = require('../controllers/homeController')

const router = express.Router();

let initWebroutes = (app) => {

  router.get('/', getHomePage);
  router.get('/crud', getCrud);
  router.post('/post-crud', postCrud);

  return app.use("/", router);
}

module.exports = initWebroutes;