var personal_templates_commons = personal_templates_commons || {};

personal_templates_commons.getTables = function()
{
	var tables;
	$.ajax({
		url: "http://10.3.9.216:3000/tables.json",
		dataType: "json",
		type: "GET",
		async: false,
		success: function(data) {
			tables = data
		}
	});
	return tables;
};

personal_templates_commons.getAllRows = function(tables)
{
	var allRows = [];
	tables.forEach(function(table) {
		var table_name = table.name;
	    $.ajax({
			url: "http://10.3.9.216:3000/" + table_name + ".json",
			dataType: "json",
			type: "GET",
			async: false,
			success: function(data) {
				var rows = data;
		    	var properties = Object.getOwnPropertyNames(rows[0])

		    	rows.forEach(function(row) {
		    		properties.forEach(function(property) {
			    		row[table_name + '_' + property] = row[property];
			    		delete row[property];
					});
				});
				allRows.push(rows);
			}
		})
	});
	return allRows;
};

personal_templates_commons.combineAllRows = function(allrows, template)
{
	var combinedRows = [];
	allrows.forEach(function(rows) {
		var properties = Object.getOwnPropertyNames(rows[0])
		rows.forEach(function(row) {
			var combinedRow = template
			var combined = false;
		
			properties.forEach(function(property) {
				if(combinedRow.indexOf(property) > -1)
				{
					combined = true;
					combinedRow = combinedRow.replace(property,row[property])
				}
			});

			if(combined){
				combinedRows.push(combinedRow);
			}
		});
	});
	return combinedRows;
};

personal_templates_commons.createPDF = function(combinedRows)
{
	combinedRows.forEach(function(combinedRow) {
		var pdf = new jsPDF('p', 'pt', 'letter')

		// source can be HTML-formatted string, or a reference
		// to an actual DOM element from which the text will be scraped.
		, source = combinedRow

		// we support special element handlers. Register them with jQuery-style
		// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
		// There is no support for any other type of selectors
		// (class, of compound) at this time.
		, specialElementHandlers = {
			// element with id of "bypass" - jQuery style selector
			'#bypassme': function(element, renderer){
				// true = "handled elsewhere, bypass text extraction"
				return true
			}
		}

		margins = {
		    top: 80,
		    bottom: 60,
		    left: 40,
		    width: 522
		  };
		  // all coords and widths are in jsPDF instance's declared units
		  // 'inches' in this case
		pdf.fromHTML(
		  	source // HTML string or DOM elem ref.
		  	, margins.left // x coord
		  	, margins.top // y coord
		  	, {
		  		'width': margins.width // max width of content on PDF
		  		, 'elementHandlers': specialElementHandlers
		  	},
		  	function (dispose) {
		  	  // dispose: object with X, Y of the last line add to the PDF
		  	  //          this allow the insertion of new lines after html
		        pdf.save('Test.pdf');
		      },
		  	margins
		  )
	});
};