import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from '@src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tasks-management',
      autoLoadEntities: true,
      synchronize: true, // Do not use in production
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
