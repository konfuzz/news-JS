import './sources.css';
import { type SourceItem } from '../../../types';
import { safeQuerySelector } from '../../../utils/helpers';

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

      safeQuerySelector(sourceClone, '.source__item-name').textContent = item.name;
      safeQuerySelector(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    safeQuerySelector(document, '.sources').append(fragment);
  }
}

export default Sources;
