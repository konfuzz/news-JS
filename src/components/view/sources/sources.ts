import './sources.css';
import { type SourceItem } from '../../../types';

class Sources {
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

      const nameElement = sourceClone.querySelector<HTMLElement>('.source__item-name');
      const itemElement = sourceClone.querySelector<HTMLElement>('.source__item');

      if (nameElement) {
        nameElement.textContent = item.name;
      }

      if (itemElement) {
        itemElement.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    const sourcesContainer = document.querySelector<HTMLElement>('.sources');

    if (sourcesContainer) {
      sourcesContainer.append(fragment);
    }
  }
}

export default Sources;
