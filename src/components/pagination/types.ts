export interface Props {
  pages: number;
  currentPage: number[];
  setCurrentPage: (page: number[]) => void;
}
