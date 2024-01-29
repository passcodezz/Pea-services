import I18nButton from "@elements/I18nButton";
import { FC, PropsWithChildren } from "react";
import { HiTrash } from "react-icons/hi";
type Props = {} & PropsWithChildren;

const BtnDeleteModal: FC<Props> = () => {
  return (
    <>
      <I18nButton
        startIcon={<HiTrash className="text-lg" />}
        color="failure"
        text="Delete"
        onClick={() => {}}
      />
    </>
  );
};

export default BtnDeleteModal;
