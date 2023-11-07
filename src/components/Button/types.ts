export type Props = {
  text: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
};
