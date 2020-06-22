const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
	name: { type: String },
	type: { type: String },
	date: { type: Date, default: Date.now },
	filePath: { type: String },
	seed: { type: String },
	coll: { type: String },
	hash: { type: String }
});

// type : warc or mhtml
module.exports = mongoose.model('Archive', ArchiveSchema);