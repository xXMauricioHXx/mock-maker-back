/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('route_error', table => {
    table.bigIncrements('id').unsigned();
    table.bigInteger('routeId').unsigned();
    table.bigInteger('errorId').unsigned();
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updatedAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table
      .foreign('routeId')
      .references('id')
      .inTable('route');
    table
      .foreign('errorId')
      .references('id')
      .inTable('error');
  });

/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('route_error');
