const router = require("express").Router();
const controller = require("./controllers");
const seeder = require("./seeder");

router.put('/word', controller.create);
router.get('/word', controller.get);
router.patch('/word', controller.update);
router.delete('/word', controller.delete);

router.post('/seed', seeder.create);
router.delete('/seed', seeder.delete);

module.exports = router;