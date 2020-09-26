
exports.up = knex => knex.schema.table('orders', table => {
  table.uuid('request_id').index();
});

exports.down = knex => knex.schema.table('orders', table => {
  table.dropColumn('request_id');
});
