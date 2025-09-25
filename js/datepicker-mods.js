// (function($){
//     function applyBusinessDayMinDates() {
//         $(".frm_date").each(function() {
//             var $input = $(this);
//             var fieldId = $input.attr('id');

//             var origMin = $input.datepicker("option", "minDate");

//             // Test blackout dates
//             if (!$input.attr('data-blackouts')) {
//                 $input.attr('data-blackouts', '2025-10-03,2025-10-06');
//             }

//             var blackoutDates = $input.data('blackouts') 
//                 ? $input.data('blackouts').toString().split(',')
//                 : [];

//             var correctedMin = origMin;
//             if (typeof origMin === "number") {
//                 correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
//                 $input.datepicker("option", "minDate", correctedMin);
//             }

//             console.log(
//                 "Field ID:", fieldId,
//                 "Original minDate:", origMin,
//                 "Blackouts:", blackoutDates,
//                 "Corrected minDate:", $.datepicker.formatDate("yy-mm-dd", correctedMin)
//             );
//         });
//     }

//     // --- Helper function ---
//     function addBusinessDays(startDate, days, holidays) {
//         var date = new Date(startDate.getTime());
//         var added = 0;

//         while (added < days) {
//             date.setDate(date.getDate() + 1);

//             var day = date.getDay();
//             var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

//             if (day === 0 || day === 6) continue; // skip weekends
//             if (holidays.includes(dateStr)) continue; // skip blackouts

//             added++;
//         }

//         return date;
//     }

//     // Run on initial page load
//     $(document).ready(function() {
//         applyBusinessDayMinDates();
//     });

//     // Run on AJAX-loaded forms
//     $(document).on('frm_after_load', function() {
//         applyBusinessDayMinDates();
//     });

// })(jQuery);


// (function($){
//     // Run after Formidable has loaded the form fields
//     $(document).on('frm_after_load', function() {

//         $(".frm_date").each(function() {
//             var $input = $(this);
//             var fieldId = $input.attr('id');

//             // Grab original minDate from Formidable field (number of days)
//             var origMin = $input.datepicker("option", "minDate");

//             // For testing: force a data-blackouts attribute (example)
//             if (!$input.attr('data-blackouts')) {
//                 $input.attr('data-blackouts', '2025-10-03,2025-10-06');
//             }

//             var blackoutDates = $input.data('blackouts') 
//                 ? $input.data('blackouts').toString().split(',')
//                 : [];

//             // Calculate business-day minDate only if original minDate is a number
//             var correctedMin = origMin;
//             if (typeof origMin === "number") {
//                 correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
//                 $input.datepicker("option", "minDate", correctedMin);
//             }

//             // Logging for debugging
//             console.log(
//                 "Field ID:", fieldId,
//                 "Original minDate:", origMin,
//                 "Blackouts:", blackoutDates,
//                 "Corrected minDate:", $.datepicker.formatDate("yy-mm-dd", correctedMin)
//             );
//         });

//         // --- Helper function: add business days (skips weekends + blackout dates) ---
//         function addBusinessDays(startDate, days, holidays) {
//             var date = new Date(startDate.getTime());
//             var added = 0;

//             while (added < days) {
//                 date.setDate(date.getDate() + 1);

//                 var day = date.getDay();
//                 var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

//                 // Skip weekends
//                 if (day === 0 || day === 6) continue;

//                 // Skip blackout dates
//                 if (holidays.includes(dateStr)) continue;

//                 added++;
//             }

//             return date;
//         }

//     });
// })(jQuery);


// (function($){
//     $(document).on('frm_after_load', function() {
//         $(".frm_date").each(function() {
//             var $input = $(this);
//             var $wrapper = $input.closest('.frm_form_field');

//             // Get blackout dates from Formidable's unique_dates (stored in the wrapper or via PHP)
//             // For testing, hardcode some blackout dates:
//             if (!$input.attr('data-blackouts')) {
//                 $input.attr('data-blackouts', '2025-10-03,2025-10-06');
//             }

//             var blackoutDates = $input.data('blackouts') 
//                 ? $input.data('blackouts').toString().split(',')
//                 : [];

//             var origMin = $input.datepicker("option", "minDate");

//             if (typeof origMin === "number") {
//                 var correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
//                 $input.datepicker("option", "minDate", correctedMin);
//             }
//         });

//         function addBusinessDays(startDate, days, holidays) {
//             var date = new Date(startDate.getTime());
//             var added = 0;

//             while (added < days) {
//                 date.setDate(date.getDate() + 1);
//                 var day = date.getDay();
//                 var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

//                 if (day === 0 || day === 6) continue; // skip weekends
//                 if (holidays.includes(dateStr)) continue; // skip holidays

//                 added++;
//             }

//             return date;
//         }
//     });
// })(jQuery);


// (function($){
//     $(document).on('frm_after_load', function() {
//         $(".frm_date").each(function() {
//             var $input = $(this);

