
// var url = 'mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb'; 
// var url = 'mongodb://localhost:27017/'

var Globals = {
    url:'mongodb://localhost:27017/',
    dbName:"hmsdb",
    ensureAuthenticated: function ensureAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            //req.flash('error_msg','You are not logged in');
            res.redirect('/login');
        }
    }
}

module.exports = Globals;
