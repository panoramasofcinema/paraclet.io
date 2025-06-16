declare module 'scramble-text' {
  export default class ScrambleText {
    constructor(element: HTMLElement, options?: {
      timeOffset?: number;
      chars?: string[];
    });
    start(): this;
    play(): this;
    stop(): void;
  }
} 