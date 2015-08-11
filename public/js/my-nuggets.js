$(document).ready(function(){

var my_nuggets = [];

$('#my-nuggets-table').on('click', 'a.nugget-source-link', function(event) {
  chrome.tabs.create({url: $(this).attr('href')});
  return false;
});

function initialize() {
  Parse.initialize("F1fRCfIIYQzvft22ckZd5CdrOzhVecTXkwfgWflN", "DUoWr9lIjQME2MmqgMApFmWFdzMcl7B6mKfj8AAc");
  validateLogin();
}

function goToLoginPage()
{
  window.location.replace('login');
}

function updateProfileHeader()
{
  var user = Parse.User.current(); 

  var displayname = user.get("displayname"); 
  var tagline = "super user of Nuggets, avid learner"; 
  $('#displayname').html(displayname);
  $('#tagline').html(tagline);
}

function addHighlightMarkup(text, highlightText)
{
  var highlightIndex = text.toLowerCase().indexOf(highlightText);
  var return_markup = "";
  var endOfPreviousHighlightIndex = highlightIndex;
  if (highlightText && highlightIndex != -1)
  {
    return_markup += text.substring(0, highlightIndex);
    do {
      return_markup += '<span class="highlight">' + text.substring(highlightIndex, highlightIndex + highlightText.length) + '</span>';
      endOfPreviousHighlightIndex = highlightIndex + highlightText.length;
      highlightIndex = text.toLowerCase().indexOf(highlightText, highlightIndex + highlightText.length);
      if (highlightIndex == -1)
      {
        break;
      }
      return_markup += text.substring(endOfPreviousHighlightIndex, highlightIndex);
    } while (text.length >= endOfPreviousHighlightIndex + highlightText.length)
    return_markup += text.substring(endOfPreviousHighlightIndex);
    return return_markup;
  }
  return text;
}

function updateMyNuggetsMarkup(results, highlightText)
{
  var my_nuggets_markup = [];
   
   var randomId; 
   var randomFont; 
   var numColumns = 3; 
   var span = 4; 
   var width = $(window).width()
   if(width < 600)
   {
      numColumns = 1; 
      span = 12; 
   }

   var markup_to_push_col1 ='<div class="span'+ span +'">';
   var markup_to_push_col2 ='<div class="span'+ span +'">';
   var markup_to_push_col3 ='<div class="span'+ span +'">';

  for(i=0;i<results.length;i++)
  {
    var markup_to_push = '';
    randomId = Math.round(Math.random()*10) + 1;
    randomFont = Math.round(Math.random()*5) + 1;
    markup_to_push += '<div class="row-fluid f' + randomFont + '"><div class="nugget-wrapper" id="g'+ randomId +'"><div id="' + results[i].id + '" class="nugget-content"><p>' + addHighlightMarkup(results[i].text, highlightText);
    var tags = results[i].tags;
    
    markup_to_push += '<div class="nugget-source-section">'; 
    if (results[i].url && results[i].url != "")
    {
      markup_to_push += '<div class = "nugget-source-link" ><a href="' + results[i].url + '">' + addHighlightMarkup(results[i].source, highlightText) + '</a> </div>';
    }
    else if (results[i].source != "")
    {
      markup_to_push += '<p class="nugget-source">' + addHighlightMarkup(results[i].source, highlightText) + '</p>';
    }
    markup_to_push += '</div>'; 

    markup_to_push += '<div class="nugget-tag-section">'; 
    for (j=0;j<tags.length;j++)
    {
      markup_to_push += ' <span class="nugget-tag">' + addHighlightMarkup('#' + tags[j], highlightText) + '</span>';
    }
    markup_to_push += '</div>'; 
    var timeAgo = moment(results[i].updatedAt).fromNow();
    if (moment().diff(results[i].updatedAt) < 0)  // Parse seems to set updatedAt a couple seconds into the future, so preventing the time-ago tag from saying "in a few seconds"
    {
      timeAgo = moment().fromNow();
    }
    markup_to_push += '<div class="row-fluid nugget-time-ago"><span>' + timeAgo + '</span>';
    markup_to_push += '</div></div>';
    markup_to_push += '<div class ="nugget-toolbar"> <span class="span1 fa nugget-action-icons"><span class = "nugget-action-icons-left"><a class="fa-link nugget-action-icon" style="color:white" target="_blank" href="' + results[i].url + '">' + '</a><a class="fa-twitter nugget-action-icon" style="color:white" target="_blank" href="' + twitterUrl(results[i]) + '""></a></span><span class="nugget-action-icons-right"></span></span></div>';
    markup_to_push += '</div></div>';
    if(numColumns == 3)
    {
      if(i%3 == 0) {
        markup_to_push_col1 += markup_to_push;
      }
      else if (i%3 == 1) markup_to_push_col2 += markup_to_push;
      else if (i%3 == 2) markup_to_push_col3 += markup_to_push;
    } 
    else if (numColumns == 1)
    {
      markup_to_push_col1 += markup_to_push;
    }
    //else markup_to_push_col4 += markup_to_push;
    
  }

  if(numColumns == 3)
  {
  markup_to_push_col1 += "</div></div>";
  markup_to_push_col2 += "</div></div>";
  markup_to_push_col3 += "</div></div>";
  my_nuggets_markup.push(markup_to_push_col1);
  my_nuggets_markup.push(markup_to_push_col2);
  my_nuggets_markup.push(markup_to_push_col3);
  }
  else if(numColumns == 1)
  {
    markup_to_push_col1 += "</div></div>";
    my_nuggets_markup.push(markup_to_push_col1);
  }
  //my_nuggets_markup.push(markup_to_push_col4);
  $('#my-nuggets-table').html(my_nuggets_markup.join(''));
}

function socialPost(nugget, isfb)
{
  if(!isfb)
  {
    var content = nugget.text; 
    var url = nugget.url; 
    var limit = 90; 
    if(url.length == 0) limit = 110; 
    if(content.length > limit) 
    {
      content = content.substring(0,limit);
      content += "... ";
    }
  
  }
    
  return content + url + " via @nuggetsapp"; 
  
  
}

function twitterUrl(nugget)
{
  // ßalert(socialPost(nugget, false)); 
  return "https://twitter.com/intent/tweet?text=" + socialPost(nugget, false); 
}


function facebookUrl(nugget)
{
  var appId = "1622775527965531"; 
  return "https://www.facebook.com/dialog/share?app_id=" + appId + "&display=popup&href=" + socialPost(nugget, true) + "&redirect_uri=" + window.location.href;
}

function runQuery()
{
  var Nugget_User = Parse.Object.extend("Nugget_User");
  var query = new Parse.Query(Nugget_User);
  query.equalTo("user", Parse.User.current()).descending("updatedAt");
  query.notEqualTo("isDeleted", true);
  query.include("nugget");
  query.limit(1000);
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
        updateMyNuggetsMarkup(my_nuggets);
        $('#my-nuggets-search-div').css('display','block');
      }
    }
  });
}

