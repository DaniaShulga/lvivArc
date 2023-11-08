exports.main = (req, res) => {
	const Datastore = require('nedb')
	const dbFileName = 'lvivold.json'
	const db = new Datastore({ filename: dbFileName, autoload: true })
	db.find({"table":"arctype"}, (err, docs) => {
		res.render(path + '/index2', { types: docs })
	})
	// let docs = []
	// docs.push("Церкви та монастирі")
	// docs.push("Оборонні споруди")
	// docs.push("Цивільна архітектура")
	
	// res.render(path + '/index', {types: docs})
}

exports.listObjects = (req,res) => {
	tpId = parseInt(req.params.id)
	// console.log("tpId:",tpId)
	const Datastore = require('nedb')
	const dbFileName = 'lvivold.json'
	const db = new Datastore({ filename: dbFileName, autoload: true })
	db.find({ table:"arcobj", type_id: tpId }, (err, docs) => {
		if (docs.length == 0) {
			res.sendFile(path + '404.html')
		} else {
			// console.log("docs=", docs)
			db.findOne( {table:"arctype", id:tpId }, (err, doc) => {
				res.render(path + '/arcObjects', {objects: docs, type: doc})
			})
		}			
	})
}

exports.object = (req, res) => {
	tpId = parseInt(req.params.id)
	console.log("tpId:",tpId)
	const Datastore = require('nedb')
	const dbFileName = 'lvivold.json'
	const db = new Datastore({ filename: dbFileName, autoload: true })
	db.findOne({ table:"arcobj", id: tpId }, (err, doc) => {
		typeid = doc.type_id
		// console.log("typeid:", typeid)
		db.findOne({ table:"arctype", id: typeid }, (err, type_doc) => {
			res.render(path + '/object', {object: doc, type: type_doc})
		})
	})
}

exports.error404 = (req,res) => {
	res.sendFile(path + '404.html')	
}
