import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { DatabaseService } from '../database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<Post[]> {
    return this.databaseService.post.findMany();
  }

  async findOne(id: string): Promise<Post> {
    const singlePost = await this.databaseService.post.findUnique({
      where: { id },
    });
    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }

    return singlePost;
  }

  async create(createPostData: CreatePostDto): Promise<Post> {
    const newPost = await this.databaseService.post.create({
      data: {
        title: createPostData.title,
        content: createPostData.content,
        authorName: createPostData.authorName,
      },
    });

    return newPost;
  }

  async update(id: string, updatePostData: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.databaseService.post.update({
      where: { id },
      data: {
        ...updatePostData,
      },
    });

    return updatedPost;
  }

  async remove(id: string): Promise<void> {
    await this.databaseService.post.delete({ where: { id } });
  }
}
