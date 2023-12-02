export enum sizes {
  large = '24',
  small = '20',
}

export interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  size: keyof typeof sizes;
}
