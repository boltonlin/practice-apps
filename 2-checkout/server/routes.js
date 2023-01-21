const router = require("express").Router();
const controller = require("./controllers");

router.put('/forms', controller.createOrUpdate);
router.get('/forms', controller.fetch);

module.exports = router;