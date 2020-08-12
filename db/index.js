const { MongoClient } = require("mongodb");

// Connection URI
const uri =
"mongodb+srv://<username>:<password>@angular-node-mongo-5fbgm.mongodb.net"; //paste here your mongodb connection uri 

const dbName= "gibot"
let db;

// Create a connection MongoClient
 const client= MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) return console.log(err);
   db = client.db(dbName);
    console.log(`Connected MongoDB: ${uri}`);
    console.log(`Database: ${dbName}`);
  })
// Returns DB object when called
module.exports.get = function() {
    return db;
}