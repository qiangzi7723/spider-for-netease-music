const notifier = require('node-notifier');

const limitLength = (array, len) => {
    if (array && array.length && array.length > len) array.length = len;
}

const splitId = (href) => {
    return href.split('?id=')[1];
}

let i=0;
const notify = (title, message) => {
    i++;
    if(i>50) return;
    notifier.notify({
        'title': title,
        'message': message,
        'wait': true,
    });
}

module.exports = {
    limitLength,
    splitId,
    notify
}