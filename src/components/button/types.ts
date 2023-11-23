export type Props = {
  className: string;
  text: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
};
