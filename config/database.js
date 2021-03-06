module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: env('DATABASE_CLIENT'),
        host: env('DATABASE_HOST', ''),
        port: env.int('DATABASE_PORT', 0),
        database: env('DATABASE_NAME', ''),
        username: env('DATABASE_USERNAME', ''),
        password: env('DATABASE_PASSWORD', ''),
        ssl: env.bool('DATABASE_SSL', false),
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {}
    },
  },
});
