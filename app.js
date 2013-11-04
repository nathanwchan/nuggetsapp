
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ParseClass = require('parse').Parse;
var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login/:id?', function(req, res) {
    res.render('login', {
        title: 'New Employee'
    });
});
app.get('/user/:id', function(req, res) {
    res.render('my-nuggets', {
        user: req.params.id
    });
});
app.get('/login', function(req, res) {
    res.render('login');
});
app.get('/create', function(req, res) {
    res.render('create');
});
app.get('/my-nuggets', function(req, res) {
    res.render('my-nuggets');
});
app.get('/nuggets/:id', function(req, res) {
    
    res.render('shownuggets');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var NUGGETS_FILTER_TYPE = {
  USER : 0, 
  TAG: 1, 
  CUR_USER:2
};

function runQuery(nuggets_filter_type, filter)
{
  var Parse = ParseClass.initialize("F1fRCfIIYQzvft22ckZd5CdrOzhVecTXkwfgWflN", "DUoWr9lIjQME2MmqgMApFmWFdzMcl7B6mKfj8AAc");
  //var Nugget_User = Parse.Object.extend("Nugget_User");
  var query = new Parse.Query(Parse.Nugget_User);
  if(nuggets_filter_type == 1)
  {
    query.descending("updatedAt");
    query.notEqualTo("isDeleted", true);
    query.include("nugget");
  }
  query.find({
    success: function(results_nugget_user) {
      if (results_nugget_user.length == 0)
      {
        $('#my-nuggets-table').html('<p>none</p>');
        $('#my-nuggets-search-div').css('display','none');
      }
      else
      {
        var results = $.map(results_nugget_user, function(nugget_user) {
          var nugget = nugget_user.get("nugget");
          var return_object = new Object();
          return_object.id = nugget.id;
          return_object.text = nugget.get("text");
          if (!nugget.get("tags"))
          {
            return_object.tags = [];
          }
          else
          {
            return_object.tags = nugget.get("tags");
          }
          return_object.url = nugget.get("url");
          return_object.source = nugget.get("source");
          return_object.updatedAt = nugget_user.updatedAt;
          return return_object;
        });
        my_nuggets = results;
        return updateMyNuggetsMarkup(my_nuggets);
        //$('#my-nuggets-search-div').css('display','block');
      }
    }
  });
}

function updateMyNuggetsMarkup(results, highlightText)
{
  var my_nuggets_markup = [];
   var markup_to_push_col1 ='<div class="span3">';
   var markup_to_push_col2 ='<div class="span3">';
   var markup_to_push_col3 ='<div class="span3">';
   var markup_to_push_col4 ='<div class="span3">';
  for(i=0;i<results.length;i++)
  {
    var markup_to_push = '';
    markup_to_push += '<div class="row-fluid"><div class="nugget-wrapper"><div id="' + results[i].id + '" class=""><p>' + addHighlightMarkup(results[i].text, highlightText);
    var tags = results[i].tags;
    for (j=0;j<tags.length;j++)
    {
      markup_to_push += ' <span class="nugget-tag">' + addHighlightMarkup('#' + tags[j], highlightText) + '</span>';
    }
    markup_to_push += '</p>'
    if (results[i].url && results[i].url != "")
    {
      markup_to_push += '<p><a href="' + results[i].url + '" class="nugget-source-link">' + addHighlightMarkup(results[i].source, highlightText) + '</a></p>';
    }
    else if (results[i].source != "")
    {
      markup_to_push += '<p class="gray">' + addHighlightMarkup(results[i].source, highlightText) + '</p>';
    }
    var timeAgo = moment(results[i].updatedAt).fromNow();
    if (moment().diff(results[i].updatedAt) < 0)  // Parse seems to set updatedAt a couple seconds into the future, so preventing the time-ago tag from saying "in a few seconds"
    {
      timeAgo = moment().fromNow();
    }
    markup_to_push += '<div class="row-fluid"><span class="nugget-time-ago">' + timeAgo + '</span>';
    markup_to_push += '<span class="span1 pull-right nugget-action-icons" style="display: none;"><i class="icon-trash nugget-action-icon"></i></span>';
    markup_to_push += '</div></div></div></div>';
    if(i%4 == 0) {
      markup_to_push_col1 += markup_to_push;
    }
    else if (i%4 == 1) markup_to_push_col2 += markup_to_push;
    else if (i%4 == 2) markup_to_push_col3 += markup_to_push;
    else markup_to_push_col4 += markup_to_push;
    
  }
  markup_to_push_col1 += "</div></div>";
  markup_to_push_col2 += "</div></div>";
  markup_to_push_col3 += "</div></div>";
  markup_to_push_col4 += "</div></div>";
  my_nuggets_markup.push(markup_to_push_col1);
  my_nuggets_markup.push(markup_to_push_col2);
  my_nuggets_markup.push(markup_to_push_col3);
  my_nuggets_markup.push(markup_to_push_col4);
  return my_nuggets_markup;
  //$('#my-nuggets-table').html(my_nuggets_markup.join(''));
}

