import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('app')
export class AppController {
  private helloWorldText = 'Hello World!';
  private helloWorldState: string;

  // Simple Get
  // curl http://localhost:3000/app/simple
  // Invoke-RestMethod -Method Get -Uri http://localhost:3000/app/simple
  @Get('simple')
  public get(): string {
    return this.helloWorldText;
  }

  // Simple Get with param
  // curl http://localhost:3000/app/simple/People
  // Invoke-RestMethod -Method Get -Uri http://localhost:3000/app/simple/People
  @Get('simple/:name')
  public getName(@Param('name') name: string): string {
    return this.getHelloText(name);
  }

  // Advanced Get with param
  // curl http://localhost:3000/app/adv?name=People
  // Invoke-RestMethod -Method Get -Uri http://localhost:3000/app/adv?name=People
  @Get('/adv')
  public getAdvNameHelloWorld(@Query('name') name: string): string {
    return this.getHelloText(name);
  }

  // Simple Post
  // curl -X POST -d "name=People" http://localhost:3000/app/simple
  // Invoke-RestMethod -Method Post -Body "name=People" -Uri http://localhost:3000/app/simple
  @Post('simple')
  public postHelloWorld(@Body('name') name: string): string {
    return this.getHelloText(name);
  }

  // Simple Put
  // curl -X PUT http://localhost:3000/app/simple/People
  // Invoke-RestMethod -Method Put -Uri http://localhost:3000/app/simple/People
  @Put('simple/:name')
  public putStateHelloWorld(@Param('name') name: string): string {
    this.helloWorldState = name;

    return `Hello World state was changed to ${this.helloWorldState}`;
  }

  // Simple Delete
  // curl -X DELETE http://localhost:3000/app/simple
  // Invoke-RestMethod -Method Delete -Uri http://localhost:3000/app/simple
  @Delete('simple')
  public deleteStateHelloWorld(): string {
    this.helloWorldState = undefined;

    return `Hello World state was deleted`;
  }

  // Get Hello World state
  // curl http://localhost:3000/app/state
  // Invoke-RestMethod -Method Get -Uri http://localhost:3000/app/state
  @Get('state')
  public getStateHelloWorld(): string {
    return this.getHelloText(this.helloWorldState);
  }

  private getHelloText(text: string): string {
    return `Hello ${text}!`;
  }
}
