exports.up = knex => knex.batchInsert('users', [
  {
    email: 'john.doe@gmail.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '+380970990909',
  },
  {
    email: 'jane.doe@gmail.com',
    first_name: 'Jane',
    last_name: 'Doe',
    phone: '+380970933309',
  },
]);

exports.down = knex => knex.raw('truncate users cascade');
