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
  private helloWorldText: string = 'Hello World!';
  private helloWorldState: string;

  // Simple Get
  @Get('simple')
  public get(): string {
    return this.helloWorldText;
  }

  // Simple Get with param
  @Get('simple/:name')
  public getName(@Param('name') name: string): string {
    return this.getHelloText(name);
  }

  // Advanced Get with param
  @Get('/adv')
  public getAdvNameHelloWorld(@Query('name') name: string): string {
    return this.getHelloText(name);
  }

  // Simple Post
  @Post('simple')
  public postHelloWorld(@Body('name') name: string): string {
    return this.getHelloText(name);
  }

  // Simple Put
  @Put('simple/:name')
  public putStateHelloWorld(@Param('name') name: string): string {
    this.helloWorldState = name;

    return `Hello World state was changed to ${this.helloWorldState}`;
  }

  // Simple Delete
  @Delete('simple')
  public deleteStateHelloWorld(): string {
    return `Hello World state was deleted`;
  }

  // Get Hello World state
  @Get('state')
  public getStateHelloWorld(): string {
    return this.getHelloText(this.helloWorldState);
  }

  private getHelloText(text: string): string {
    return `Hello ${text}!`;
  }
}
