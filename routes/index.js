var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/authenticate', (req, res) => {
  const cert = req.connection.getPeerCertificate()
  if (req.client.authorized) {
    res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`) 
  } else if (cert.subject) {
		res.status(403)
       .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
  } else {
		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`)
	}
});

module.exports = router;
