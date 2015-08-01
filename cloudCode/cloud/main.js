
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.job("testReminderEmail", function(request, status) {

  	// initialize mailgun
  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
    
	var query = new Parse.Query(Parse.User);   // Query for all users  
	var totalUserCount = 0;
	var emailSentCount = 0; 

	query.each(function(user) {
	totalUserCount++; 
	try
	{

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
        //console.log("running nugget_user query...");
        return nuggets_user_query.each(function(nugget_user){
           try
           {
	       var nugget = nugget_user.get("nugget");
	       return nugget.fetch({
					  	success: function(nugget) {
					  	nuggetsToSend.push(nugget);
				  		},
					  error: function(nugget, error) {
					    // The object was not refreshed successfully.
					    console.log("error fetching a  nugget " + user.get("email") + " " + nugget.id + " " + error);
					  }
					});
	   		}
	   		catch(err)
	   		{
	   			console.log("error fetching nugget from nugget_user: " + err);

	   		}
        });		

    }).then(function() {
    	
    	if(nuggetsToSend.length > 0)
        {        	
        	if(emailSentCount > 30) console.log(user.get("displayname"));

        	emailSentCount++;
        	var nuggetsReminderText = "Good Morning, " + user.get("displayname") + "!\n\nHere are your nuggets for the day: \n\n";
        	var htmlNuggetsReminderText = "<p>Good Morning, " + user.get("displayname") + "!";
        	if(emailSentCount > 30) console.log("got name stuff");

        	

			for(i=0; i< nuggetsToSend.length; i++)
	        {
	        	try
	        	{
		        	var count = i + 1;
		        	url = nuggetsToSend[i].get("url");
		        	if (typeof url == "string")
		        	{
			        	if(url.length > 0)
			        	{
			        		url.trim();
			        		url = " (" + url + ")";
			        	}
		        	}
		        	else
		        	{
		        		url = ""; 
		        	}
					nuggetsReminderText = nuggetsReminderText + count + ". " + nuggetsToSend[i].get("text") + url + "\n\n";
					htmlNuggetsReminderText += "<br><p>" + count + ". " + nuggetsToSend[i].get("text") + url + "\n\n";
				}
				catch(err)
				{
					console.log("error populating nugget email text with nuggets: " + err);
				}
			}

		    nuggetsReminderText += "Have a great day,\nNuggets Team\n\nTo share feedback, questions or unsubscribe, email heynuggetsapp@gmail.com";
		    htmlNuggetsReminderText += "<br><br>" + "Have a great day,<br>Nuggets Team";


	        if(emailSentCount > 195)
	        {
	        	//console.log(user.get("displayname") + " " + user.get("email") + " nugget count: " + nuggetsToSend.length);
	    	}
	        //console.log("reminder text: " + nuggetsReminderText); 
	        if(emailSentCount%70 == 0)
	        {
	        Mailgun.sendEmail({
				from: 'Nuggets Reminder<hello@nuggetsapp.com>',
				to: "aswath87@gmail.com",//user.get("email"),
				subject: 'Your Nuggets reminder for the day',
				text: nuggetsReminderText,
				html: htmlNuggetsText("Your Nuggets for the Day", escapeString(htmlNuggetsReminderText)),
			},
			{
			  success: function(httpResponse) {
			    //console.log(httpResponse);
			    //response.success("Email sent!");
			  },
			  error: function(httpResponse) {
			    console.error(httpResponse);
			    //response.error("Uh oh, something went wrong");
			  }
			});
	    	}
	        
		}
    	
        //console.log("DONE HERE");
    });

    return promise;
	}

	catch (err)
	{
		console.log(err);
		return promise;
	}

  })   .then(function() {
    //console.log("leaderBoardStatus complete console log");
    console.log(emailSentCount + " " + totalUserCount);
    status.success(emailSentCount + " emails, " + totalUserCount + " users");   },function(error) {
    console.log(error);
    status.error("error: " + error);   });
 
});

