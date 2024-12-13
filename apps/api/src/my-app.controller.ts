import { Controller, Get } from '@nestjs/common';
import { MyAppService } from './my-app.service';
import helloWorld from '@fannaq/sar';
@Controller()
export class MyAppController {
  constructor(private readonly myAppService: MyAppService) {}

  @Get()
  getHello(): string {
    return helloWorld();
  }
}
