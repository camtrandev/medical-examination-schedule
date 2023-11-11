const express = require('express');
const {
  getHomePage,
  getCrud,
  postCrud,
  displayGetCrud,
  getEditCrud,
  putCrud
}
  = require('../controllers/homeController')

const router = express.Router();

let initWebroutes = (app) => {

  router.get('/', getHomePage);
  router.get('/crud', getCrud);
  router.post('/post-crud', postCrud);
  router.get('/get-crud', displayGetCrud);
  router.get('/edit-crud', getEditCrud);
  router.post('/put-crud', putCrud);


  return app.use("/", router);
}

module.exports = initWebroutes;