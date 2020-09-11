
exports.up = knex => knex.schema.createTable('orders', table => {
  table.increments();
  table.timestamps(true, true);
  table.decimal('amount', 17, 2);
  table.integer('user_id').notNullable().references('users.id').index();
  table.string('status');
});

exports.down = knex => knex.schema.dropTable('orders');
