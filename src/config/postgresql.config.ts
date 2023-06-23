export default () => ({
  postgresql: {
    type: 'postgres',
    host: process.env.PGSQL_HOST,
    port: parseInt(process.env.PGSQL_PORT, 10),
    username: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    // /* `timezone` option should be set to the same timezone of the database server,
    //  * otherwise, the date will be converted to the local timezone.
    //  * this option right now is only supported for mysql and mariadb
    //  * need to manully set and match the timezone between server and database
    //  * when using pgsql and other databases.
    //  */
    // timezone: 'Z',
  },
});
