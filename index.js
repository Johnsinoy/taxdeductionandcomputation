$(document).ready(function() {
    $('#calculateBtn').click(function() {
        let income = parseFloat($('#income').val());
        let deductions = parseFloat($('#deductions').val()) || 0;
        let taxableIncome = income - deductions;
        let tax = 0;

        if (isNaN(income) || income <= 0) {
            $('#result').html('Please enter a valid income.');
            return;
        }
        if (!deductions || isNaN(deductions)) {
            $('#result').html('Please enter a valid deduction.');
            return;
        }

        if (deductions < 0) {
            $('#result').html('Tax deductions cannot be negative.');
            return;
        }
        if (deductions > income) {
            $('#result').html('Tax deductions cannot be greater than the taxable income');
            return;
        }

        if (taxableIncome <= 0) {
            $('#result').html('Your tax is $0 after deductions.');
            return;
        }

        if (taxableIncome <= 10000) {
            tax = 0;
        } else if (taxableIncome <= 40000) {
            tax = taxableIncome * 0.10;
        } else if (taxableIncome <= 100000) {
            tax = taxableIncome * 0.20;
        } else {
            tax = taxableIncome * 0.30;
        }

        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.push({ income: income, deductions: deductions, tax: tax });
        localStorage.setItem('history', JSON.stringify(history));

        $('#result').html('Income tax owed: $' + tax.toFixed(2));
    });

    // Toggle history display
    $('#historyBtn').click(function() {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        let historyHtml = '<ul>';
        history.forEach(entry => {
            historyHtml += `<li>Income: $${entry.income}, Deductions: $${entry.deductions}, Tax: $${entry.tax.toFixed(2)}</li>`;
        });
        historyHtml += '</ul>';

        $('#history').html(historyHtml);

        // Show the history section and switch to side-by-side layout
        $('#historyContainer').show();
        $('.main-container').removeClass('single-column').addClass('side-by-side');
    });

    $('#resetBtn').click(function() {
        $('#income').val('');
        $('#deductions').val('');
        $('#result').html('');
        $('#history').html('');
        $('#historyContainer').hide();  // Hide the history section again
        $('.main-container').removeClass('side-by-side').addClass('single-column');
    });

    // Clear history or close history
    $('#clearHistoryBtn').click(function() {
        let userChoice = confirm("Do you want to clear the history or just close it?\nPress OK to clear history.\nPress Cancel to just close the history.");
        
        if (userChoice) {
            // Clear all stored history data
            localStorage.removeItem('history');
            $('#history').html('History cleared.');
        } else {
            // Hide the history section without clearing data
            $('#historyContainer').hide();
            $('.main-container').removeClass('side-by-side').addClass('single-column');
        }
    });
});
