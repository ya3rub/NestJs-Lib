import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'libs/search/src';
import Post from './post.entity';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import PostsSearchService from './postsSearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SearchModule],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
