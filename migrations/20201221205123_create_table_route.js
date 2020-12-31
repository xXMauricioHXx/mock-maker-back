/**
 * @param {import('knex')} knex
 */
exports.up = knex =>
  knex.schema.createTable('route', table => {
    table.bigIncrements('id').unsigned();
    table.enum('method', ['POST', 'GET', 'PUT', 'DEL']).notNullable();
    table.string('uri').notNullable();
    table
      .integer('statusCode')
      .notNullable()
      .unsigned();
    table.json('response');
    table.bigInteger('projectId').unsigned();
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updatedAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table
      .foreign('projectId')
      .references('id')
      .inTable('project');

    table.unique(['method', 'uri'], 'method_uri_index');
  });

/**
 * @param {import('knex')} knex
 */
exports.down = knex => knex.schema.dropTable('route');
