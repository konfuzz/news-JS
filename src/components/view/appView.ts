import { type ArticlesList, type SourcesList } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ArticlesList): void {
    this.news.draw(data.articles ?? []);
  }

  public drawSources(data: SourcesList): void {
    this.sources.draw(data.sources ?? []);
  }
}

export default AppView;
