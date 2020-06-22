var express = require('express')
var router = express.Router()
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
var multer  = require('multer')
var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
		let rootFolder = path.resolve(__dirname, "repository")
		cb(null, rootFolder)
	  },
	  filename: function (req, file, cb) {
		cb(null, file.originalname)
	  }
})
const withAuth = require('./withAuth');
const withAuthOrKey = require('./withAuthOrKey');
const Archive = require('./models/Archive');

var upload = multer({ storage : storage })

router.get('/file/:archiveName', function (req, res) {
	console.log(path.join(__dirname, 'repository', req.params.archiveName))
	res.sendFile(path.join(__dirname, 'repository', req.params.archiveName));
});

router.get('/', withAuth, async function(req, res) {
	Archive.find({}, function(err, archive) {
		if (err) {
		  console.error(err);
		  res.status(500)
			.json({
			error: 'Internal error please try again'
		  });
		} else if (!archive) {
			res.json({})
		} else {
			res.json(archive);
		}
	  });
});
			
router.post('/archive', [upload.any()], function (req, res) {
	let o = new Archive()
	o.type = req.body.type
	o.seed = req.body.seed
	o.coll = req.body.collection
	o.filePath = req.files[0].originalname
	o.name = req.body.name
	
	o.save(function (err, a) {
			if (err) {
				console.log(err)
				res.status(500).send()
			} else {
				console.log(a.id)
				res.status(200).json({ "id": a.id })
			}
	});
})
	
module.exports = router;
