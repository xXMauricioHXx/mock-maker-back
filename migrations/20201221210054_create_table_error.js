/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('error', table => {
    table.bigIncrements('id').unsigned();
    table.string('code').notNullable();
    table
      .integer('statusCode')
      .unsigned()
      .notNullable();
    table.string('message').notNullable();
    table.bigInteger('ruleId').unsigned();
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updatedAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table
      .foreign('ruleId')
      .references('id')
      .inTable('rule');
  });

/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('error');
