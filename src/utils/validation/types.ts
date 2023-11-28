export type ValidationSchema = {
  validate?: (value: string) => boolean | string;
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};
