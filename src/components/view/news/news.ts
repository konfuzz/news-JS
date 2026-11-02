import './news.css';
import { type Article } from '../../../types';
import { safeQuerySelector } from '../../../utils/helpers';

class News {
  public draw(data: Article[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    if (!newsItemTemp) {
      return;
    }

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true);

      if (!(newsClone instanceof DocumentFragment)) {
        return;
      }

      if (idx % 2) {
        safeQuerySelector(newsClone, '.news__item').classList.add('alt');
      }

      safeQuerySelector(newsClone, '.news__meta-photo').style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      safeQuerySelector(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
      safeQuerySelector(newsClone, '.news__meta-date').textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');
      safeQuerySelector(newsClone, '.news__description-title').textContent = item.title;
      safeQuerySelector(newsClone, '.news__description-source').textContent = item.source.name;
      safeQuerySelector(newsClone, '.news__description-content').textContent = item.description;
      safeQuerySelector(newsClone, '.news__read-more a').setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    safeQuerySelector(document, '.news').innerHTML = '';
    safeQuerySelector(document, '.news').appendChild(fragment);
  }
}

export default News;
