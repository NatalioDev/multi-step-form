import { useEffect, useState } from "react";
// Importamos los componentes necesarios.
import OptionPlan from "./OptionPlan";
import SectionForm from "./SectionForm";

// Definimos los tipos necesarios.
type Props = {
    currentStep: number,
    onPlanSelect: (title: string, price: number, id: number) => void;
    onToggleDuration: () => void,
    planOptions: Plan[],
    isPlanEmpty: boolean,
    planDuration: string
}

// Tipos que necesita para la informacion del estado Plan de la App principal
type Plan = {
    id: number,
    logo: string, 
    title: string,
    price: number,
    monthlyPrice: number;
    yearlyPrice: number;
    selected: boolean;
}

export default function Plan({
    onPlanSelect,
    onToggleDuration,
    planOptions,
    isPlanEmpty,
    planDuration,
}: Props) {

    // Estado que maneja si mostrar algun error.
    const [errorDisplay, setErrorDisplay] = useState("invisible");

    // Estado que maneja los checks del usuario.
    const [check, setCheck] = useState(false)

    // Efecto que maneja los cambios de los estados anteriores.
    useEffect(() => {
        if(isPlanEmpty){
            setErrorDisplay("block");
        } else {
            setErrorDisplay("invisible");
        }

        if(planDuration == "mo"){
            setCheck(false);
        } else {
            setCheck(true);
        }
    },[isPlanEmpty, planDuration])

  return (
    <div>
      {/* Pasamos el titulo y descripción del componente actual */}
        <SectionForm 
            title="Select your plan"
            desc="You have the option of monthly or yearly billing."
        />
        {/* Mostramos las opciones de los planes que podra seleccionar el usuario. */}
        <div className="grid gap-4 px-3 -mt-[15px] md:grid-cols-3 md:grid-rows-1">
            {/* Mapeamos los datos de los planes a mostrar y se lo pasamos al componente OptionPlan para que los muestre. */}
            {planOptions.map(({id, logo, title, price, selected}: Plan) => (
                <OptionPlan
                onPlanSelect={onPlanSelect}
                key={id}
                id={id}
                logo={logo}
                title={title}
                price={price}
                selected={selected}
                planDuration={planDuration}
                />
            ))}
        </div>
        {/* Definimos el error para que sea mostrado o no. */}
        <div className={`${errorDisplay} font-medium text-[#ed3548] mt-5 text-center`}>
            Please select a plan.
        </div>
        {/* Definimos la información de los planes. */}
        <div className="font-medium -mb-[40px] -mt-[25px] md:mt-8 md:mb-0 bg-[#fafbff] text-[#02295a] p-2 rounded-xl">
            <div className="flex justify-center items-center space-x-5 text-[14px]">
                <div>Monthly</div>
                <div className="scale-75">
                    <label className="relative inline-flex items-center cursor-pointer">
                        {/* El input que maneja si es seleccionado o no el plan. */}
                        <input 
                            onChange={onToggleDuration}
                            type="checkbox"
                            value=""
                            checked={check}
                            className="sr-only peer" 
                        />
                        {/* Definimos los estilos por si cambia el input o no. */}
                        <div className="border-2 border-black w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
                    </label>
                </div>
                <div>Yearly</div>
            </div>
        </div>
    </div>
)}
