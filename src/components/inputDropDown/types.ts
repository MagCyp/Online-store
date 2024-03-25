export interface Props {
  options: { name: string; sortBy: string }[];
  setSortedBy: (sortBy: string) => void;
}
