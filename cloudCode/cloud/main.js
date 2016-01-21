
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
		var threedays = (3 * 24 * 3600 * 1000);
		var oneweek = (9 * 24 * 3600 * 1000);
		var twoweeks = (2 * 7 * 24 * 3600 * 1000);
		var onemonth = (30 * 24 * 3600 * 1000);
		var threemonths = (3 * 30 * 24 * 3600 * 1000);
		var sixmonths = (6 * 30 * 24 * 3600 * 1000);
		var oneyear = (12 * 30 * 24 * 3600 * 1000);
		var twoyears = (2 * 12 * 30 * 24 * 3600 * 1000);

		var onedayback = new Date(d.getTime() - oneday);
		var threedaysback = new Date(d.getTime() - threedays); 
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

	    /*var threedayQuery = new Parse.Query(Nugget_User);
	    //oneweekQuery.include("nugget");
	    threedayQuery.notEqualTo("isDeleted", true); 
	    threedayQuery.include("nugget");
	    threedayQuery.greaterThanOrEqualTo("createdAt", threedaysback);
	    threedayQuery.lessThan("createdAt", new Date(threedays.getTime() + oneday));
	    threedayQuery.equalTo("user", user);*/

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
        	if(emailSentCount%30 ==0) console.log(user.get("displayname"));

        	emailSentCount++;
        	var nuggetsReminderText = "Good Morning, " + user.get("displayname") + "!\n\nHere are your nuggets for the day: \n\n";
        	var htmlNuggetsReminderText = "<p>Good Morning, " + user.get("displayname") + "!";
        	
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
	        if(emailSentCount % 30 == 0)
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
			    console.error(httpResponse.text);
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
		var threedays = (3 * 24 * 3600 * 1000);
		var oneweek = (7 * 24 * 3600 * 1000);
		var twoweeks = (2 * 7 * 24 * 3600 * 1000);
		var onemonth = (30 * 24 * 3600 * 1000);
		var threemonths = (3 * 30 * 24 * 3600 * 1000);
		var sixmonths = (6 * 30 * 24 * 3600 * 1000);
		var oneyear = (12 * 30 * 24 * 3600 * 1000);
		var twoyears = (2 * 12 * 30 * 24 * 3600 * 1000);

		var onedayback = new Date(d.getTime() - oneday);
		var threedaysback = new Date(d.getTime() - threedays); 
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

	    /*var threedayQuery = new Parse.Query(Nugget_User);
	    threedayQuery.notEqualTo("isDeleted", true); 
	    threedayQuery.include("nugget");
	    threedayQuery.greaterThanOrEqualTo("createdAt", threedaysback);
	    threedayQuery.lessThan("createdAt", new Date(threedays.getTime() + oneday));
	    threedayQuery.equalTo("user", user);*/

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
		        	source = nuggetsToSend[i].get("source");
		        	sourceArray = source.split(' ').slice(0,4); // get only the first 4 words of the source 
		        	source = sourceArray.join(' ') + "..."; 
		        	source = source.length>0? source : "source"; // display 'source' if url doesn't have a source

		        	htmlUrl = "";
		        	if (typeof url == "string")
		        	{
			        	if(url.length > 0)
			        	{
			        		url.trim();
			        		htmlUrl = " (<a href = '" + url + "'>" + source + "</a>)"; 
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

	        if(emailSentCount%20 == 0)
	        {
	        	console.log("sent email to: " + totalUserCount + " " + user.get("displayname") + " " + user.get("email") + " nugget count: " + nuggetsToSend.length);
	    	}
	        //console.log("reminder text: " + nuggetsReminderText); 
	        
	        if (true)
	        {
		        Mailgun.sendEmail({
					from: 'Nuggets Reminder<hello@nuggetsapp.com>',
					to: user.get("email"),
					//to: "aswath87@gmail.com",
					subject: 'Your Nuggets reminder for the day',
					text: nuggetsReminderText,
					html: htmlNuggetsText("Your Nuggets for the Day", escapeString(htmlNuggetsReminderText)),
				},
				{
				  success: function(httpResponse) {
				  	emailSentCount++;
				  },
				  error: function(httpResponse) {
				    console.error("error sending email: " + user.get("email") + ": " + httpResponse.text);
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
	var onedayDelayed = (24 * 3600 * 1000);
	var startTime = new Date(d.getTime() - 7 * onedayDelayed);
	var endTime = new Date(d.getTime() - 4 * oneday);
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

Parse.Cloud.job("superUsers", function(request, status) {

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
	var emails = ""; 

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

    	
    	if(nuggetsToSend.length >= 15)
        {        	
        	emails += user.get("email") + ", "; 
	        
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
    console.log(emails);
    status.success(totalUserCount + " users, ");   },function(error) {
    console.log(error);
    status.error("error: " + error);   });
 
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
        	//console.log("su: " + user.get("displayname") + " " + nuggetsToSend.length);
        	superUserCount++; 
	        
		}
		else if (nuggetsToSend.length >= 15)
		{
			//console.log("eu: " + user.get("displayname")+ " " + nuggetsToSend.length);
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

Parse.Cloud.job("zeroNuggetNudgeEmailActual", function(request, status) {

  	// initialize mailgun
    var Mailgun = require('mailgun');
	Mailgun.initialize('nuggetsapp.com','key-7p2xc8vjbmzs3aoz333-pnjbk0ahbqf8');
	var query = new Parse.Query(Parse.User);   // Query for all users  

	// find users who joined 1 week back and have not created any nuggets
	var d = new Date();
	var oneday = (24 * 3600 * 1000);
	var oneweek = (7 * 24 * 3600 * 1000);
	var oneweekback = new Date(d.getTime() - (oneweek));
	query.greaterThanOrEqualTo("createdAt", oneweekback);
	query.lessThan("createdAt", new Date(oneweekback.getTime() + oneday));

	var zeroNuggetsUsers = [];  
	var promises = [];
	console.log("staring zero nugget nudge"); 

	query.each(function(user) {

		var promise = Parse.Promise.as();
		try
		{	   
			promise = promise.then(function() 
			{
		        var Nugget_User = Parse.Object.extend("Nugget_User");
			    
			    var usersQuery = new Parse.Query(Nugget_User);
			    usersQuery.include("nugget");
			    usersQuery.notEqualTo("isDeleted", true); 
			    usersQuery.equalTo("user", user);

		        return usersQuery.find(
		        {
		        	success: function(nugget_users) {
					    if(nugget_users.length == 0)
					    {
					    	zeroNuggetsUsers.push(user);
					    }
					  },

					error: function(object, error) {
					    // error is an instance of Parse.Error.
					  } 
	        	});		

    		});
    		promises.push(promise); 

    	
		}

		catch (err)
		{
			console.log(err);
		}

		

  }).then(function(){

  	return Parse.Promise.when(promises);

  }).then(function() {
  	console.log(zeroNuggetsUsers.length + " zero nugget users"); 
  	var emailPromises = []; 
    for (var i = 0; i < zeroNuggetsUsers.length; i++) 
    {
	    if (true)
	    {
	    	var name = zeroNuggetsUsers[i].get("displayname"); 
			var email = zeroNuggetsUsers[i].get("email");
			var htmlEmail = escapeString(htmlZeroNuggetsNudgeEmail(name)); 
			htmlEmail = htmlNuggetsText("You may be forgeting the things you are learning!", htmlEmail); 
			var textEmail = textZeroNuggetsNudgeEmail(name);	

			var emailPromise = Mailgun.sendEmail({
				from: "Nuggets <hello@nuggetsapp.com>",
				to: email,
				subject: "Plug your leaky bucket, " + name + "!",
				text: textEmail,
				html: htmlEmail,
			});

			emailPromises.push(emailPromise); 

	    }
    //Do something
	}
	return Parse.Promise.when(emailPromises);
	}).then(function() {
	    status.success(zeroNuggetsUsers.length + " zero nugget users");   },function(error) {
	    console.log(error);
	    status.error("error: " + error);   
	});

 
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

function textZeroNuggetsNudgeEmail(name)
{
	var nudgeEmail = "Hi " + name + "," +

"\n\nWe noticed that you haven’t created any nuggets since you joined. As an avid learner, you are missing  out. You could be benefiting a lot more from what you learn! \
\
\n\nHow so? Our brains are like leaky buckets: we forget 90% of what we learn within a week. Nuggets fixes this by leveraging 2 powerful memory techniques, consolidation and spaced repetition. Thousands of users are using Nuggets every day to plug the leaks effectively and are experiencing significant benefits. \
\
\n\nHere's a simple challenge to help you plug the leak: \
For the next 1 week, create a nugget every single day; we promise you'll develop a life-changing habit by the end of the week.\
\
\n\nIf there's anything that we can do to make Nuggets easier to use, don't hesitate to let us know. We’d love to hear your feedback. \
\
\n\n\“The greatest thing in life is to keep your mind young.\” - Henry Ford\
\
\n\nKeep learning,\
\nNuggets team"; 

return nudgeEmail; 
}

function htmlZeroNuggetsNudgeEmail(name)
{
	var nudgeEmail = "<p>Hi " + name + "," +

"<br><br><div style='text-align:center;'> \
<img src='http://s24.postimg.org/z1m4b3aat/Fotolia_57816794_S1.jpg' width='400' border='0'> \
</div>" + 

"<br><br>We noticed that you haven’t created any nuggets since you joined.<b> As an avid learner, you are missing  out.</b> You could be benefiting a lot more from what you learn! \
\
<br><br>How so? Our brains are like leaky buckets: <i> we forget 90% of what we learn within a week</i>. Nuggets fixes this by leveraging 2 powerful memory techniques, consolidation and spaced repetition. Thousands of users are using Nuggets every day to plug the leaks effectively and are experiencing significant benefits. \
\
<br><br><b>Here's a simple challenge to help you plug the leak:</b> \
For the next 1 week, create a nugget every single day; we promise you'll develop a life-changing habit by the end of the week.\
\
<br><br>If there's anything that we can do to make Nuggets easier to use, don't hesitate to let us know. We’d love to hear your feedback. \
\
<br><br>“<i>The greatest thing in life is to keep your mind young.</i>” - Henry Ford\
\
<br><br>Keep learning,\
<br>Nuggets team</p>"; 

return nudgeEmail; 
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

var shareString = "Like Nuggets? Help us by sharing with your friends."; 
var fbShareUrl = 'http://www.facebook.com/share.php?u=http://www.provientmarketing.com'; 
var tweetUrl = 'https://twitter.com/home?status=I%20am%20using%20%40nuggets_app%20to%20remember%20what%20I%20learn!%20Try%20it%20out%20www.nuggetsapp.com';

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
				<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff">\
					<tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">\
						<td class="alert alert-warning" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #7F00BD; margin: 0; padding: 20px;" align="center" bgcolor="#7F00BD" valign="top">'
							+ title + 
						'</td>\
					</tr>\
					<tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">\
							<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'
										+ nuggetsText + '</table></td>\
					</tr>\

					<td class="alert alert-warning" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #7F00BD; margin: 0; padding: 20px;" align="center" bgcolor="#7F00BD" valign="top">'
							+ shareMessage + 
							'<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse"><tbody><tr><td valign="top" style="padding:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse"><tbody><tr><td align="center" style="padding-top:0;padding-left:9px;padding-bottom:0;padding-right:9px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px none #eeeeee;border-collapse:collapse"><tbody><tr><td align="center" valign="top" style="padding-top:9px;padding-right:9px;padding-left:9px"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td align="left" valign="top"><table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td valign="top" style="padding-right:9px;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:separate;border:1px solid #cccccc;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;background-color:#fafafa"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:9px;padding-bottom:5px;padding-left:9px"><table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:collapse"><tbody><tr><td align="center" valign="middle" width="24"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76uLTpWEUK5gUMsRzvj5WeNE7ikAkKU7UHqaAOWiDNgtVmnRe1a05HllhmJeic8ahdtOe-2BCDa7SVuUhcf7h5Ci-2Fcf2Pa-2FkHM3P9PvghfT61QL2hlWaCsmxYXLDofwXmCS3i57sBXA3SZJut1ZY6eZPzYh-2FHy5dr7SH8wiDzZex0BwLmShf5rJurmrgR3gP6yg7v-2FpE6hwl8lRuvIMYjVexTeO4fAziUe48ICJ6T8rp51tM2TAWfpYp1d-2Brp3t5V99ff-2BBAfadFIJ7CWA0plZS9hQaQVXNAmhkNbqjz689eyTYmiUr-2F39pjDpcHYNTYTG5X05VmMGeQXav9PTtjqqK2f38DKd8vLhhNbc07a1e9D5G-2BXkAMBplFtZzyMxym12z4pvDkv8t3QRdiifbhV1TXXzHAeNACof4bPVjNeiJWbBlLWkKD816UNNybunxQDLygxY4cVBQyJsUxsKwEdq9wvdLCbT7IPOqZjSCLkkSnPKPOt-2B6HiQan5ZcFzn9wG6ekD5RqsSY-2BqoePlxZ1tQlGciQJuR5e4jfMiWzTMM-2FrTeEKFIXh2WtsNCaE4dQVwRlNl-2FWkIo1MasV2N4UwSbC2DQ7khEZSxVhzkAO1Cbbwjbka8AywKu8jzB2Y8ygon2uOoZWClveNo5vzBVFhfMfWCBi7q5ELvEGbSwAxniV4UhluT0TexIX8fNprZyi-2FQYXLLdof2hAuzpqzRYBP1XR40c-3D_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BYQdXiiET1qHl-2BckRYp2zyHzsZslXdp1atWdOt0WRfQdD3BPFZYemSIn8gYkaAPQUFo6OJrozdzRjwo12SgJs8IjHIiOr7Eu50joZI0X9-2BfNS0s-2Fn2sXlTfBSbgOvj1xYfoTnQR6cF6dY0YSPU5-2BLnQ-3D-3D" style="word-wrap:break-word" target="_blank"><img src="https://ci4.googleusercontent.com/proxy/X9MqCnSCvb5f1PshSVntsSqqm9dNg_ie7HbGsGn_ezsyhoBi1KL0re94Q0I4KPY2mGVpcW3dKRZwm_0bekmhL_IFCF7C82_1xXG2ZkrezDWf6kPh_gik805bm8zRcbMSMw=s0-d-e1-ft#http://cdn-images.mailchimp.com/icons/social-block-v2/color-facebook-48.png" style="display:block;border:0;outline:none;text-decoration:none" height="24" width="24" class="CToWUd"></a></td><td align="left" valign="middle" style="padding-left:5px"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76uLTpWEUK5gUMsRzvj5WeNGerVzyan3wWeRF3HVkWIptTDC03ifWETiFIVZB0ITK5Gt8aVA6LsZeBmnS45k49Lo9AYdkHWzOFIkSoNnNsTPfaupy4ut0Ug7FRWXqf35WqwPdxTNDXLsCtZxrRZUHsV2fkxhn5sjSk9qCtjxixUD0cc2HdJTbp6UZOjAjk8iIACBUjmKc2srNX8QNUvIGg3e4q1KrzymbcJw-2F5Lb2sw0m-2BNk9toZI1lcCS6c2rNRjFh4dKX-2FAH6PFjqbhymw5vq5h6ddfTUTxhqKAWb8XM1IgMEC2m5tUr-2FwZEynMUgRnzmQKua99Hkmp9s0a7si0eVcwlXxQ1jSEjgh1TPqK1paTYtpjV89wM-2BZPQ2-2Bce-2BdvDn0iLx2vf136excNxJ4iIA0l2DxNRWzgMJKFxL6dnKaOH0Ws2c88jpusi9xjlRnD-2F-2FO0597DSzX7eD6SascMn-2BNUxWQmT8yGnfW3PTvURJO2LEwi3JTf0ixAxIvevGOWDV0F6zyvsDE-2FK2I8Hn6QZLjolU6qFG-2BnxHM0CtU9gZq9YL5n3u8p5iU7TZ1ZufotDbyt5V6mwFqiI4VYg1HMimPnM2uLoLhScDyvsfc7UkJXcI2rYEk1deagXGsLQBDXTiBK-2Bo3gPHlymxmv4PWEPQ8Vbqs3QU9W58bvxl7Whs3J3UnbatPL1xYg4MDEWt2V8MEQxz1CRKeIkLuy1iaCX0U-3D_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BVwj-2Flp3QT4YZMqcxvDXyDpQ6fIozrDH5mHVsr2h0sVzb5op8eooVDpUm7YaIKZ6rukqF6YO3XPEMcOjGI8nxXjujRmer57I93uooFr3HTKNYVkGvGKqk4sJU1xipITjcOQvBwEENUuCpvz9zvalsjA-3D-3D" style="color:#505050;font-family:Arial;font-size:12px;font-weight:normal;line-height:100%;text-align:center;text-decoration:none;word-wrap:break-word" target="_blank">Share</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td valign="top" style="padding-right:9px;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:separate;border:1px solid #cccccc;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;background-color:#fafafa"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:9px;padding-bottom:5px;padding-left:9px"><table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:collapse"><tbody><tr><td align="center" valign="middle" width="24"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76jrJLWWlh1sEoDguqeGDFAqGiF7lKDyTVIGgWWP7vRT-2FZYGGxRN7L5J-2FjU-2Fpuy5jfWcOlgqWyRQbMJMweSxKGGXHI8njW4BqwlAL5gE5EvSfd-2BXlZqz6YZinv2ZPcFmohAKtR-2BDtdqqpfiuq-2Fuw8vJT-2BuWWa2O6WhMTVAcr0XgvGEiDZFdfx0mBbRm-2FI3hY8IGmZovrLpu6p5Vp7WsuYEVL1x0vispgD7wGvIaZ77N2jKIiA4ltdqyykEkovn4phG4ii9DtkExFouwfeNlUDPJnvtKuJ-2BbVIgmxX-2FhIpTDqYI4e4zQ9IjZFS11-2B-2B31uwpdlD9hcTkSq3r2UWTWEugVhhdFlMwgim9-2BSZu8fnOOw1vrivB3sFyt4226yA2WHZwckJNRes9equGbY-2BcfV5wz1RSDQs9lx2eoWO0pOCReg2UP9E-2BRSwKit3h7Zn0cebN12GEXnKXDWkiLnSsyQwW1UPakC5fgsP-2B4zf0sb1IjFTOwgUWSlyMBS-2FEcFyp8uMZ5Y-2FqQRyIH-2B9c89Oajk7JavgtNUjZqXZhM-2FOgxhvSpbqVUkilTkFIdtO7cPe08PJ4OHHniIf60TOYU5Rafhch07JeEM-2FWmbLrGjByDzZEMOM-2BOwfW2Hmhnfdw3QixIERmZnD-2BDtJ7eGqG5YiXdhEED84-2Fc75vQ7wsME4YzaEuf11JN6s2aeOJ3wVJmitrp8YYOMv62n48-2BE9fVZsQy2w-2FSM9JsAfqHADFJLKxaWTCP998iZp-2F7ZoAZVA49sSBTQHMx213VTlrCHeD-2Bm5VjHXU0-2Bc9Abv5yzdquwIGrG7-2FcRISyfSJWgCo3n1sQQdfxqwpzFBfxZlzxk2wG9yTDUMXRG3kSL46eeB8C26Fehf-2B2Ty_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2By0-2BNYOcInfRdc0k0LStQwOlxeNP1WDfaVdu0pry2uBmse2hcvZxustR1CZbdaCQVvtnsKpXUyQsJwrtelRXS5rCqNWHM34KFZhSMsRSTFQ1QxnfmxR3GozYRac-2BQ2BPg8oOdaJvZLut27pGmB-2BErBA-3D-3D" style="word-wrap:break-word" target="_blank"><img src="https://ci5.googleusercontent.com/proxy/-SgR5D3-bPp1julTBdSE5457JLji6LNVwzZc_IzhWv_glCJmaIYrbdmJKf7oglfkeHHhMOEnTfkjdEFyTdW4nZ7I9uQz-CPztcyuJwCec3wpBJjvTFOFzAkhm_xj1bBX=s0-d-e1-ft#http://cdn-images.mailchimp.com/icons/social-block-v2/color-twitter-48.png" style="display:block;border:0;outline:none;text-decoration:none" height="24" width="24" class="CToWUd"></a></td><td align="left" valign="middle" style="padding-left:5px"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76jrJLWWlh1sEoDguqeGDFAqWbSiluWnrS14cQnocKq8aSkEWUvHX7eBwdZApAPr6-2BvPfwH0umVHMgB-2BAFSxas5TSNaVT2-2B9Az3qk8ZIlhHBgYaRB6kfXyPNh0YpNFkk1wtDw5Byfq-2FKa0zWE4hA8ASSCUWVynKTGnRcMhxoQIHZ7jWIsfJ77cCPpRKac6kJE25CxuYE9tElWxEsXQ2FhbVLagIliZXPibNBSu8WYtzbH3nZtpl1D3VHQeRnPKvPTTI7Q116j9kyfdRKCBHWeCNuaA7CtRjDAgaNCgZxVxamecHNRL-2F94XqUHsOLxNwBVlT9iqToL4ARfTLeeyF8qYXnPJdTSt980bo9Dn2cl7MuphYOezx5uRKhkswh8wNUkXBwZq-2Bi1srkZOBb6RtD8KD7f1LJ5v0k7VAVm7um4WxpTqgTE8OeSTS23UycPmeh-2FSjJQjon6pZ7VI6WmjLnxj0rOPRqt1kEByyrsZwKVqlEgnevsE76Nl-2BpleHVzGhmUgJwnZXvo5q03KvJbsNzBq4LbWypS8wd2y2RFKsv2B3i2jYmUmHRRaAJk0zxd5HI1dVi8JHOjd7RAfFCJ-2FnNN4aRDHfdysI-2BqO34ZG6Oh2IvUH77Rcz0CzNP1gVlppYJTewQmHRZef-2FqhESTbQg-2FOixHacFeI6osfTkoNbGiDLR3UAWtX93mU6K4PGi98h3zuyswEI-2B30UPLB-2B7naMMpJ-2B1tk1gICnCSDZoTGG8FGED-2BbmqvIE-2FAG1Wl7r3PWn5LRLf4ucMFZo5k-2F3BBEx11Oo54S-2FXjcj-2BPQliBFst-2B6gCbSInVmFQ-2B9XPTw51DmwWanDdR2dcePLge9x75CpGwz-2BRMIHJfAOHQCnjwWX05LHnM2_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BVLZoo0UL1hND8AkofaLUUTSzPIKMiHHV0Fj7A9XehwdoCU3O-2FxtbfB40mIpUlkwF9NZKZhTkRoF5aJ8-2F3Vr65hMVcBGfGxwjezeNQvTbNFy-2BvpP6XRSZdnolewG7K-2B8VtNGX-2FWN1RH-2FQmOxQPWgx9w-3D-3D" style="color:#505050;font-family:Arial;font-size:12px;font-weight:normal;line-height:100%;text-align:center;text-decoration:none;word-wrap:break-word" target="_blank">Tweet</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td valign="top" style="padding-right:9px;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:separate;border:1px solid #cccccc;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;background-color:#fafafa"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:9px;padding-bottom:5px;padding-left:9px"><table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:collapse"><tbody><tr><td align="center" valign="middle" width="24"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76ltAQqErriHM22B6EfoMN49pAaCB4Ps-2BjYJKrsCRgPlm21RQOaYXzBZe2KDIehAgrgWIP8DlYmKxfK-2BMddv9mZlYdUjcF869O2asGCrL70IxSw3JXd2RuGZt17OmkStlvNGO9MgeqIdirr0s4w69rgVMgfrIQu2FO-2FTuxbXVDK3vQiSQYgRWSmGu61fR1-2FQNQf3gZtccTFT4RPvRq56NTqJmtzjjEnvYq90nT3r-2FY2-2FnDkpz06rRUlqTuKnDYs7rBEYWglTJtAqhA2Ww8djmH2P2xus5dcZJL0WKWlpfxT7afkyVSzSaXy5ACM9dIZJ4M4u9AZ2RMuz8hzsGwflgfDH2kMbgCmN8XHq0EszqBWtjUSb7AW4GH-2ByiBgNWcqsqT9-2FkFgrvb8aFYThymufbHJHIYG8TrMBBbUoD-2BfaBTASqRWBYPdkCPlwGumABKDINkMyPT1dSuerZcSRZ-2BDFz1WddwkkFMwrsPalGWvcWAMInMWA33EsqHM9-2B-2B-2Fg-2B1ylK1qJbPPe4mU-2BiQb7acYRLtWi7-2F87hIMdkIFSyXmbE3jO5grRPyqrm4sGFZNgvyUshqhfGogyNVfMMiGhhPEaIFO6ti2QDEGwdVwoZYUi7oaePJz8QEVFeo2uQOMn9gNuFo4dvgbw6JpoxY8UEzg-2B-2FXvDbN3iCjoPKvQISUSiIqLhfGYtw4-2BS2-2BZoL09yHHyPWbVX9fDTpHH6XX1YhygDzLAckXJMcp3Mw6-2FZe4UVhZ2P98MxocDWZ8ok0FEj-2FCbZKf2S3HWfVtFLoVTnsj5iV6nYWQzSV5YCccpEOYQ-2FkS3udXmpsBV9PHCJ37xONGAmaaP380XPaOtQcDXcpuoRelvg-3D_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BALs1q7knWPRxJvni2zNuO0VVdTghPV7IwmmsVD2-2FaQ4GBEaYNXHlLFAombUXhM7O0R7yx-2FSYEgUnGEh6YI0FEFoHgRqs8vP5JeJwxekedk-2BcqpAElhZJV-2FsWAzDbwnqaRldS8P-2F4CXW6rvUFOoY-2BFA-3D-3D" style="word-wrap:break-word" target="_blank"><img src="https://ci3.googleusercontent.com/proxy/TOQ-MzV-ZaJ0xrDk-tFPO55lydtsBDRhkTjTJG_ycm5uQcO5iw-fwNSwVuco9NEm2U0daiFtVXKJqMMeThEIvYrrvhlDLK2N8ssvYnH9-RtK8lEE-V6UQY8bgJf5qxDKUQ=s0-d-e1-ft#http://cdn-images.mailchimp.com/icons/social-block-v2/color-linkedin-48.png" style="display:block;border:0;outline:none;text-decoration:none" height="24" width="24" class="CToWUd"></a></td><td align="left" valign="middle" style="padding-left:5px"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76ltAQqErriHM22B6EfoMN4-2BzDASoRYrXMTAQdDAGykHFAmIDzokVqqvjAKJAb7DaGvW3ZsdHeU87uMkBYHmfNzB-2FXMZs-2ByuqkTtriLxZzVncua9BQpHKlPbALIgbrcz-2B9k4dIfzkFI3xQuM-2F7aY-2BTFQtbM6tjAdHkLlcmhVApF-2F2ov-2B8eYXyVA2Gn9viK51iqXZjuPxOm75sdQHgHy7pCWWu85Bj3oMQWsBEtybplsbSXjZ3BkY-2Fs8CW1jTtU-2F-2BGj9pgCEKUzVI8hXtcR7cYp1fN5nvogWSb4T6AY8JBPCnBQXGf7mZnGn3iXARAu-2FW-2BZjy2mgAfakI3KQZT-2FGwE4YVBcikSjWugvTlm2GdOev7adBdg6nWzTafD4-2Fjy5yy0H9-2FhiZWajroZHa1esEtu-2Faqz3Q2XD7pEy5HqpA8BYUGqb83mt5HCgEgsu-2Bj6gjhbAOl-2B1woJejYJ4GW9amupP4pUcp1DVFbJrhUCPKryD5udKkj97sA0sz3-2B4vdgqzmZLwb2iH-2B-2BSOHf1KLSmzqKBuhBuKTJpPuG5HdIL8v06MKsR-2F0bWxa55HTNRVFP96QCbsKTWhiVdKU-2F0EGAuNn3uFRUoPVm2uInK-2Bu7T0CKAu-2BqF-2BhH-2B6476pSkgJzOU2vIpJmtWjJXpRasJRtbsg53GnNLqUnfSlo8H4tDza4-2BRqgq20BDqcY0lLi7pnKmSOp-2B2Oz08oTWyUDi6RbNaCXqduBCDtoFbrmg9uCD4AjH3imfYCriWG56n-2F8LZ90ZXouWTagX1WnbiI-2FHBimPaGPALfsvRPhtJK4lCPupXPGGLtOHdGTOIojy9M43rmbbiBkohyW19n0BR0vBGEOoA0dqDpo-3D_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BTx-2B0PRfzOTdbo44rA05xy80VCQneHuW6qCGwXj75jfe2ij53mrnS4Q7jmZhfsXjd93NM8CclAAVmlq5nR-2BH7Zwy6FuU3V8BFqOpc12P0l3w1zuYBdWdzWdl5zRFDTjUyxXHHZMIzXFLXALaiGDkcNg-3D-3D" style="color:#505050;font-family:Arial;font-size:12px;font-weight:normal;line-height:100%;text-align:center;text-decoration:none;word-wrap:break-word" target="_blank">Share</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr><td valign="top" style="padding-right:0;padding-bottom:9px"><table border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:separate;border:1px solid #cccccc;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;background-color:#fafafa"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:9px;padding-bottom:5px;padding-left:9px"><table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse:collapse"><tbody><tr><td align="center" valign="middle" width="24"><a style="word-wrap:break-word" href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76hO0vl6vl3EK4AFfQOMsHX39HFUzKPvLAyNvtstg-2FYP7UX0ORFLvI5u4T8keZqhUh2Hn6F4oRGBAp5lA-2FhStKY-2F7nntg0z-2F4R9s4zlBE-2F-2Fev4eejVHdOPOTB-2FaY03UJs5hlOz6z3KgckH0mQwn2AWZ811-2FWtGp-2B9KWcVS6-2FK4qCNXvkmm13tFgOzxsXvc0nfNZqk7Xfsyt-2F986UbUS0ljCU7wn4XuxMbExSbvacREaym31hTeUNWdZCKvp01R9h6jpEP9UIH-2BR1heMZqefxThvhV4LcNY7KXekTnZHW3FWBa4ggJg5RHHL66cJ5OGJGxIATNJqnToL51JKY64KWhaas3MU1GeChCl9cXbWPadvoD4t8MVUBPHRDY-2FYZWWqBqtSfmHJgx24sAhqr9EEDs6H1T70MfRV2zxM9i1sTx3SCjLJRXiPPGtsQKExQzL-2BUM4MI2Fx4GRUesqjqukAWizg8AATWJl4w5yij5FQCOsFu8JA09YOWUJWKfm9h5FOl-2F-2Fy-2B1doWmiolcFUotmnPlYzcLLtKY3Ao0C2vHlDcyls7S093QbudwkGWssITzHW1MKXdj64vM3JP-2BMoDmj1nZx66yUK8GSThkfAaSjvWfn3McTnZG-2Bbn90g8-2FB4rGzPkC9oyQ8opV1vMceDdytN7Pak7scMwwqVoavf56ODrMp9HT277jDSobHksZ1E5xnnQC-2F-2FGVENuaVtQ1uBsutFleoEvNWQKVL-2BgjmBW55m-2B0kOsMaVxuCeEyDZ3973sgbaFR-2BqAnymIFOBt-2F9-2Bf922TVaUYtNbrjusgSB9Rt45QqEWYIbFEPWvMfqtKt6EZgIJ0k34GFSCLxEAmWh1okQdY765NuUKhSiPybrJx8ka5Q97nNqAOlL5f783EJHk3j-2B6vfkUP71QDeLBHEXUGMT5mc-2FLNEfjy7Xpd3Ojqn-2BzTCMgGokBySN1V7dkvOs79VJx5Sp0mNNegBDuzp4e-2FB1-2BXlpmm17SW3h9-2B9So3ihGovWrgRMkJGKO89hu8-2BykDM2YsfaZyndHcHznkZUCDx7G0q9Lt0JlDu5i9viPVYZy-2BGe2cywy2eNU8vBmTC7cOfro5QZhqRrGQz3sk0n7q1bS3CRihNgYDpDPejN39oNvqPnDfr2Zz-2Bya1HILqXobMkg4cvUOX0LBOiiOYLIpB0iAKvbY4FWjRi2O3E8GwtN2N2nDWk5w4dlu-2F-2FCTCXycD4YPLk4EqSibvIUor5EH1Arobw0d0-2FBUrXfuofKu8X476n7b-2BvMkLqwZ7gEbgF2F-2FKf5HC8ltdRAJ2yuiafteH6eSN-2BCuyQ8K7cRqYNCvAB0pQu2ZDm2nj0LyIm4A4GAkU0hzSx7MTtl3HkFKwHFf7on7BtJZhKBnQBlK26pph6tCtJmtWNvg93F1-2FZ-2BLRbq-2F2BqX4Jcdnq5U1OIFizz4xqI5VmjQilUQ2G4hu9o-2FdH473KT90pmau274hgi8CZj5YsbPxFNNb1seQRwuz8O3qOW0sSqnOHKAaxZ2H7UpjUJUAjMJKv6kyWCwp3gbm1O7yF-2FBuEHbB75Xssk-2FyD18DMmnirTM-3D_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BZpGry-2BY3diuE5DNOx6RPMTnxiWkZ-2BQ1s0BPEZJtr59OtdKFhG45Ix0SHOMazd9beNUvTONQSZFWrS-2B-2FxGeS2NCPwBCXiZ81aP7uLphg3Itd63UK2T4MBbJx0GxHvOdzp0lj-2ByPHJ6OMQIjnjZUmSoQ-3D-3D" target="_blank"><img src="https://ci6.googleusercontent.com/proxy/96B6wT96RoOOMUqVA9wsbWmJiXy_g7XEFFDLVD209qwaI4oy4Aw4FaEbrdX4Zvv3qB1NS5oEFeCacchlI1HPLYQvpEguy0BEDycA9f7u3txPJ8il61fPXLbBmaKXVsJFhOgwcdFrm7c=s0-d-e1-ft#http://cdn-images.mailchimp.com/icons/social-block-v2/color-forwardtofriend-48.png" style="display:block;border:0;outline:none;text-decoration:none" height="24" width="24" class="CToWUd"></a></td><td align="left" valign="middle" style="padding-left:5px"><a href="https://u1584418.ct.sendgrid.net/wf/click?upn=K4TKeR4V2mcCaI6qMIm1ihUl-2Ft-2FjH6vNX7g-2F2-2Blf6IGFVCbdPUgf5VZfQ3ddnA6xST8PZR3hFiyKAhykMmM76hO0vl6vl3EK4AFfQOMsHX2xeta-2BWTPTuLTwq7WWwCcu7e80tB9mX1mEwQBOxpyqyo0EF7jGr2Yg4zeS8eXb12Ek27UwKwrQNK8Py5CwajvvpeTIKFUEkCWs1RBhPi2gytugrq-2BMKUj8oy9VjaJS9uavuAT4pvEYOMh07-2BGdKZEucMTExrzxe9HZlh1rDX-2FpYpUioDdzwWCecZ3lrUA6L7Xwzy-2Br6Ec2BD9b748C3TLaJSRwuGEuqDfxLooB35ZElvq02t96lbgo8uvBMvPfy8FtAdAYW7Ds1BzqXRWa6LZPAwdDWJdDHINV4KrBgUIRMCeqLfvceI2q6Ijn3-2FTPnuSdVmhP-2BoH3gfMSAmSJtnq5ukiLssf17GlB4URP3UFzY-2BdCKrLz-2Bn7NFnaApcCty-2FhSmuj2kN2RqCKAr3Lfw9PsPVPiLmg5G1vjdb71p-2FsFW5eoyti7t4mKMyHERzXaX-2F1KeIWvtR3hkb8zxmIi6gpS2V0v0pwB4ENJJV8435RXP8gaaUdoay8pFvQ-2FdRekfv1RmPSX3s7GGQHiyHSCja60ETZULkVqhSJ-2FlciUtnMJ0i1pRL4YfdlCCPlXRSeEeFP5pAfxBuTATjGrooCdxWDQljMXmuPwC3-2BQ4d17Fc8Hn2VZe8Z-2BZAdjjMHGhw0IBtvUDRQw0gyV4zYimvdUPEHsKr3lFiJltCF-2BVVH7QwqfmsUJxzh442mvYHYqb9Q4jwoKYjOt5M1SSJyOA4PxzNuiy-2F-2FpCYCgNtPXBAjGOn9ym4MvNioMywrlyAk596xpR74jKM2mqE91aNmMYTLMf76jLGO1wyTRvQ6knhWl4eUVbULuTPH2Sv7-2Bd8ck7MKCUm4wp6BIJ8lZxZiacHH3pBImwJEnEoKxMddPo1dsKAIT8Sr76JQZUTP3DbWEt2zAIaAzrtzshqeEnSLzxDXS1Tx1ekghSA2WPfIyw4r-2BOAmoZqIJ5c-2BZKr8fjNuIjPd0MDVTLJI8q2Ax9Qh1r2cn0jsorOgZoO-2BeFSOm8FZBL0nd-2Bos8MlzZ7SZcLoSUMDE0o113Ew4UoRvhLil0eyWJU5Yl4WruM3RuiJuaPQqYftjEnX6Ocu-2FhudxHsFkGqPZdS3xH-2BJUgR9311bOgnRRV1TRK0rVc2HvyJyWMp3RLLa1rZAWCqVUk8-2FsXCuvbzwrADXVIbk1CiPaMEmQMq0bziCHbgpPuvymDS0OX86gWqbuyb-2BWfhjD-2FevYQ-2B8SN-2BrnOJSGROUTCRrC4HzbglLFv0eAobKx-2FesncJyh4wH82kRFujJYX7PAr2Uc6bYVcEMC3FNCe04snmZCxuyH8FI52oKsAEk32HTCVdJtYXP0rT3nkvvKJ29edwEB4yQAqTT-2B9i5d-2Bh3U8ovvdZ1zP83E6PCZ-2BfF8acq898SwjgNypjoaY6lbnNvM-2FNoYCy-2BD-2B4FcMzoTryOSHmplJREwMsdkIhHlagj0fFCj1fKJt2CpQa-2Fa4UkCSl7Jd3ZArOb9XnapppDJguRuOutpsqZ1juavMSWo1GimtAWWItqUR7RuPoPcXPP4kR-2BCV6PT4kPTF5-2BvKLbI-3D_u-2FXKTYnKtDgRZvjUdAKr3QJQ8V3ysNqQFaucmURnIU4EXxGU-2BlSZWzyJYiILzl8-2BleJkYl9ehKhj-2FQ3V1PLzzDRxt5JxFXGjzmaFRvO9J8BmInKqpYDacTzCRIvQw2JEA6WwX6jBwqJs0QFMHxEcW4tV63C2T6s2s6wjXZz2qDWE7wM9DpZ11rpFPxL2Nfr60sDNoYHjp-2FiPv3SbSVjpDg-3D-3D" style="color:#505050;font-family:Arial;font-size:12px;font-weight:normal;line-height:100%;text-align:center;text-decoration:none;word-wrap:break-word" target="_blank">Invite</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>' +
							//'<a href="'+ fbShareUrl + '" target="_blank"><img src="http://s1.postimg.org/4zr11j8vj/k_NPKJ.gif" border="0" /></a>' +
							//'<a href="'+ tweetUrl + '" target="_blank"><img src="http://s18.postimg.org/sofwga00p/twitter1.gif" border="0" /></a>' +
					'</td>' +
				'</table>\
				<div class="footer" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">\
					<table width="100%" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">\
						<tr style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">\
							<td class="aligncenter content-block" style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">To share feedback, questions or unsubscribe, email hello@nuggetsapp.com</td>\
						</tr></table></div></div>\
		</td>\
		<td style="font-family: Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>\
	</tr></table>\

</body>\
</html>'


return htmlstring; 

}


