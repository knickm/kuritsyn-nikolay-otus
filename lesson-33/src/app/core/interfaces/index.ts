export * from './lang';

export interface IResponseMessage {
  message: string;
  code?: string | number;
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}