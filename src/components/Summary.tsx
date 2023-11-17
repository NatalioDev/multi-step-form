import { useEffect, useState } from "react"
// Importamos el componente necesario.
import SectionForm from "./SectionForm";

// Definimos los tipos necesarios.
type Props = {
    currentStep: number,
    selectedPlan: Plan,
    selectedAddons: Addon[],
    onChangeClick: () => void,
    planDuration: string,
    planDurationName:string,
}
// Los tipos del Plan.
type Plan = {
    title: string;
    price: number;
    yearly: boolean;
}

// Los tipos del Addon.
type Addon ={
    id: number,
    title: string,
    price: number,
}

export default function Summary({
    selectedPlan,
    selectedAddons,
    onChangeClick,
    planDuration,
    planDurationName,
}: Props) {

    // Estado que maneja el precio del Plan.
    const [planPrice, setPlanPrice] = useState(() => selectedPlan.price);

    // Estado que maneja el precio de los Addons.
    const [addonsPrice, setAddonsPrice] = useState(() => {
        if (selectedAddons.length == 0) {
            return 0;
        } else {
            let totalAddonsPrice = 0;
            selectedAddons.map((addon) => {
                totalAddonsPrice += addon.price;
            });
            return totalAddonsPrice;
        }
    });

    // Estado que maneja el precio total.
    const [grandTotal, setGrandTotal] = useState(() => planPrice + addonsPrice);

    // Efecto que carga los estados para que sean utilizados.
    useEffect(() => {
    },[selectedPlan, selectedAddons])

    // Los llamo para que no me den error al desplegar.
    setAddonsPrice;
    setGrandTotal;
    setPlanPrice;




  return (
    <div className="px-5 md:px-1">
      {/* Pasamos el titulo y descripción del componente actual */}
        <SectionForm
            title="Finishing up"
            desc="Double-check everything looks OK before confirming."
        />
        <div>
            <div className="rounded-xl px-5 p-5 mb-5 bg-[#f0f6ff]">
                <div className="flex px-5 font-medium text-[#02295a] justify-between items-center mb-3">
                    <div className="mb-5">
                        {/* Mostramos el titulo del plan seleccionado. */}
                        <div>
                            {selectedPlan.title} {`(${planDurationName})`}
                        </div>
                        {/* Enlace para volver y cambiar el plan */}
                        <a
                            onClick={onChangeClick}
                            className="text-[#9699ab] text-sm cursor-pointer underline decoration-solid"
                        >
                            Change
                        </a>
                    </div>
                        {/* Mostramos el plan y la duración del mismo */}
                    <div className="font-medium">
                        ${selectedPlan.price}/{planDuration}
                    </div>
                </div>
                {/* Mostramos los addons seleccionados con su precio */}
                <div className="mb-10 space-y-3 text-sm border-t-2 pt-4 text-[#9699ab]">
                    {selectedAddons.map((addon) => (
                        <div  
                            key={addon.id}
                            className="flex justify-between items-center">
                                <div>{addon.title}</div>
                                <div> 
                                    +${addon.price}/{planDuration}
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Mostramos el total */}
            <div className="flex justify-between items-center px-5">
                <div className="text-sm text-[#9699ab]">
                    Total per{" "}
                    {planDurationName
                        .toLowerCase()
                        .substring(0, planDurationName.length - 2)
                    }
                </div>
                <div className="font-bold text-[#473dff]">
                    +${grandTotal}/{planDuration}
                </div>
            </div>
        </div>
    </div>
  )
}
