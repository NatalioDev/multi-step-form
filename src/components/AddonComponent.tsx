import { ChangeEvent, useEffect, useState } from "react"

// Definimos los tipos necesarios.
type Props ={
    id: number,
    title: string,
    desc: string,
    price: number,
    selected: boolean,
    onBoxCheck:(e: ChangeEvent<HTMLInputElement>) => void,
    planDuration: string,
}

export default function AddonComponent(
    {
        id,
        title,
        desc,
        price,
        selected,
        onBoxCheck,
        planDuration,
    } : Props
) {

    /// Estado que maneja si se agrega un o los Addon necesario/s
    const [addonBg, setAddonBg] = useState("");

    // Estado que maneja los checks seleccionados.
    const [check, setCheck] = useState(false);

    //Efecto que maneja los estados anteriores.
    useEffect(()=> { 
        // Cambia el fondo si es seleccionado o no.
        if(selected){
            setAddonBg("bg-[#f0f6ff]");
            setCheck(true);
        } else {
            setAddonBg("");
            setCheck(false);
        }
    },[selected, check]);

  return (
    // Envuelve el componente y le pasamos en los estilos el estado para que cambie el fondo si es necesario.
    <div className={`${addonBg} flex justify-between items-center border border-[#d6d9e6] space-x-5 md:space-x-40 py-3 pr-8 pl-6 rounded-xl hover:border-[#02295a]`}>
        <div className="flex items-center justify-between w-full space-x-6">
            <div className="flex items-center w-full space-x-5">
                {/* Definimos el input para el check */}
                <input 
                    type="checkbox"
                    onChange={onBoxCheck}
                    data-id={id}
                    data-title-name={title}
                    data-price={price}
                    checked={check}
                    className="w-4 h-4" 
                />
                {/* Definimos el titulo y la desc (descripción) del Addon. */}
                <div>
                    <div className="font-bold w-full text-[#02295a]">{title}</div>
                    <div className="text-[#9699ab] text-sm">{desc}</div>
                </div>
            </div>
            {/* Definimos el precio y su duración */}
            <div className="font-bold text-sm text-[#adbeff]">
                +${price}/{planDuration}
            </div>
        </div>
    </div>
)}
