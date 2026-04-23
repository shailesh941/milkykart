import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// DB_HOST=
// DB_PORT=5432
// DB_USER=postgres
// DB_PASSWORD=123456
// DB_NAME=milkykart
@Module({
  imports: [
    ModulesModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost', // Must match the hostname used in MySQL Workbench
        port: 3306, // Must match the port used in MySQL Workbench
        username: 'milky_user', // Your MySQL username
        password: 'Shail9335@', // Your MySQL password
        database: 'milk_shop', // The name of the database you created in Workbench
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entity files
        synchronize: true, // Use false in production
      }
      //   {
      //   type: 'postgres',
      //   host: 'localhost',
      //   port: 5432,
      //   username: 'postgres',
      //   password: '123456',
      //   database: 'milkykart',
      //   autoLoadEntities: true,
      //   synchronize: true,
      // }
    ),
    ConfigModule.forRoot({
      isGlobal: true, // ✅ important
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 👈 folder
      serveRoot: '/uploads', // 👈 URL path
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
