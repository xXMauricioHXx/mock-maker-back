/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('rule', table => {
    table.bigIncrements('id').unsigned();
    table.string('code').notNullable();
    table.json('rule').notNullable();
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updatedAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('rule');
