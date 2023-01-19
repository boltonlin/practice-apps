const router = require("express").Router();
const controller = require("./controllers");

router.put('/word', controller.create);
router.get('/word', controller.get);
router.patch('/word', controller.update);
router.delete('/word', controller.delete);

module.exports = router;