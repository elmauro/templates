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
CKEDITOR.plugins.add( 'email', {

	// Register the icons.
	icons: 'email',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that opens our dialog window.
		editor.addCommand( 'email', new CKEDITOR.dialogCommand( 'emailDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'Email', {

			// The text part of the button (if available) and the tooltip.
			label: 'Insert Email',

			// The command to execute on click.
			command: 'email',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert'
		});

		if ( editor.contextMenu ) {
			
			// Add a context menu group with the Edit Abbreviation item.
			editor.addMenuGroup( 'emailGroup' );
			editor.addMenuItem( 'emailItem', {
				label: 'Edit Abbreviation',
				icon: this.path + 'icons/email.png',
				command: 'email',
				group: 'emailGroup'
			});

			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'email', true ) ) {
					return { emailItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'emailDialog', this.path + 'dialogs/email.js' );
	}
});
