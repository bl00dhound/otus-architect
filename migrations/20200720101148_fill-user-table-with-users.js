exports.up = knex => knex.batchInsert('users', [
  {
    email: 'john.doe@gmail.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '+380970990909',
    password: '$2b$10$c.Mo2dajESfSrBPgeO1lKe5r8shYBubYBdwXMgLeI5ks7uMYBm5cy',
  },
  {
    email: 'jane.doe@gmail.com',
    first_name: 'Jane',
    last_name: 'Doe',
    phone: '+380970933309',
    password: '$2b$10$c.Mo2dajESfSrBPgeO1lKe5r8shYBubYBdwXMgLeI5ks7uMYBm5cy',
  },
]);

exports.down = knex => knex.raw('truncate users cascade');
