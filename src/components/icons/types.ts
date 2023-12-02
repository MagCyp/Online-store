export enum sizes {
  big = '56',
  large = '40',
  medium = '24',
  small = '20',
}

export interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  size: keyof typeof sizes;
}
