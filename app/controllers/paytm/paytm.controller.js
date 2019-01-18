var checksum = require("./checksum");

module.exports = {
    getRequest: (req, res) => {
        res.render("paytm/index");
    },
    request: (req, res) => {
        var paramlist = req.body;
        var paramarray = new Array();
        for (name in paramlist) {
            if (name == "PAYTM_MERCHANT_KEY") {
                var PAYTM_MERCHANT_KEY = paramlist[name];
            } else {
                paramarray[name] = paramlist[name];
            }
        }
        paramarray["CALLBACK_URL"] = "http://192.168.0.102:3001/api/paytm/response";
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, (err, result) => {
            if (err) throw err;
            res.render("paytm/request", { result });
        });
    },
    response: (req, res) => {
        // console.log(req.body);
        if (req.body.RESPCODE === "01") {
            res.render("paytm/response", {
                status: true,
                result: req.body
            });
        } else {
            res.render("paytm/response", {
                status: false,
                result: req.body
            });
        }
    }
};
