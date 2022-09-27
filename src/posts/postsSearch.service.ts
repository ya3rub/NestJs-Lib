import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
//import { PostSearchBody, PostSearchResult } from './interfaces';
import Post from './post.entity';

@Injectable()
export default class PostsSearchService {
  index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    return this.elasticsearchService.index<Post>({
      index: this.index,
      document: {
        id: post.id,
        content: post.content,
        title: post.title,
      },
    });
  }

  async search(text: string) {
    const result = await this.elasticsearchService.search<Post>({
      index: this.index,
      query: {
        multi_match: {
          query: text,
          fields: ['title', 'content'],
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async remove(postId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: postId,
          },
        },
      },
    });
  }

  async update(post: Post) {
    const newPost: Post = {
      id: post.id,
      title: post.title,
      content: post.content,
    };

    const script = Object.entries(newPost).reduce((result, [key, value]) => {
      return `${result} ctx._source["${key}"]="${value}";`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: post.id,
          },
        },
        script: {
          lang: 'painless',
          source: script,
        },
      },
    });
  }
}
