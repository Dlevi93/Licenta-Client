import { Article } from './article.model';
import { BaseModel } from './base.model';
import { ArticleFile } from './file.model';

export class Category extends BaseModel {
    name: string;
    order: number;
    parentId: number | null;
    articles: Article[];
    files: ArticleFile[];
}