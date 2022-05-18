import { BaseModel } from './base.model';
import { Category } from './category.model';
import { ArticleFile } from './file.model';
import { ArticleComment } from './comment.model';

export class Article extends BaseModel {
    title: string;
    slug: string;
    text: string;
    leading: boolean;
    active: boolean;
    views: number;
    style: PageStyle;
    files: ArticleFile[];
    categoryId: number;
    category: Category;
    comments: ArticleComment[];
}

export enum PageStyle {
    Default = 0,
    TopFull = 1,
    TopLeft = 2,
    TopRight = 3,
    MiddleFull = 4,
    MiddleLeft = 5,
    MiddleRight = 6
}