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
CKEDITOR.plugins.add( 'data', {

	// Register the icons.
	icons: 'data',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that opens our dialog window.
		editor.addCommand( 'data', new CKEDITOR.dialogCommand( 'dataDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'Data', {

			// The text part of the button (if available) and the tooltip.
			label: 'Insert Data',

			// The command to execute on click.
			command: 'data',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert'
		});

		if ( editor.contextMenu ) {
			
			// Add a context menu group with the Edit Abbreviation item.
			editor.addMenuGroup( 'dataGroup' );
			editor.addMenuItem( 'dataItem', {
				label: 'Edit Abbreviation',
				icon: this.path + 'icons/data.png',
				command: 'data',
				group: 'dataGroup'
			});

			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'data', true ) ) {
					return { dataItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'dataDialog', this.path + 'dialogs/data.js' );
	}
});
