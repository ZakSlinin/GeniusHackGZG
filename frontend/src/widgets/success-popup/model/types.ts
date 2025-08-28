export interface PopupProps {
  isOpen: boolean;
  name: string;
  onClose: () => void;
  date: Date;
  location: string;
  timeStart: string;
  timeEnd: string;
}
