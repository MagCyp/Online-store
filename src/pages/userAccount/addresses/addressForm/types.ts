import { Props as addressType } from '@pages/userAccount/addresses/addressCard/types';

export interface Props {
  active: number | null;
  addresses: addressType[] | null;
  onSave: (address: addressType, index: number | null) => void;
}
