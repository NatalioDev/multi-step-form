import { useEffect, useState } from "react"

// Definimos los tipos necesarios.
type Props ={
    id: number,
    logo: string,
    title: string,
    price: number,
    onPlanSelect:  (title: string, price: number, id: number) => void;
    selected: boolean,
    planDuration: string
}

export default function OptionPlan({
    id,
    logo,
    title,
    price,
    onPlanSelect,
    selected,
    planDuration,
}: Props) {

  // Estado que maneja el fondo de la opción del plan seleccionado.
    const [bg, setBg] = useState("");

    //Estado que maneja si mostrar el descuento de 2 Months Free si es seleccionado o no.
    const [displayTwoMonths, setDisplayTwoMonths] = useState("invisible");

    // Efecto que maneja los estado anteriores.
    useEffect(() => {
      //Cambia si es visible o no el descuento
      if(planDuration == "mo"){
        setDisplayTwoMonths("invisible");
      } else {
        setDisplayTwoMonths("block")
      }

      //Cambia el fondo del plan si es seleccionado o no.
      if(selected){
        setBg("bg-[#f0f6ff]");
      } else {
        setBg("");
      }
    
    }, [selected, planDuration]);
    

  return (
    //El div principal que envuelve nuetro plan individual y le pasamos la función necesaria para que el estado maneje si es seleccionado o no para utilizarlo mas tarde y mostrarle al usuario al final.
    //En el estilo le pasamos el estado "bg" para que el estado lo cambie si es seleccionado o no el plan.
    <div
        onClick={() => onPlanSelect(title, price, id)}
        className={`${bg} border border-[#d6d9e6] rounded-xl flex flex-row md:flex-col justify-start md:justify-between items-left pt-5 cursor-pointer hover:border-[#473dff] focus:bg-violet-700`}
    >
      {/* Envuelve el logo del plan */}
        <div className="mb-5 px-4 md:px-0 md:ml-[13px] lg:ml-7 md:mb-10 md:mr-0">
            <img src={logo} alt="Plan Option" />
        </div>
        {/* Envuelve el title y el precio del plan. */}
        <div>
            <div className="md:ml-2 md:text-xs lg:text-base font-medium text-[#02295a]">{title}</div>
            <div className="md:ml-2 mb-3 text-[14px] text-[#9699ab]">
                ${price}/{planDuration}
            </div>
            {/* Se muestra el descuento si es seleccionado o no. */}
            <div className={`${displayTwoMonths} md:px-1 md:text-[9px] font-medium text-[#02295a] mb-3 -mt-2 w-full md:w-[100px] lg:text-[13px]`}>
                2 Months Free
            </div>
        </div>
    </div>
  )
}