Parse.Cloud.job("sendEmail", function(request, status) {

  	// initialize mailgun
  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
    
	var query = new Parse.Query(Parse.User);   // Query for all users  
	var totalUserCount = 0; 
	var emailSentCount = 0; 
	query.each(function(user) {
	totalUserCount++;
	try
	{
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
		var oneweek = (7 * 24 * 3600 * 1000);
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
	    onedayQuery.include("nugget");
	    onedayQuery.notEqualTo("isDeleted", true); 
	    onedayQuery.greaterThanOrEqualTo("createdAt", onedayback);
	    onedayQuery.equalTo("user", user);

	    var oneweekQuery = new Parse.Query(Nugget_User);
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
        //console.log("running nugget_user query...");
        return nuggets_user_query.each(function(nugget_user){
           try
           {
	       var nugget = nugget_user.get("nugget");
	       return nugget.fetch({
					  	success: function(nugget) {
					  	nuggetsToSend.push(nugget);
				  		},
					  error: function(nugget, error) {
					    // The object was not refreshed successfully.
					    console.log("error fetching a  nugget " + user.get("email") + " " + nugget.id + " " + error);
					  }
					});
	   		}
	   		catch(err)
	   		{
	   			console.log("error fetching a  nugget part2: " + user.get("email") + " " + nugget.id + " " + error);

	   		}
        });		

    }).then(function() {
    	
    	if(nuggetsToSend.length > 0)
        {
        	
        	var nuggetsReminderText = "Good Morning, " + user.get("displayname") + "!\n\nHere are your nuggets for the day: \n\n";
        	var htmlNuggetsReminderText = "<p>Good Morning, " + user.get("displayname") + "!";
        	var htmlUrl = ""; 
			for(i=0; i< nuggetsToSend.length; i++)
	        {
	        	try
	        	{
		        	var count = i + 1;
		        	url = nuggetsToSend[i].get("url");
		        	if (typeof url == "string")
		        	{
			        	if(url.length > 0)
			        	{
			        		url.trim();
			        		htmlUrl = " (<a href = '" + url + "'>" + "source" + "</a>)"; 
			        		url = " (" + url + ")";
			        	}
		        	}
		        	else
		        	{
		        		url = ""; 
		        	}
					nuggetsReminderText = nuggetsReminderText + count + ". " + nuggetsToSend[i].get("text") + url + "\n\n";
					htmlNuggetsReminderText += "<br><p>" + count + ". " + nuggetsToSend[i].get("text") + htmlUrl;
				}
				catch(err)
				{
					console.log("error populating nugget email text " + user.get("email") + " " + error);
				}
			}

		    nuggetsReminderText += "Have a great day,\nNuggets Team\n\nTo share feedback, questions or unsubscribe, email hello@nuggetsapp.com";
		    htmlNuggetsReminderText += "<br><br>" + "Have a great day,<br>Nuggets Team";

	        if(emailSentCount%10 == 0)
	        {
	        	console.log(totalUserCount + " " + user.get("displayname") + " " + user.get("email") + " nugget count: " + nuggetsToSend.length);
	    	}
	        //console.log("reminder text: " + nuggetsReminderText); 
	        
	        if (true)
	        {
		        Mailgun.sendEmail({
					from: 'Nuggets Reminder<hello@nuggetsapp.com>',
					to: user.get("email"),
					subject: 'Your Nuggets reminder for the day',
					text: nuggetsReminderText,
					html: htmlNuggetsText("Your Nuggets for the Day", escapeString(htmlNuggetsReminderText)),
				},
				{
				  success: function(httpResponse) {
				  	emailSentCount++;
				    // console.log(httpResponse);
				  },
				  error: function(httpResponse) {
				    console.error("error sending email: " + user.get("email") + ": " + httpResponse);
				    //response.error("Uh oh, something went wrong");
				  }
				});
	   		}
	    	
	        
		}
    	
        //console.log("DONE HERE");
    });

    return promise;
	}

	catch (err)
	{
		console.log(err);
		return promise;
	}

  })   .then(function() {
    //console.log("leaderBoardStatus complete console log");
    status.success(emailSentCount + " emails, " + totalUserCount + " users");  },function(error) {
    console.log(error);
    status.error("error in last " + emailSentCount);   });
 
});

