var CKEDITOR_commons = CKEDITOR_commons || {};

CKEDITOR_commons.getTables = function()
{
	var tables;
	$.ajax({
		url: "http://localhost:3000/tables.json",
		dataType: "json",
		type: "GET",
		async: false,
		success: function(data) {
			tables = data
		}
	});
	return tables;
};

CKEDITOR_commons.getColumns = function(table_id)
{
	var columns;
	$.ajax({
		url: "http://localhost:3000/tables/" + table_id + "/columns.json",
		dataType: "json",
		type: "GET",
		async: false,
		success: function(data) {
			columns = data
		}
	});
	return columns;
};