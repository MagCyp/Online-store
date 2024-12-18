export enum sizes {
  hover = '136px',
  extraLarge = '118px',
  big = '56',
  fiftyTwo = '52',
  large = '40',
  medium = '24',
  small = '20',
  mediumSmall = '16',
  verySmall = '12',
}

export interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  size: keyof typeof sizes;
}
