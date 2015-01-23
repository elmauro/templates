/**
 * Copyright (c) 2014, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Basic sample plugin inserting abbreviation elements into the CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'pdf', {

	// Register the icons.
	icons: 'pdf',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that opens our dialog window.
		editor.addCommand( 'pdf', new CKEDITOR.dialogCommand( 'pdfDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'Pdf', {

			// The text part of the button (if available) and the tooltip.
			label: 'Insert Pdf',

			// The command to execute on click.
			command: 'pdf',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert'
		});

		if ( editor.contextMenu ) {
			
			// Add a context menu group with the Edit Abbreviation item.
			editor.addMenuGroup( 'pdfGroup' );
			editor.addMenuItem( 'pdfItem', {
				label: 'Edit Abbreviation',
				icon: this.path + 'icons/pdf.png',
				command: 'pdf',
				group: 'pdfGroup'
			});

			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'pdf', true ) ) {
					return { pdfItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'pdfDialog', this.path + 'dialogs/pdf.js' );
	}
});
