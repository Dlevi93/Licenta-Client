import { BaseModel } from './base.model';
import { Category } from './category.model';
import { Article } from './article.model';

export class ArticleFile extends BaseModel {
    fileName: string;
    contentType: string;
    content: string;
    fileType: FileType;
    categoryId: number;
    category: Category;
    articleId: number;
    article: Article;
}

export enum FileType {
    Image = 1,
    Video = 2,
    Pdf = 3,
    Document = 4,
    Other = 5
}