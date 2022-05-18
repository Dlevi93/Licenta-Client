import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Article } from '../article.model';
import { ArticleFile } from '../file.model';
import { MetaTag } from './meta.model';

@Injectable({
    providedIn: 'root'
})
export class ShareService {
    article: Article;
    private apiUrl = `${environment.apiUrl}/`;
    private baseUrl = `${environment.baseUrl}/`;

    private urlMeta: string = "url";
    private titleMeta: string = "title";
    private descriptionMeta: string = "description";
    private typeMeta: string = "type";
    private imageMeta: string = "image";
    private secureImageMeta: string = "image:secure_url";

    constructor(private _titleService: Title,
        private _metaService: Meta) { }

    public setArticleAndFacebookTags(articleResponse: Article): void {
        this.article = articleResponse;
        this.setArticleTags();
    }

    public setArticleTags() {
        if (this.article === undefined) return;

        this._titleService.setTitle(`Licenta | ${this.article.title}`);

        let text = this.article.text.length > 250 ? this.article.text.substring(0, 250) : this.article.text;
        text = text.replace(/(<([^>]+)>)/gi, "")

        var tags = [
            new MetaTag(this.urlMeta, `${this.baseUrl}${this.article.slug}`),
            new MetaTag(this.titleMeta, `Licenta | ${this.article.title}`),
            new MetaTag(this.descriptionMeta, text),
            new MetaTag(this.typeMeta, 'article'),

            new MetaTag(`og:${this.urlMeta}`, `${this.baseUrl}${this.article.slug}`),
            new MetaTag(`og:${this.titleMeta}`, `Licenta | ${this.article.title}`),
            new MetaTag(`og:${this.descriptionMeta}`, text),
            new MetaTag(`og:${this.typeMeta}`, 'article'),
        ];
        this.setTags(tags);

        if (this.article.files.length > 0 && this.article.files[0].content !== undefined)
            this.setFacebookImageTag(this.article.files[0]);
    }

    public setFacebookImageTag(imageFile: ArticleFile): void {
        let path = this.apiUrl + this.setImageSize(imageFile, 'M');
        let tags = [
            new MetaTag(this.imageMeta, path),
            new MetaTag(`og:${this.imageMeta}`, path),
            new MetaTag(this.secureImageMeta, path)
        ];
        this.setTags(tags);
    }

    private setTags(tags: MetaTag[]): void {
        tags.forEach(siteTag => {
            let metaDefinition: MetaDefinition = {};
            metaDefinition.name = siteTag.name;
            metaDefinition.content = siteTag.value;

            this._metaService.updateTag(metaDefinition);
        });
    }

    private setImageSize(file: ArticleFile, fileSize: string): string {
        let path = '';
        if (file.content.includes('.jpg') || file.content.includes('.png') || file.content.includes('.gif')) {
            let extension = file.content.substring(file.content.length - 4);
            path = file.content.substring(0, file.content.length - 4);
            path = path + '-' + fileSize + extension;
        }
        return path;
    }
}