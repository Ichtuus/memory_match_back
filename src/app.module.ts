import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { configLocal } from 'config.local';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configLocal.orm.host,
      port: configLocal.orm.port,
      username: configLocal.orm.username,
      password: configLocal.orm.password,
      database: configLocal.orm.database,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configLocal.jwt.secret,
      signOptions: { expiresIn: configLocal.jwt.expiration },
    }),
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
