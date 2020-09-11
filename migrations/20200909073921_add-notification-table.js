
exports.up = knex => knex.schema.createTable('user_notifications', table => {
  table.increments();
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.string('event');
  table.integer('user_id').notNullable().references('users.id').index();
  table.text('message');
})

exports.down = knex => knex.schema.dropTable('user_notifications');
