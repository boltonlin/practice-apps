const router = require("express").Router();
const controller = require("./controllers");

router.post('/word', controller.create);
router.get('/word', controller.get);
router.patch('/word', controller.update);

module.exports = router;