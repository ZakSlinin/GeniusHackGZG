import { Modal } from "@/shared/ui/modal";

import s from "./index.module.scss";
import { InputDate } from "@/shared/ui/input";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterModal = ({ ...props }: FilterModalProps) => {
  return (
    <Modal {...props}>
      <h3>Фильтры</h3>
      <ul className={s.content}>
        <li>
          <span>Дата: </span> <InputDate />
        </li>
      </ul>
    </Modal>
  );
};
