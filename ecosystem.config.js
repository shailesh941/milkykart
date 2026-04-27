module.exports = {
  apps: [
    {
      name: "nest-app",
      cwd: "/var/www/app/backend",
      script: "dist/main.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};