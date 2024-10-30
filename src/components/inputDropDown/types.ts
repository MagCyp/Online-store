export interface Props {
  options: OptionProps[];
  setSortedBy: (sortBy: string) => void;
}

export interface OptionProps {
  name: string;
  sortBy: string;
}
