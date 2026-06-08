import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from '../pipes/post-exists.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostInterface[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', PostExistsPipe) id: string,
  ): Promise<PostInterface> {
    return await this.postsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostData: CreatePostDto): Promise<PostInterface> {
    return this.postsService.create(createPostData);
  }

  @Put(':id')
  async update(
    @Param('id', PostExistsPipe) id: string,
    @Body() updatePostData: UpdatePostDto,
  ): Promise<PostInterface> {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', PostExistsPipe) id: string): Promise<void> {
    await this.postsService.remove(id);
  }
}
