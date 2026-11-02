import './sources.css';
import { type SourceItem } from '../../../types';
import { safeQuerySelector } from '../../../utils/helpers';

class Sources {
  constructor() {
    this.initMenuToggle();
  }

  public draw(data: SourceItem[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (!sourceItemTemp) {
      return;
    }

    data.forEach((item: SourceItem) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);

      if (!(sourceClone instanceof DocumentFragment)) {
        return;
      }

      safeQuerySelector(sourceClone, '.source__item-name').textContent = item.name;
      safeQuerySelector(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    safeQuerySelector(document, '.sources').append(fragment);
    this.addSearch();
  }

  private initMenuToggle(): void {
    const menuToggle = document.querySelector<HTMLElement>('.menu__toggle');
    const menu = document.querySelector<HTMLElement>('.menu');

    if (!menuToggle || !menu) {
      return;
    }

    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  private addSearch(): void {
    const searchInput = document.querySelector<HTMLInputElement>('search input');
    const sources = document.querySelector<HTMLDivElement>('.sources');

    if (!searchInput || !sources) {
      return;
    }

    searchInput.addEventListener('input', (event: Event) => {
      const target = event.target;

      if (!target || !(target instanceof HTMLInputElement)) {
        return;
      }

      const inputValue = target.value;

      sources.querySelectorAll<HTMLElement>('.source__item').forEach((item: HTMLElement) => {
        const itemName = item.querySelector<HTMLElement>('.source__item-name');

        if (itemName) {
          if (itemName.textContent?.toLowerCase().includes(inputValue.toLowerCase())) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        }
      });
    });
  }
}

export default Sources;
