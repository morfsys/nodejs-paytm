const router = require("express").Router();

router.use("/paytm", require("./app/routes/paytm.routes"));

module.exports = router;
