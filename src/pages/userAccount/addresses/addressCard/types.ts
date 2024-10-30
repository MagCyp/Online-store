export interface Props {
  firstName: string;
  lastName: string;
  number: string;
  country: string;
  city: string;
  address: string;
  code: string;
  selectedItem?: boolean;
  setActive?: () => void;
  onRemove?: () => void;
}
