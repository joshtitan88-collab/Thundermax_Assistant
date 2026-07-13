// Placeholder — built in a later phase.
import { el } from '/js/ui.js';
export function mount(root) {
  root.append(el('h1', { class: 'page' }, 'Proposals'),
    el('div', { class: 'empty' }, 'Coming in a later build phase.'));
}
export function unmount() {}
