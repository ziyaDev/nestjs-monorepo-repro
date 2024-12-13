import { Module } from '@nestjs/common';
import { MyAppController } from './my-app.controller';
import { MyAppService } from './my-app.service';
import { ConfigModule } from '@nestjs/config';
import path from 'node:path';
@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [MyAppController],
  providers: [MyAppService],
})
export class MyAppModule {}
