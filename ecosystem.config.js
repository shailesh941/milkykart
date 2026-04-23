module.exports = {
  apps: [
    {
      name: "nest-api",
      script: "dist/main.js",
      cwd: "/var/www/app/backend",
      env: {
        NODE_ENV: "production",
        PORT: 3001            // Keeps the API on a separate port
      }
    }
  ]
};