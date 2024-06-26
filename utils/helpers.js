const Handlebars = require('handlebars');

Handlebars.registerHelper('formatDate', function (dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
});