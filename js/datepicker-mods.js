function calculateBusinessDayMinDate(daysToAdd, input) {
    let date = new Date();
    let $input = jQuery(input);

    // Get the datepicker instance for this field
    let inst = $input.data("datepicker");
    if (!inst) {
        return date; // fallback if no instance
    }

    // Formidable wires weekends & holidays into beforeShowDay
    let beforeShowDay = inst.settings.beforeShowDay;

    let addedDays = 0;
    while (addedDays < daysToAdd) {
        date.setDate(date.getDate() + 1); // advance one calendar day

        let isSelectable = true;
        if (beforeShowDay) {
            let result = beforeShowDay(date);
            if (Array.isArray(result)) {
                isSelectable = result[0]; // true if date is valid
            }
        }

        if (isSelectable) {
            addedDays++;
        }
    }

    return date;
}
