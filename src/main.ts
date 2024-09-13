import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道 - 验证
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动移除未定义的属性
      transform: true, // 自动类型转换
      forbidNonWhitelisted: true, // 禁止未定义的属性
    }),
  );

  // 启用CORS
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
  console.log(`应用程序正在运行，监听端口: ${port}`);
}
bootstrap();
