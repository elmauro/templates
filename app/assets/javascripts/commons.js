var personal_templates_commons = personal_templates_commons || {};

personal_templates_commons.getTables = function()
{
	var tables;
	$.ajax({
		url: "http://127.0.0.1:3000/tables.json",
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
			url: "http://127.0.0.1:3000/" + table_name + ".json",
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
			var combinedRow = {'data':'', 'email':''};
			combinedRow.data = template
			var combined = false;
		
			properties.forEach(function(property) {
				if(property.indexOf('email') > -1)
				{
					combinedRow.email = row[property];
				}

				if(combinedRow.data.indexOf(property) > -1)
				{
					combined = true;
					combinedRow.data = combinedRow.data.replace(property,row[property])
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
		, source = combinedRow.data

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
		        var data = pdf.output();
				var buffer = new ArrayBuffer(data.length);
				var array = new Uint8Array(buffer);

				for (var i = 0; i < data.length; i++) {
				    array[i] = data.charCodeAt(i);
				}

				var blob = new Blob(
				    [array],
				    {type: 'application/pdf', encoding: 'raw'}
				);

				pdf.save(combinedRow.email + '.pdf');

				setTimeout(function(){ 
			        $.ajax({
					url: "http://localhost:3000/send_email/?email=" + combinedRow.email,
					dataType: "json",
					type: "GET",
					async: false,
					success: function(data) {
						console.log('bien')
					}
				});
			    }, 2000);  

		      },
		  	margins
		  )
	});
};