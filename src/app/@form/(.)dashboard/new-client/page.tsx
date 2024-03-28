import ModalForm from "@/components/client-components/ModalForm";
import NewClientForm from "@/components/Dashboard-components/forms/NewClientForm";

export default function NewClientPageIntercept() {
  return (
    <ModalForm>
      <NewClientForm />
    </ModalForm>
  );
}
