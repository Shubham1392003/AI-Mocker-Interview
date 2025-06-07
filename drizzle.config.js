/** @type {import("drizzle-kit").Config} */
export default{
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_AfKVeawv9Nq5@ep-tight-scene-a8v800wx.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require',
    }
};