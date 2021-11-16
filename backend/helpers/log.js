const dayjs = require('dayjs');

module.exports = function log(data) {
    const date = dayjs().format('YYYY-MM-DD hh:mm:ss');
    if (data instanceof Object) return console.log(`[${date}] -`, data);
    return console.log(`[${date}] - ${data}`);
};
