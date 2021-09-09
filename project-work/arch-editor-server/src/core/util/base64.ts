export const b64EncodeUnicode = (str: string) => Buffer.from(str).toString('base64');

export const b64DecodeUnicode = (str: string) => Buffer.from(str, 'base64').toString();
