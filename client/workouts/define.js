$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],

			create: function() {
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};

				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});
				// .push is pushing info into an array - this will be used
				// when we log a workout based on category defined.
				define.done(function(data) {
					WorkoutLog.definition.userDefinitions.push(data.definition);
				});
			},
			fetchAll: function() {
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					WorkoutLog.definition.userDefinitions = data;
				})
					.fail(function(err) {
						console.log(err);
					});

			}
		}
	});

	//bindings
	//this is where we create a workout definition or category
	$("#def-save").on("click", WorkoutLog.definition.create);

	//fetch definitions if we already are authenticated and refreshed
	//when there is a sessionToken(authenticated user), grab all workout
	//definition types or categories
	if(window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});