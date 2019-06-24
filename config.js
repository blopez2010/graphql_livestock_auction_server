module.exports.knex = {
  local: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'rootroot',
      database: 'livestock_auction'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'livestock_auction'
    }
  }
};
