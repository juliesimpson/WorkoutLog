$(function(){
	$.extend(WorkoutLog, {
		//signup method
		signup: function() {
			//username & password variables
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			//user object
			var user = {
				user: {
					username: username,
					password: password
				}
			};
			
			//signup post
			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			//signup done/fail
			signup.done(function(data){
				if(data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
					console.log("You made it!");
					console.log(data.sessionToken);
				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				
				}).fail(function() {
				$("#su_error").text("There was an issue with sign up").show();	
			});
		}

		//login method

		//loginout method


	});

	//bind events
	$("#signup").on("click", WorkoutLog.signup);
});