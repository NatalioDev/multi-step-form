import { useEffect, useState } from "react"

// Definimmos los tipos necesarios.
type Props = {
    number: number,
    title: string,
    active: boolean,
}


export default function Step({number, title, active}: Props) {
    // Estado para manegar el fondo del "Step" activo.
    const [bg, setBg] = useState("");

    //Efecto para modificar dicho fondo.
    useEffect(() => {
        if(active) setBg("bg-[#adbeff] text-black");
        else setBg("");
    },[active])

  return (
    <div className="flex text-left space-x-7 text-white">
        {/* Muestra el número del "Step" actual */}
        <div className={`font-bold border p-2 ${bg} text-center w-10 h-10 rounded-full`}>
            {number}
        </div>
        {/* Muestra el "Step" actual y el nombre o lo oculta dependiendo del tamaño del dispositivo */}
        <div className="hidden md:block">
            <div className="font-regular uppercase text-gray-300 text-[14px]">
                Step {number}
            </div>
            <div className="font-bold text-[15px]">{title}</div>
        </div>
    </div>
    )
}
