
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.job("sendEmail", function(request, status) {

  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
	
	var query = new Parse.Query(Parse.User);   // Query for all users  

	query.each(function(user) {

	var nuggetsToSend = [];     
	var promise = Parse.Promise.as();
	promise = promise.then(function() {
        // return a promise that will be resolved 
        var Nugget_User = Parse.Object.extend("Nugget_User");
	 	//var nuggets_user_query = new Parse.Query(Nugget_User);
	    //nuggets_user_query.include("nugget");
	    //nuggets_user_query.equalTo("user", user); 
	    var d = new Date();
		var oneday = (24 * 3600 * 1000);
		var oneweek = (9 * 24 * 3600 * 1000);
		var twoweeks = (2 * 7 * 24 * 3600 * 1000);
		var onemonth = (30 * 24 * 3600 * 1000);
		var threemonths = (3 * 30 * 24 * 3600 * 1000);
		var sixmonths = (6 * 30 * 24 * 3600 * 1000);
		var oneyear = (12 * 30 * 24 * 3600 * 1000);
		var twoyears = (2 * 12 * 30 * 24 * 3600 * 1000);

		var onedayback = new Date(d.getTime() - oneday);
		var oneweekback = new Date(d.getTime() - (oneweek));
		var twoweeksback = new Date(d.getTime() - (twoweeks));
		var onemonthback = new Date(d.getTime());
		onemonthback.setMonth(d.getMonth() - 1);
		var threemonthsback = new Date(d.getTime());
		threemonthsback.setMonth(d.getMonth() - 3);
		var sixmonthsback = new Date(d.getTime());
		sixmonthsback.setMonth(d.getMonth() - 6);
		var oneyearback = new Date(d.getTime());
		oneyearback.setMonth(d.getMonth() - 12);
		var twoyearsback = new Date(d.getTime());
		twoyearsback.setMonth(d.getMonth() - 24);

	    
	    var onedayQuery = new Parse.Query(Nugget_User);
	    //onedayQuery.include("nugget");
	    onedayQuery.include("nugget");
	    onedayQuery.notEqualTo("isDeleted", true); 
	    onedayQuery.greaterThanOrEqualTo("createdAt", onedayback);
	    onedayQuery.equalTo("user", user);

	    var oneweekQuery = new Parse.Query(Nugget_User);
	    //oneweekQuery.include("nugget");
	    oneweekQuery.notEqualTo("isDeleted", true); 
	    oneweekQuery.include("nugget");
	    oneweekQuery.greaterThanOrEqualTo("createdAt", oneweekback);
	    oneweekQuery.lessThan("createdAt", new Date(oneweekback.getTime() + oneday));
	    oneweekQuery.equalTo("user", user);

	    var twoweeksQuery = new Parse.Query(Nugget_User);
	    twoweeksQuery.include("nugget");
	    twoweeksQuery.notEqualTo("isDeleted", true); 
	    twoweeksQuery.greaterThanOrEqualTo("createdAt", twoweeksback);
	   	twoweeksQuery.lessThan("createdAt", new Date(twoweeksback.getTime() + oneday));
	    twoweeksQuery.equalTo("user", user);

	    var onemonthQuery = new Parse.Query(Nugget_User);
	    onemonthQuery.include("nugget");
	    onemonthQuery.notEqualTo("isDeleted", true); 
	    onemonthQuery.greaterThanOrEqualTo("createdAt", onemonthback);
	    onemonthQuery.lessThan("createdAt", new Date(onemonthback.getTime() + oneday));
	    onemonthQuery.equalTo("user", user);

	    var threemonthsQuery = new Parse.Query(Nugget_User);
	    threemonthsQuery.include("nugget");
	    threemonthsQuery.notEqualTo("isDeleted", true); 
	    threemonthsQuery.greaterThanOrEqualTo("createdAt", threemonthsback);
	    threemonthsQuery.lessThan("createdAt", new Date(threemonthsback.getTime() + oneday));
	    threemonthsQuery.equalTo("user", user);

	    var sixmonthsQuery = new Parse.Query(Nugget_User);
	    sixmonthsQuery.include("nugget");
	    sixmonthsQuery.notEqualTo("isDeleted", true); 
	    sixmonthsQuery.greaterThanOrEqualTo("createdAt", sixmonthsback);
	    sixmonthsQuery.lessThan("createdAt", new Date(sixmonthsback.getTime() + oneday));
	    sixmonthsQuery.equalTo("user", user);

	    var oneyearQuery = new Parse.Query(Nugget_User);
	    oneyearQuery.include("nugget");
	    oneyearQuery.notEqualTo("isDeleted", true); 
	    oneyearQuery.greaterThanOrEqualTo("createdAt", oneyearback);
	    oneyearQuery.lessThan("createdAt", new Date(oneyearback.getTime() + oneday));
	    oneyearQuery.equalTo("user", user);

	    var twoyearsQuery = new Parse.Query(Nugget_User);
	    twoyearsQuery.include("nugget");
	    twoyearsQuery.notEqualTo("isDeleted", true); 
	    twoyearsQuery.greaterThanOrEqualTo("createdAt", twoyearsback);
	    twoyearsQuery.lessThan("createdAt", new Date(twoyearsback.getTime() + oneday));
	    twoyearsQuery.equalTo("user", user);

	    var randmomQuery = new Parse.Query(Nugget_User);
	    randmomQuery.include("nugget");
	    randmomQuery.equalTo("user", user);
	    randmomQuery.limit(1); 

	    var arrayOfQueries = [onedayQuery, oneweekQuery, twoweeksQuery, onemonthQuery, threemonthsQuery, sixmonthsQuery, oneyearQuery, twoyearsQuery]; // threemonthsQuery, sixmonthsQuery, oneyearQuery, twoyearsQuery];
		var nuggets_user_query = Parse.Query.or.apply(Parse.Query, arrayOfQueries); 
        console.log("running nugget_user query...")
        return nuggets_user_query.each(function(nugget_user){
	       var nugget = nugget_user.get("nugget");
	       return nugget.fetch({
					  	success: function(nugget) {
					  	nuggetsToSend.push(nugget);
				  		},
					  error: function(nugget, error) {
					    // The object was not refreshed successfully.
					    console.log(error);
					  }
					});
        });		

    }).then(function() {
    	
    	if(nuggetsToSend.length > 0)
        {
        	var nuggetsReminderText = "Good Morning, " + user.get("displayname") + "!\n\nHere are your nuggets for the day: \n\n";

			for(i=0; i< nuggetsToSend.length; i++)
	        {
	        	var count = i + 1;
	        	url = nuggetsToSend[i].get("url");
	        	url.trim(); 
	        	if(url.length > 0)
	        	{
	        		url = " (" + url + ")";
	        	}
				nuggetsReminderText = nuggetsReminderText + count + ". " + nuggetsToSend[i].get("text") + url + "\n\n";
			}

		    nuggetsReminderText += "Have a great day,\nNuggets Team\n\nTo share feedback, questions or unsubscribe, email heynuggetsapp@gmail.com"
	        console.log("reminder text: " + nuggetsReminderText); 

	        console.log(user.get("email"));
	        Mailgun.sendEmail({
				from: 'Nuggets reminder<mailgun@nuggetsapp.com>',
				to: user.get("email"),
				subject: 'Your nuggets for the day',
				text: nuggetsReminderText,
			},
			{
			  success: function(httpResponse) {
			    console.log(httpResponse);
			    //response.success("Email sent!");
			  },
			  error: function(httpResponse) {
			    console.error(httpResponse);
			    //response.error("Uh oh, something went wrong");
			  }
			});
		}
    	
        //console.log("DONE HERE");
    });

    return promise;

  })   .then(function() {
    //console.log("leaderBoardStatus complete console log");
    status.success("Reminder emails sent!");   },function(error) {
    	console.log(error);
    status.error("Uh oh, someting went wrong");   });
 
});
