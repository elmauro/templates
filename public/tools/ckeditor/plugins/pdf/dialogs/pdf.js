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
CKEDITOR.dialog.add( 'pdfDialog', function( editor ) {
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'Pdf',
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
			 			html: '¿are you ready to generate pdf file?'
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
				element = element.getAscendant( 'pdf', true );

			// Create a new <abbr> element if it does not exist.
			if ( !element || element.getName() != 'pdf' ) {
				element = editor.document.createElement( 'pdf' );

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
			var pdf = this.element;

			// Invoke the commit methods of all dialog window elements, so the <abbr> element gets modified.
			this.commitContent( pdf );

			// Finally, if in insert mode, insert the element into the editor at the caret position.
			if ( this.insertMode ){
				var tables = personal_templates_commons.getTables()

				var allrows = personal_templates_commons.getAllRows(tables)

				var template = CKEDITOR.instances.editor1.getData();

				combined = personal_templates_commons.combineAllRows(allrows, template)

				personal_templates_commons.createPDF(combined)
			}
		}
	};
});
