/**
 * Copyright (c) 2014, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * The abbr plugin dialog window definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Our dialog definition.
CKEDITOR.dialog.add( 'dataDialog', function( editor ) {
	var tables = CKEDITOR_commons.getTables();
	var strTables;

	tables.forEach(function(table) {
		strTables += "<option value='" + table.id + "'>" + table.name +"</option>";
	});

	var columns = CKEDITOR_commons.getColumns(tables[0].id);
	var strColumns = "";

	columns.forEach(function(column) {
		strColumns += "<input type='checkbox' name='column' value='" + tables[0].name + "_" + column.name +  "'/>" + column.name + "<br />";
	});	

	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'Data',
		minWidth: 400,
		minHeight: 200,

		// Dialog window content definition.
		contents: [
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'tab-basic',
				label: 'Basic Settings',

				// The tab content.
				elements: [
					{
						type: 'html',
			 			html: '<table id="tblData" style="height:120px; width:100%; border: 1px solid #c9cccf; padding: 3px 3px 30px 6px;"><tr><td colspan="3"></td></tr><tr><td style="width: 5%"></td><td>Table Data<div style="height: 80px; width: 90%; border: 1px solid #c9cccf; padding: 3px 3px 3px 6px;"><select on change="CKEDITOR_commons.getColumns(this.value)" style="height: 100%; width: 100%; border: 0px solid #c9cccf; padding: 3px 3px 3px 6px;" name="sometext" size="3">' + strTables + '</select></div></td><td>Table Fields<div style="height: 80px; width: 90%; border: 1px solid #c9cccf; padding: 3px 3px 3px 6px;">' + strColumns + '</div></td></tr></table>'
					}
				]
			}
		],

		// Invoked when the dialog is loaded.
		onShow: function() {

			// Get the selection from the editor.
			var selection = editor.getSelection();

			// Get the element at the start of the selection.
			var element = selection.getStartElement();

			// Get the <abbr> element closest to the selection, if it exists.
			if ( element )
				element = element.getAscendant( 'data', true );

			// Create a new <abbr> element if it does not exist.
			if ( !element || element.getName() != 'data' ) {
				element = editor.document.createElement( 'data' );

				// Flag the insertion mode for later use.
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			// Store the reference to the <abbr> element in an internal property, for later use.
			this.element = element;

			// Invoke the setup methods of all dialog window elements, so they can load the element attributes.
			if ( !this.insertMode )
				this.setupContent( this.element );
		},

		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {

			// The context of this function is the dialog object itself.
			// http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
			var dialog = this;

			// Create a new <abbr> element.
			var data = this.element;

			// Invoke the commit methods of all dialog window elements, so the <abbr> element gets modified.
			this.commitContent( data );

			// Finally, if in insert mode, insert the element into the editor at the caret position.
			if ( this.insertMode ){
				var strInsert = "";

				$("input:checkbox[name=column]:checked").each(function()
				{
				    strInsert += ' ' + $(this).val();
				});

				CKEDITOR.instances.editor1.insertText(strInsert)
				//editor.insertElement( data );
			}
		}
	};
});
