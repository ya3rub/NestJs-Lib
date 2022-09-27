import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import PostsService from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { IdParams } from '@app/utils/validations';
import { CurrentUser } from 'src/auth/decorators';
import { Permission } from 'src/auth/enums';
import { AllowIfHas } from 'src/auth/guards';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Get(':id')
  getPostById(@Param() { id }: IdParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  //@UseGuards(AllowOnly(Role.Admin))
  @UseGuards(AllowIfHas(Permission.CreatePost))
  async createPost(@CurrentUser() user, @Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }

  @Get()
  async getPosts(@Query('search') search: string) {
    console.log(`called`);
    
    console.log(search);
    
    if (search) {
      return this.postsService.searchForPosts(search);
    }
    return this.postsService.getAllPosts();
  }
}
