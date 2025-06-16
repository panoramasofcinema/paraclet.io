declare module 'scramble-text' {
  export default class ScrambleText {
    constructor(element: HTMLElement, options?: {
      timeOffset?: number;
      chars?: string[];
      fps?: number;
      callback?: function;
    });
    start(): this;
    play(): this;
    stop(): void;
  }
} 