function escapeString(myVal)
{
	myVal = myVal.replace(/\\/g, '\\\\'); // escape backslashes
	myVal = myVal.replace(/"/g, '\\"');   // escape quotes
	return myVal; 

}

Parse.Cloud.job("welcomeEmail", function(request, status) {

 	var query = new Parse.Query(Parse.User);   
	var d = new Date();
	var oneday = (24 * 3600 * 1000);
	var onedayDelayed = (24 * 3600 * 1000);
	var startTime = new Date(d.getTime() - oneday);
	console.log("start time: " + startTime);
	query.greaterThanOrEqualTo("createdAt", startTime);
	query.limit(1000);
	var userCount = 0; 
	var emailPromises = []; 
	// initialize mailgun
  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
	query.find(function (users) {

			console.log("total users: " + users.length);
			for (index = 0; index < users.length; ++index)
			{
				userCount++;
				user = users[index]; 
				try
				{
					
					var name = user.get("displayname"); 
					var email = user.get("email");
					var htmlEmail = escapeString(htmlWelcomeEmail(name)); 
					htmlEmail = htmlNuggetsText("Do you remember what you learned last week?", htmlEmail); 
					var textEmail = textWelcomeEmail(name);	

					var emailPromise = Mailgun.sendEmail({
											from: "Nuggets <hello@nuggetsapp.com>",
											to: email,
											subject: "Welcome to Nuggets, " + name + "!",
											text: textEmail,
											html: htmlEmail
										});

					//sendEmail("Nuggets <hello@nuggetsapp.com>", "aswath87@gmail.com", "Welcome to Nuggets, " + name +"!", textEmail, htmlEmail); 
					emailPromises.push(emailPromise); 
						

				}

				catch(err)
				{
					console.log("error welcome: " + err + "\n" + err.stack); 
				}

			}

			console.log("email promises: " + emailPromises.length);
			return Parse.Promise.when(emailPromises);
			
		}).then(function(){ 
			console.log("email promises: " + emailPromises.length);
			return Parse.Promise.when(emailPromises);

		}).then(function(){

		    status.success(userCount + " emails.");   },function(error) {
		    console.log(error);
		    status.error("error: " + error);  
     	});  

});

Parse.Cloud.job("adhocWelcomeEmail", function(request, status) {
  	var query = new Parse.Query(Parse.User);   
	var d = new Date();
	var oneday = (24 * 3600 * 1000);
	var onedayDelayed = (23.3 * 3600 * 1000);
	var startTime = new Date(d.getTime() - 10 * onedayDelayed);
	var endTime = new Date(d.getTime() - 7 * oneday);
	console.log(startTime + " " + endTime);
	query.greaterThanOrEqualTo("createdAt", startTime);
	query.lessThan("createdAt", endTime); 
	query.limit(1000);
	var userCount = 0; 
	var emailPromises = []; 
	// initialize mailgun
  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
	query.find(function (users) {

			console.log("total users: " + users.length);
			for (index = 0; index < users.length; ++index)
			{
				userCount++;
				user = users[index]; 
				try
				{
					var name = user.get("displayname"); 
					var email = user.get("email");
					var htmlEmail = escapeString(htmlWelcomeEmail(name)); 
					htmlEmail = htmlNuggetsText("Do you remember what you learned last week?", htmlEmail); 
					var textEmail = textWelcomeEmail(name);	

						var emailPromise = Mailgun.sendEmail({
											from: "Nuggets <hello@nuggetsapp.com>",
											to: email,
											subject: "Welcome to Nuggets, " + name + "!",
											text: textEmail,
											html: htmlEmail
										});

						//sendEmail("Nuggets <hello@nuggetsapp.com>", "aswath87@gmail.com", "Welcome to Nuggets, " + name +"!", textEmail, htmlEmail); 
						emailPromises.push(emailPromise); 
					

				}

				catch(err)
				{
					console.log("error welcome: " + err + "\n" + err.stack); 
				}

			}

			console.log("email promises: " + emailPromises.length);
			return Parse.Promise.when(emailPromises);
			
		}).then(function(){ 
			console.log("email promises: " + emailPromises.length);
			return Parse.Promise.when(emailPromises);

		}).then(function(){

		    status.success(userCount + " emails.");   },function(error) {
		    console.log(error);
		    status.error("error: " + error);  
     	});  

}); 

Parse.Cloud.job("metrics", function(request, status) {

  	// initialize mailgun
  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
    
	var query = new Parse.Query(Parse.User);   // Query for all users  
	var totalUserCount = 0;
	var superUserCount = 0; 
	var enthuUserCount = 0; 
	var tryingUserCount = 0; 
	var noobUser = 0;
	var oneNuggetUser = 0; 
	var zeroUser = 0;

	query.each(function(user) {
	totalUserCount++; 

	try
	{

	var nuggetsToSend = [];     
	var promise = Parse.Promise.as();
	promise = promise.then(function() {
        // return a promise that will be resolved 
        var Nugget_User = Parse.Object.extend("Nugget_User");

	    
	    var onedayQuery = new Parse.Query(Nugget_User);
	    //onedayQuery.include("nugget");
	    onedayQuery.include("nugget");
	    onedayQuery.notEqualTo("isDeleted", true); 
	    onedayQuery.equalTo("user", user);

	    var oneweekQuery = new Parse.Query(Nugget_User);
	    //oneweekQuery.include("nugget");
	    oneweekQuery.notEqualTo("isDeleted", true); 
	    oneweekQuery.include("nugget");
	    oneweekQuery.equalTo("user", user);


	    var arrayOfQueries = [onedayQuery, oneweekQuery]; // threemonthsQuery, sixmonthsQuery, oneyearQuery, twoyearsQuery];
		var nuggets_user_query = Parse.Query.or.apply(Parse.Query, arrayOfQueries); 
        //console.log("running nugget_user query...");
        return nuggets_user_query.each(function(nugget_user){
           try
           {
	       var nugget = nugget_user.get("nugget");
	       nuggetsToSend.push(nugget);
	       /*
	       return nugget.fetch({
					  	success: function(nugget) {
					  	nuggetsToSend.push(nugget);
				  		},
					  error: function(nugget, error) {
					    // The object was not refreshed successfully.
					    console.log("error fetching a  nugget " + user.get("email") + " " + nugget.id + " " + error);
					  }
					});
*/
	   		}
	   		catch(err)
	   		{
	   			console.log("error fetching nugget from nugget_user: " + err);

	   		}
        });		

    }).then(function() {

    	
    	if(nuggetsToSend.length >= 20)
        {        	
        	console.log("su: " + user.get("displayname") + " " + nuggetsToSend.length);
        	superUserCount++; 
	        
		}
		else if (nuggetsToSend.length >= 15)
		{
			console.log("eu: " + user.get("displayname")+ " " + nuggetsToSend.length);
        	enthuUserCount++; 

		}
		else if (nuggetsToSend.length >= 6)
		{
			//console.log("tu: " + user.get("displayname")+ " " + nuggetsToSend.length);
        	tryingUserCount++; 

		}
		else if (nuggetsToSend.length >= 2)
		{
			noobUser++; 
		}
		else if (nuggetsToSend.length == 1)
		{
			oneNuggetUser++; 
		}
		else if(nuggetsToSend.length ==0)
		{
			zeroUser++;

		}
    	
        //console.log("DONE HERE");
    });

    return promise;
	}

	catch (err)
	{
		console.log(err);
		return promise;
	}

  })   .then(function() {
    //console.log("leaderBoardStatus complete console log");
    console.log(totalUserCount + " users, " + superUserCount + " super users >2-, " + enthuUserCount+ " enthu Users >15, " + tryingUserCount + " trying Users (>6), " + noobUser + " noob User (2-6), " + oneNuggetUser + " one nugget users 1, " + zeroUser + " zero users" );
    status.success(totalUserCount + " users, ");   },function(error) {
    console.log(error);
    status.error("error: " + error);   });
 
});

function textWelcomeEmail(name)
{
	var welcomeEmail = "Hi " + name + "," + 
"\n\nDo you remember what you learned last week?" +
"\n\nI am Aswath, the founder of Nuggets. I’m very excited that you welcome you aboard. We built Nuggets because we are avid learners and it bothered us that we forget 90% of what we learn within a week. Nuggets leverages 2 powerful memory techniques, consolidation and spaced repetition, to help you record and remember everything you learn."+
"\n\nHere are 2 quick tips to help you make the most of Nuggets.\
\
\n\n1. Make it a habit\
\nRemember to create nuggets as you learn. For the next ten days, create one every day; it becomes a rewarding habit soon.\
\
\n\n2. Read your reminders\
\nOur reminder emails are specifically curated and timed to maximize retention. It might help to add hello@nuggetsapp.com to your contact list so that your reminders don’t get lost.\
\
\n\nI hope you’ll enjoy using Nuggets. We’d love to hear your feedback, so please drop us a note on the slightest whim.\
\
\n\n\“The greatest thing in life is to keep your mind young.\” - Henry Ford\
\
\n\nKeep learning,\
\nAswath and the Nuggets team"; 

return welcomeEmail; 
}

function htmlWelcomeEmail(name)
{
	var welcomeEmail = "<p>Hi " + name + "," +
"<br><br>I am Aswath, the founder of Nuggets. I’m very excited to welcome you aboard. We built Nuggets because we are avid learners and it bothered us that <b>we forget 90% of what we learn within a week</b>. Nuggets leverages 2 powerful techniques, consolidation and spaced repetition, to help you record and remember everything you learn.\
\
<br><br>Here are 2 quick tips to help you make the most of Nuggets.\
\
<br><br><b>1. Make it a habit</b>\
<br>Remember to create nuggets as you learn. For the next ten days, create one every day; it becomes a rewarding habit soon.\
\
<br><br><b>2. Read your reminders</b>\
<br>Our reminder emails are specifically curated and timed to maximize retention. It might help to add hello@nuggetsapp.com to your contact list so that your reminders don’t get lost.\
\
<br><br>I hope you’ll enjoy using Nuggets. We’d love to hear your thoughts and feedback, so please drop us a note on the slightest whim.\
\
<br><br>“<i>The greatest thing in life is to keep your mind young.</i>” - Henry Ford\
\
<br><br>Keep learning,\
<br>Aswath and the Nuggets team</p>"; 

return welcomeEmail; 
}

function sendEmail(from, to, subject, text, html) {

	var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
	
	return Mailgun.sendEmail({
					from: from,
					to: to,
					subject: subject,
					text: text,
					html: html
				});
}

function htmlNuggetsText(title, nuggetsText) {

var htmlstring = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\
<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">\
<head>\
<meta name="viewport" content="width=device-width" />\
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\
<title>Nuggets</title>\
<style type="text/css">\
img {\
max-width: 100%;\
}\
body {\
-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;\
}\
body {\
background-color: #f6f6f6;\
}\
@media only screen and (max-width: 640px) {\
  body {\
    padding: 0 !important;\
  }\
  h1 {\
    font-weight: 800 !important; margin: 20px 0 5px !important;\
  }\
  h2 {\
    font-weight: 800 !important; margin: 20px 0 5px !important;\
  }\
  h3 {\
    font-weight: 800 !important; margin: 20px 0 5px !important;\
  }\
  h4 {\
    font-weight: 800 !important; margin: 20px 0 5px !important;\
  }\
  h1 {\
    font-size: 22px !important;\
  }\
  h2 {\
    font-size: 18px !important;\
  }\
  h3 {\
    font-size: 16px !important;\
  }\
  .container {\
    padding: 0 !important; width: 100% !important;\
  }\
  .content {\
    padding: 0 !important;\
  }\
  .content-wrap {\
    padding: 10px !important;\
  }\
  .invoice {\
    width: 100% !important;\
  }\
}\
</style>\
</head>\
\
<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">\
<table class="body-wrap" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>\
		<td class="container" width="600" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">\
			<div class="content" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">\
				<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-warning" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #7F00BD; margin: 0; padding: 20px;" align="center" bgcolor="#7F00BD" valign="top">'
							+ title + 
						'</td>\
					</tr><tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">\
							<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'
										+ nuggetsText + 
										'</table></td>\
					</tr></table><div class="footer" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">\
					<table width="100%" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">To share feedback, questions or unsubscribe, email hello@nuggetsapp.com</td>\
						</tr></table></div></div>\
		</td>\
		<td style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>\
	</tr></table></body>\
</html>'


return htmlstring; 

}


