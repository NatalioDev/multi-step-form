import SectionForm from "./SectionForm";
// Importamos el componente necesario.
import AddonComponent from "./AddonComponent";
// Importamos el ChangeEvente para el tipo que lo necesite.
import { ChangeEvent } from "react";

// Definimos los tipos necesarios.
type Props = {
    currentStep: number,
    onBoxCheck:(e: ChangeEvent<HTMLInputElement>) => void,
    planDuration: string,
    addonOptions: Addon[],
}

// Tipos de Addon
type Addon ={
    id: number,
    title: string,
    desc: string,
    price: number,
    selected: boolean,
}

export default function Addons(
    {
        onBoxCheck, 
        planDuration, 
        addonOptions,
    }: Props
    ) {

  return (
    <div>
      {/* Pasamos el titulo y descripción del componente actual */}
        <SectionForm
            title="Pick add-ons"
            desc="Add-ons help enhance your gaming experience."
        />
        <div className="px-5 md:px-1 md:pb-5 space-y-5">
            {/* Mapeamos los datos de nuestros Addons para pasarselo al componente AddonComponent asi se los muestra al usuario  */}
            {addonOptions.map(({id, title, desc, price, selected}) => (
                <AddonComponent
                    onBoxCheck={onBoxCheck}
                    key={id}
                    id={id}
                    title={title}
                    desc={desc}
                    price={price}
                    selected={selected}
                    planDuration={planDuration}
                />
            ))}
        </div>
    </div>
  )
}
