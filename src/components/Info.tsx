import { ChangeEvent, useState } from "react";

// Importamos los componentes necesarios.
import SectionForm from "./SectionForm";
import FormField from "./FormField";

// Definimos los tipos necesarios.
type Props = {
    yourInfo: {
      name: string;
      email: string;
      phone: string;
    };
    onChangeYourInfo:(event: ChangeEvent<HTMLInputElement>) => void;
    isEmpty: boolean,
    currentStep: number,
}


export default function Info({yourInfo, onChangeYourInfo, isEmpty}: Props) {

  // Estado que maneja el label para darle información al usuario de lo que necesita rellenar.
    const [formFields, setFormFields] = useState([
        {
          id: 1,
          name: "name",
          label: "Name",
          placeholder: "e.g John Doe",
        },
        {
          id: 2,
          name: "email",
          label: "Email Address",
          placeholder: "e.g john@gmail.com",
        },
        {
          id: 3,
          name: "phone",
          label: "Phone Number",
          placeholder: "e.g +1 234 567 890",
        },
      ]);
      // Lo llamo para que no me de error al desplegar.
      setFormFields;

    return (
    <div>
      {/* Pasamos el titulo y descripción del componente actual */}
        <SectionForm 
            title="Personal Info"
            desc="Please provide your name, email address, and phone number."
        />
        <form>
            <div className="flex flex-col space-y-6 text-[14px] px-2 md:px-1">
                {/* Pasamos la información necesaria para que se muestre en el componente FormField. Usamos el map para que recorra y muestre los inputs necesarios del formulario. */}
                {formFields.map(({id, name, label, placeholder}) => (
                    <FormField
                    onChangeYourInfo={onChangeYourInfo}
                    key={id}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    value={yourInfo[name as keyof typeof yourInfo]}
                    isEmpty={isEmpty}
                    />))
            }
            </div>
        </form>
    </div>
  )
}
