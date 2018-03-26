
// var url = 'mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb'; 
// var url = 'mongodb://localhost:27017/'

//to update data to the server 
//mongodump //as administrator
//mongorestore -h ds255588.mlab.com:55588 -d hmsdb -u EmadAlareefi -p emadalareefi "C:\Program Files\MongoDB\Server\3.6\bin\dump\hmsdb"

var Globals = {
    url:'mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb',
    dbName:"hmsdb"
}

module.exports = Globals;
