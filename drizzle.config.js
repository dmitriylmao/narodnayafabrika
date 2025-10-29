export default {
  schema: "./drizzle/schema/*.js",  // путь к схемам
  out: "./drizzle/migrations",      // куда сохранять миграции
  dialect: "postgresql",            // <- вот это важно!
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Eleckij_2004",
    database: "narodnayafabrika",
    ssl: false,
  },
};
