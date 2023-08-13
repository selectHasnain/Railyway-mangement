import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User,ticket } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'railway-management',
            entities: [User,ticket],
            logging: false,
            synchronize: true,
        }),
    ],
})
export class DatabaseModule { }