<?php

/*
 * Plugin Name:       Formidable Extensions
 * Description:       Extends Formidable Forms for OrderHubCD
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            John Skarbek
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('ABSPATH')) exit;

add_filter( 'frm_date_field_js', function( $js_args, $field ) {
    // Look for a relative minDate like "+7d" or "+3d"
    if ( ! empty( $js_args['minDate'] ) && preg_match( '/\+(\d+)d/', $js_args['minDate'], $matches ) ) {
        $days = intval( $matches[1] );

        // Replace with call to our custom JS
        // Pass the input element (this) so JS can read blackout settings
        $js_args['minDate'] = "function(){ return calculateBusinessDayMinDate({$days}, this); }";
    }

    return $js_args;
}, 10, 2 );

add_action( 'wp_enqueue_scripts', function() {
    // Adjust path if you put the JS in a subfolder
    wp_enqueue_script(
        'formidable-business-days', 
        plugin_dir_url(__FILE__) . 'formidable-business-days.js',
        array('jquery', 'jquery-ui-datepicker'), // dependencies
        '1.0.0',
        true // load in footer
    );
});