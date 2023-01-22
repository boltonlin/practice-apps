const router = require("express").Router();
const controller = require("./controllers");

router.put('/forms', controller.createOrUpdate);
router.get('/forms', controller.fetch);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

module.exports = router;