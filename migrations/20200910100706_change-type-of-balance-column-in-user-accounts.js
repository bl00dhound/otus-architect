
exports.up = function (knex) {
  return knex.raw('alter table user_accounts alter column balance type decimal(17, 2)');
};

exports.down = function (knex) {
  return knex.raw('alter table user_accounts alter column balance type integer');
};
