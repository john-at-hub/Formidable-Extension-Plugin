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

// Enqueue custom JS
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'clientsite-formidable-datepicker',
        plugin_dir_url(__FILE__) . 'js/datepicker-mods.js',
        ['jquery', 'jquery-ui-datepicker'],
        '1.0.0',
        true
    );
});

// Add data-blackouts attribute to the wrapper
add_filter('frm_setup_new_fields_vars', function($field, $field_obj){
    if ($field['type'] === 'date') {
        if (!empty($field['field_options']['unique_dates'])) {
            $blackouts = array_map('sanitize_text_field', $field['field_options']['unique_dates']);
            $field['container_attributes'] = isset($field['container_attributes'])
                ? $field['container_attributes'] . ' data-blackouts="' . esc_attr(implode(',', $blackouts)) . '"'
                : 'data-blackouts="' . esc_attr(implode(',', $blackouts)) . '"';
        }
    }
    return $field;
}, 20, 2);

// // Enqueue custom scripts
// add_action( 'wp_enqueue_scripts', function() {
//     // Only load on pages with Formidable forms to avoid extra overhead
//     if ( function_exists( 'frm_form_loaded' ) ) {
//         wp_enqueue_script(
//             'clientsite-formidable-datepicker',
//             plugin_dir_url( __FILE__ ) . 'js/datepicker-mods.js',
//             ['jquery', 'jquery-ui-datepicker'],
//             '1.0.0',
//             true
//         );
//     }
// });

// Enqueue custom scripts
// add_action('wp_enqueue_scripts', function() {
//     wp_enqueue_script(
//         'clientsite-formidable-datepicker',
//         plugin_dir_url(__FILE__) . 'js/datepicker-mods.js',
//         ['jquery', 'jquery-ui-datepicker'],
//         '1.0.0',
//         true
//     );
// });

// // Test forcing a blackout of dates manually
// add_filter('frm_setup_new_fields_vars', function($field, $field_obj){
//     if ($field['type'] === 'date') {
//         if (!isset($field['classes'])) $field['classes'] = '';
//         $field['classes'] .= ' frm-blackouts';
        
//         // Force data attribute into container
//         $field['container_attributes'] = isset($field['container_attributes'])
//             ? $field['container_attributes'] . ' data-blackouts="2025-10-03,2025-10-06"'
//             : 'data-blackouts="2025-10-03,2025-10-06"';
//     }
//     return $field;
// }, 20, 2);


// // add_filter('frm_setup_new_fields_vars', function($field, $field_obj){
// //     if ($field['type'] === 'date') {
// //         if (!isset($field['classes'])) $field['classes'] = '';
// //         $field['classes'] .= ' frm-blackouts';
// //         $field['container_attributes'] = isset($field['container_attributes'])
// //             ? $field['container_attributes'] . ' data-blackouts="2025-10-03,2025-10-06"'
// //             : 'data-blackouts="2025-10-03,2025-10-06"';
// //     }
// //     return $field;
// // }, 20, 2);



// add_filter('frm_setup_new_fields_vars', function($field, $field_obj){
//     if ($field['type'] === 'date') {
//         // Check if the field has blackout dates set in Formidable
//         if (!empty($field['field_options']['unique_dates'])) {
//             $blackouts = $field['field_options']['unique_dates'];
//             if (is_array($blackouts)) {
//                 // Sanitize and convert to comma-separated string
//                 $blackouts = array_map('sanitize_text_field', $blackouts);
//                 $blackouts_str = implode(',', $blackouts);

//                 // Add as data attribute to the field wrapper
//                 if (!isset($field['classes'])) {
//                     $field['classes'] = '';
//                 }
//                 $field['classes'] .= ' frm-blackouts';
//                 // $field['container_attributes'] = isset($field['container_attributes'])
//                 //     ? $field['container_attributes'] . ' data-blackouts="' . esc_attr($blackouts_str) . '"'
//                 //     : 'data-blackouts="' . esc_attr($blackouts_str) . '"';
//                 $field['container_attributes'] = isset($field['container_attributes'])
//                     ? $field['container_attributes'] . ' ' . 'data-blackouts="' . esc_attr($blackouts_str) . '"'
//                     : 'data-blackouts="' . esc_attr($blackouts_str) . '"';
//             }
//         }
//     }
//     return $field;
// }, 20, 2);
