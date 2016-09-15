var mongoose = require('mongoose');

var coordinateSchema = new mongoose.Schema({
  lat: { type: Number },
  lon: { type: Number },
  //_route: { type: mongoose.Schema.Types.ObjectId, ref: 'routes' },
  created_at: { type: Date, default: Date.now }
});

var Coordinate = mongoose.model('coordinates', coordinateSchema);

module.exports = Coordinate;
