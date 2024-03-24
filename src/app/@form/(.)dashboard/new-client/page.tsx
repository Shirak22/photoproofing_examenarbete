import ModalForm from "@/components/ModalForm";
import NewClientForm from "@/components/NewClientForm";

export default function NewClientPageIntercept() {
  return (
    <ModalForm>
      <NewClientForm />
    </ModalForm>
  );
}
