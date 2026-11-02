export function safeQuerySelector<T extends HTMLElement = HTMLElement>(
  parent: ParentNode,
  selector: string,
): T {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Required element not found: ${selector}`);
  }

  return element;
}
