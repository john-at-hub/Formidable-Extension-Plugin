(function($){
    $(document).on('frm_after_load', function() {
        $(".frm_date").each(function() {
            var $input = $(this);
            var $wrapper = $input.closest('.frm_form_field');
            var blackoutDates = $wrapper.data('blackouts') 
                ? $wrapper.data('blackouts').toString().split(',') 
                : [];

            var origMin = $input.datepicker("option", "minDate");

            if (typeof origMin === "number") {
                var correctedMin = addBusinessDays(new Date(), origMin, blackoutDates);
                $input.datepicker("option", "minDate", correctedMin);
            }
        });

        // --- Helper: add business days, skip weekends + blackout dates ---
        function addBusinessDays(startDate, days, holidays) {
            var date = new Date(startDate.getTime());
            var added = 0;

            while (added < days) {
                date.setDate(date.getDate() + 1);
                var day = date.getDay();
                var dateStr = $.datepicker.formatDate("yy-mm-dd", date);

                // Skip weekends
                if (day === 0 || day === 6) continue;

                // Skip blackout dates
                if (holidays.includes(dateStr)) continue;

                added++;
            }

            return date;
        }
    });
})(jQuery);

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

