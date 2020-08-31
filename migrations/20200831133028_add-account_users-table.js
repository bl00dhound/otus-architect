const createAccounts = users => users.map(({ id }) => ({ user_id: id, balance: 0 }));

exports.up = knex => knex.schema.createTable('user_accounts', table => {
  table.integer('balance').default(0);
  table.integer('user_id').notNullable().references('users.id').index();
})
  .then(() => knex('users').select('id'))
  .then(users => knex.batchInsert('user_accounts', createAccounts(users)));

exports.down = knex => knex.schema.dropTable('user_accounts');

