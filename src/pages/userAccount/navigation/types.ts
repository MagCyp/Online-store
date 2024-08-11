export interface Props {
  currentPage: string;
  setCurrentPage: (currentPage: string) => void;
  userName: string;
  onLogout?: () => void;
}
