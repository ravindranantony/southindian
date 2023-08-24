const tableBody = document.getElementById("calendar-table").getElementsByTagName("tbody")[0];
const currentMonthYear = document.getElementById("current-month-year");
let currentDate = new Date(2023, 7); // Setting initial date to August 2023

// Array of national holidays for Sweden and India. Format: 'month-day'
const holidays = [
    '1-1',   // New Year's Day (Sweden)
    '1-6',   // Epiphany (Sweden)
    '1-26',  // Republic Day (India)
    '5-1',   // May Day (Sweden)
    '6-6',   // National Day (Sweden)
    '8-15',  // Independence Day (India)
    '10-2',  // Gandhi Jayanti (India)
    '12-25', // Christmas Day (Both)
    '12-26'  // Boxing Day (Sweden)
];

function isHoliday(day, month) {
    return holidays.includes(`${month + 1}-${day}`);
}

function generateCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tableContent = "";

    // Fill in the blanks for days from the previous month
    for (let i = 0; i < firstDay; i++) {
        tableContent += "<td></td>";
    }

    // Fill in the days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        if ((i + firstDay) % 7 === 0 && i !== daysInMonth) {
            tableContent += `<td${isHoliday(i, month) ? ' class="holiday"' : ''}>${i}</td></tr><tr>`;
        } else {
            tableContent += `<td${isHoliday(i, month) ? ' class="holiday"' : ''}>${i}</td>`;
        }
    }

    // Fill in the blanks for the next month
    while ((daysInMonth + firstDay) % 7 !== 0) {
        tableContent += "<td></td>";
        daysInMonth++;
    }

    tableBody.innerHTML = tableContent;
    currentMonthYear.innerText = `${monthNames[month]} ${year}`;

    // Attach click events to newly generated cells
    attachClickEventsToCells();
}

function handleCellClick(event) {
    const cell = event.target;
    const link = cell.getAttribute('data-link');

    if (link) {
        window.open(link, '_blank');
    } else {
        const newLink = prompt("Please enter a link:");
        if (newLink) {
            cell.setAttribute('data-link', newLink);
            cell.style.backgroundColor = "#e0e0e0";
        }
    }
}

function attachClickEventsToCells() {
    const cells = document.querySelectorAll("#calendar-table td");
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("prev-month").addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

document.getElementById("next-month").addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

// Initialize the calendar
generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