function executeSearch()
{
  var searchText = $('#my-nuggets-search').val().toLowerCase();
  my_nuggets_search_results = [];
  for(i=0;i<my_nuggets.length;i++)
  {
    var indexOfSearchText = my_nuggets[i].text.toLowerCase().indexOf(searchText);
    if (indexOfSearchText != -1)
    {
      my_nuggets_search_results.push(my_nuggets[i]);
    }
    else
    {
      indexOfSearchText = my_nuggets[i].source.toLowerCase().indexOf(searchText);
      if (indexOfSearchText != -1)
      {
        my_nuggets_search_results.push(my_nuggets[i]);
      }
      else
      {
        for(j=0;j<my_nuggets[i].tags.length;j++)
        {
          indexOfSearchText = ('#' + my_nuggets[i].tags[j]).toLowerCase().indexOf(searchText);
          if (indexOfSearchText != -1)
          {
            my_nuggets_search_results.push(my_nuggets[i]);
            break;
          }
        }
      }
    }
  }
  updateMyNuggetsMarkup(my_nuggets_search_results, searchText);
}

$('#my-nuggets-search').on('input', function()
{
  executeSearch();
});

$('#my-nuggets-search-clear').click(function()
{
  $('#my-nuggets-search').val("");
  $('#my-nuggets-search').focus();
  executeSearch();
});

$('#my-nuggets-table').on('mouseenter', 'tr', function()
{
  $(this).find('.nugget-action-icons').css('display','block');
});

$('#my-nuggets-table').on('mouseleave', 'tr', function()
{
  $(this).find('.nugget-action-icons').css('display','none');
});

$('#my-nuggets-table').on('click', '.icon-trash', function()
{
  var nugget_div = $(this).parents('.nugget-wrapper');
  nugget_div.fadeTo(500, 0.2);
  var nugget_id = nugget_div.attr('id');
  var Nugget = Parse.Object.extend("Nugget");
  var nugget = new Nugget();
  nugget.id = nugget_id;
  var Nugget_User = Parse.Object.extend("Nugget_User");
  var query = new Parse.Query(Nugget_User);
  query.equalTo("nugget", nugget);
  query.notEqualTo("isDeleted", true);
  query.include("nugget");
  query.find().then(function(nugget_users) {
    if (nugget_users.length == 1 && nugget_users[0].get("user").id == Parse.User.current().id) // last person to lose connection with this nugget, set nugget as deleted
    {
      nugget_users[0].get("nugget").set("isDeleted", true);
      nugget_users[0].get("nugget").save();
    }
    for (i=0;i<nugget_users.length;i++)
    {
      if (nugget_users[i].get("user").id == Parse.User.current().id)
      {
        nugget_users[i].set("isDeleted", true);
        nugget_users[i].save().then(function() {
          runQuery();
        });
      }
    }
  }, function(error) {
    nugget_div.fadeTo(200, 1.0);
  });
});

function validateLogin() {
  var currentUser = Parse.User.current();
  if (!currentUser)
  {
    goToLoginPage();
  }
  else
  {
    updateProfileHeader(); 
    runQuery();
  }
}

initialize();

$('#logout-button').click(function()
{
  Parse.User.logOut();
  goToLoginPage();
});

});
