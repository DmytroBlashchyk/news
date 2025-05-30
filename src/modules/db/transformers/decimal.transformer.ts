import { ValueTransformer } from 'typeorm';

export const decimalTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string): number => parseFloat(value),
};
