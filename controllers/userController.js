var middleware = require('middleware');
module.exports = {
    /*
        Will be translated to get("/people") (first level is generated by controller name)
    */
    get_index : function(req, res) {
        res.send("People index page test");
    },
 
    /*
        Will be translated to get("/people") (HTTP-method is extracted by first item in function name)
    */
    post_index : function(req, res) {
        res.send("People index page post method test");
    },
 
    /*
        Will be translated to get("/people/finest") (subsections automatically appended)
    */
    get_finest : function(req, res) {
        res.send("People finest subsection test");
    },
 
    /*
        You may want to have your route passed through an express middleware (i.e. for authentication/authorization
        checks etc.) before your controller function is called. To do that just pass an array of middleware functions
        along with the controller function. 
 
        For example you have a middleware function defined in your middleware:
        exports = function (req, res, next) {
            if(req.session.user) next();
            else res.send('Please login to access this page');
        }
 
        Now you can use this in your controller actions like the example below. Note that you can use any number of 
        middleware functions as you want. To know more about express middleware callback functions in routes, 
        visit this link: http://expressjs.com/guide/routing.html#route-handlers
    */
    get_secured : [middleware.isAuthenticated, function(req, res) {
        res.send("You are requesting an authenticated page.");   
    }],
 
    /*
        Will be translated to get("/people/:id") (parameters automatically extracted from function parameters)
    */
    get_id : function(req, res, id) {
        res.send("You are requesting the resource with id: " + id);
    },
 
    /*
        Will be translated to get("/people/:id/friends") (if parameter is included in function-name, it will be be included in the same position)
    */
    get_id_friends : function(req, res, id) {
        res.send("You are requesting the friends of the person with id: " + id); 
    },
    /*
        Will be translated to get("/people/:userName/friend-requests") (non parameter parts that use camelCase will be separated by hyphens in the url)
    */
    get_userName_friendRequests : function(req, res, userName) {
        res.send("You are requesting the friend requests of the person with user name: " + userName);
    }
}