import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//let us make is a nestExpresSApplication
import {NestExpressApplication} from '@nestjs/platform-express'
//we will need to synthesize the directory path which contains templates
import {join} from 'path'

//we need nunjucks as render engine
import * as nunjucks from 'nunjucks'


async function bootstrap() {
  //we need to create a nest application with express under the hood
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //to associate nunjucks with express we need the enderlying express platform from nest app//
  const express = app.getHttpAdapter().getInstance();
  //we also need to get the directory name views(which we will create in project root directory),because this is the directory for our template files
  const views = join(__dirname,'..','views');
  //finally configure nunjucks, setting views and express which have been declared above
  nunjucks.configure(views,{express});
  //start the application
  await app.listen(3000);
}
bootstrap();
