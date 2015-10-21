var CKEDITOR_commons = CKEDITOR_commons || {};

CKEDITOR_commons.getAllEmails = function(table)
{
	var table_name = table.name;
	var emails = [];

	$.ajax({
		url: "http://127.0.0.1:3000/" + table_name + ".json",
		dataType: "json",
		type: "GET",
		async: false,
		success: function(data) {
			var rows = data;
	    	var properties = Object.getOwnPropertyNames(rows[0])

	    	rows.forEach(function(row) {
	    		properties.forEach(function(property) {
	    			if(property.indexOf('email') > -1)
					{
						emails.push(row[property]);
					}
				});
			});
		}
	})

	return emails;
};