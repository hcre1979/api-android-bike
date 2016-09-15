var mongoose = require('mongoose');

var routeSchema = new mongoose.Schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  coordinates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'coordinates' }]
});

var Route = mongoose.model('routes', routeSchema);

module.exports = Route;
