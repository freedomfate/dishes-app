var mongo = require('mongodb');

var Db = mongo.Db,
	Server = mongo.Server,
	BSON = mongo.BSONPure;

var server = new Server("localhost", 27017);
var db = new Db('dish', server);

db.open(function (err, db) {
    if(!err) {
        console.log("Connected to 'dishes' database");
        db.collection('dishes', function(err, collection) {
            if (err) {
                console.log("The 'dishes' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findAll = function (req, res) {
	db.collection('dishes', function (err, collection) {
		var queryParams = {};

		if (req.query.filter) {
			var regex = { $regex: '.*' + req.query.filter + '.*', $options: 'i' };
			queryParams['$or'] = [
				{ name: regex },
				{ ingredients: regex}
			];
		}

		collection.find(queryParams).toArray(function (err, rows) {
			res.json({
				dishes: rows
			});
		});
	});
};

exports.findById = function (req, res) {
	var id = req.params.id;
	db.collection('dishes', function (err, collection) {
		collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, row) {
			res.json({
				dish: row
			});
		});
	});
}