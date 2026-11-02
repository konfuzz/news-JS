import AppLoader from './appLoader';
import { Endpoints, type SourcesList, type ArticlesList } from '../../types';

class AppController extends AppLoader {
  public getSources(callback: (data: SourcesList) => void): void {
    super.getResp(
      {
        endpoint: Endpoints.SOURCES,
      },
      callback,
    );
  }

  public getNews(e: Event, callback: (data: ArticlesList) => void): void {
    const newsContainer = e.currentTarget;
    const target = e.target;

    if (!newsContainer || !target || !(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) {
      return;
    }

    const sourceItem = target.closest<HTMLElement>('.source__item');

    if (!sourceItem) {
      return;
    }

    const sourceId = sourceItem.getAttribute('data-source-id');

    if (!sourceId) {
      return;
    }

    if (newsContainer.getAttribute('data-source') !== sourceId) {
      newsContainer.setAttribute('data-source', sourceId);
      super.getResp(
        {
          endpoint: Endpoints.EVERYTHING,
          options: {
            sources: sourceId,
          },
        },
        callback,
      );
    }
    return;
  }
}

export default AppController;
