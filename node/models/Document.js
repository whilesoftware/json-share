
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var DocumentSchema = new mongoose.Schema({
	ip: String,
	data: Schema.Types.Mixed,
	timestamp: Date,
  shortid: String,
  owner: String,
  public: Boolean
});

mongoose.model('Document', DocumentSchema);
