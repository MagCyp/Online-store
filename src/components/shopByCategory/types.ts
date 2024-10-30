export interface IItems {
  id: number;
  icon: JSX.Element | null;
  title: string;
}

export interface Props {
  setY: (y: number) => void;
}
