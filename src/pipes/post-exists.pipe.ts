import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postsService: PostsService) {}

  transform(value: number) {
    try {
      this.postsService.findOne(value);
    } catch {
      throw new NotFoundException(`Post with ID ${value} not found`);
    }
    return value;
  }
}
