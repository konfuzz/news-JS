import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { type ArticlesList, type SourcesList } from '../../types';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesEl = document.querySelector('.sources');

    if (!sourcesEl) {
      return;
    }

    sourcesEl.addEventListener('click', (e) => this.controller.getNews(e, (data: ArticlesList) => this.view.drawNews(data)));
    this.controller.getSources((data: SourcesList) => this.view.drawSources(data));
  }
}

export default App;
