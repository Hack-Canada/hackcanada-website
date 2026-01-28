declare module '*.css';

declare module 'parallax-js' {
  export default class Parallax {
    constructor(element: HTMLElement, options?: { relativeInput?: boolean; hoverOnly?: boolean; pointerEvents?: boolean; limitX?: number; limitY?: number; scalarX?: number; scalarY?: number });
    destroy(): void;
  }
}
