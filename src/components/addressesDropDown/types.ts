export interface Props {
  header: string;
  addresses?: IAddress[];
  selected: number;
  setSelected: (index: number, address: IAddress) => void;
}

export interface IAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
}
