/** @type {import('drizzle-kit').Config} */

export default {
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://USERS-DB_owner:npg_8UFQizq5TMyP@ep-lively-cherry-a8zr3r8o-pooler.eastus2.azure.neon.tech/USERS-DB?sslmode=require",
  },
};
