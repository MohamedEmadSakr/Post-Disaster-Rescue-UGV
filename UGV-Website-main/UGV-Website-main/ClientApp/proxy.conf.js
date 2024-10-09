const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:29234';

const PROXY_CONFIG = [
  {
    context: [
      "/_configuration",
      "/.well-known",
      "/Identity", // Security
      "/connect",
      "/ApplyDatabaseMigrations",
      // UGV
      "/api/ugv/submitContact/",
      "/api/ugv/getMissions/",
      "/api/ugv/addMissions/",
      "/api/ugv/getLocation/",
      "/api/ugv/getStream/",
      "/_framework"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
