const config = require('config');
const knex = require('knex');
module.exports = knex({
    client: 'mysql',
    connection: config.mysql
});