//             // Get blackout dates from the input's data attribute
//             var blackoutDates = $input.data('blackouts') 
//                 ? $input.data('blackouts').toString().split(',')
//                 : [];

//             // Get original minDate (in calendar days)
//             var origMin = $input.datepicker("option", "minDate");

//             // Only process if minDate is a number
//             if (typeof origMin === "number") {
//                 var correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
//                 $input.datepicker("option", "minDate", correctedMin);
//             }
//         });

//         // --- Helper: add business days, skip weekends + blackout dates ---
//         function addBusinessDays(startDate, days, holidays) {
//             var date = new Date(startDate.getTime());
//             var added = 0;

//             while (added < days) {
//                 date.setDate(date.getDate() + 1);
//                 var day = date.getDay();
//                 var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

//                 // Skip weekends
//                 if (day === 0 || day === 6) continue;

//                 // Skip blackout dates
//                 if (holidays.includes(dateStr)) continue;

//                 added++;
//             }

//             return date;
//         }
//     });
// })(jQuery);


// (function($){
//     $(document).on('frm_after_load', function() {
//         $(".frm_date").each(function() {
//             var $input = $(this);
//             var $wrapper = $input.closest('.frm_form_field');
//             var blackoutDates = $wrapper.data('blackouts') 
//                 ? $wrapper.data('blackouts').toString().split(',') 
//                 : [];

//             var origMin = $input.datepicker("option", "minDate");

//             if (typeof origMin === "number") {
//                 var correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
//                 $input.datepicker("option", "minDate", correctedMin);
//             }
//         });

//         // --- Helper: add business days, skip weekends + blackout dates ---
//         function addBusinessDays(startDate, days, holidays) {
//             var date = new Date(startDate.getTime());
//             var added = 0;

//             while (added < days) {
//                 date.setDate(date.getDate() + 1);
//                 var day = date.getDay();
//                 var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

//                 // Skip weekends
//                 if (day === 0 || day === 6) continue;

//                 // Skip blackout dates
//                 if (holidays.includes(dateStr)) continue;

//                 added++;
//             }

//             return date;
//         }
//     });
// })(jQuery);

// (function($) {
//     // Run after Formidable finishes loading forms on the page
//     $(document).on('frm_after_load', function() {
//         $(".frm_date").each(function() {
//             var $input = $(this);

//             // Grab blackout dates from the field wrapper's data attribute
//             var $wrapper = $input.closest('.frm_form_field');
//             var blackoutDates = [];
//             if ($wrapper.length && $wrapper.data('blackouts')) {
//                 blackoutDates = $wrapper.data('blackouts').toString().split(',');
//             }

//             // Grab the minDate that Formidable set (calendar days)
//             var origMin = $input.datepicker("option", "minDate");

//             if (typeof origMin === "number") {
//                 // Calculate corrected business-day minDate
//                 var correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
//                 $input.datepicker("option", "minDate", correctedMin);
//             }

//             // --- Helper: add business days, skip weekends + blackout dates ---
//             function addBusinessDays(startDate, days, holidays) {
//                 var date = new Date(startDate.getTime());
//                 var added = 0;

//                 while (added < days) {
//                     date.setDate(date.getDate() + 1);

//                     var day = date.getDay();
//                     var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

//                     // Skip weekends
//                     if (day === 0 || day === 6) continue;

//                     // Skip blackout dates
//                     if (holidays.includes(dateStr)) continue;

//                     added++;
//                 }

//                 return date;
//             }
//         });
//     });
// })(jQuery);


// // (function($) {
// //     $(document).ready(function() {
// //         $(".frm_date").each(function() {
// //             var $input = $(this);

// //             // Grab blackout dates from the field wrapper's data attribute
// //             var $wrapper = $input.closest('.frm_form_field');
// //             var blackoutDates = [];
// //             if ($wrapper.length && $wrapper.data('blackouts')) {
// //                 blackoutDates = $wrapper.data('blackouts').toString().split(',');
// //             }

// //             // Wait until Formidable initializes the datepicker
// //             setTimeout(function() {
// //                 var origMin = $input.datepicker("option", "minDate");

// //                 // Only process if minDate is a number (calendar days)
// //                 if (typeof origMin === "number") {
// //                     // Calculate business-day minDate based on original minDate
// //                     var correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
// //                     $input.datepicker("option", "minDate", correctedMin);
// //                 }
// //             }, 600);

// //             // --- Helper: add business days, skip weekends + blackout dates ---
// //             function addBusinessDays(startDate, days, holidays) {
// //                 var date = new Date(startDate.getTime());
// //                 var added = 0;

// //                 while (added < days) {
// //                     date.setDate(date.getDate() + 1);

// //                     var day = date.getDay();
// //                     var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

// //                     // Skip weekends
// //                     if (day === 0 || day === 6) continue;

// //                     // Skip blackout dates
// //                     if (holidays.includes(dateStr)) continue;

// //                     added++;
// //                 }

// //                 return date;
// //             }
// //         });
// //     });
// // })(jQuery);

