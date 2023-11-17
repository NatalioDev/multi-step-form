import { ChangeEvent, useEffect, useState } from "react"

// Definios los tipos necesarios.
type Props = {
    name: string,
    label: string,
    placeholder: string,
    onChangeYourInfo: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string | number,
    isEmpty: boolean,
}


export default function FormField(
    {name,
    label,
    placeholder,
    onChangeYourInfo,
    value,
    isEmpty
}: Props
) {
    // Estado para manejar en hidden del formulario.
    const [displayRequired, setDisplayRequired] = useState("hidden");

    // Estado para manejar si hay algun error en el formulario.
    const [redBorder, setRedBorder] = useState("border-[#d6d9e6]");

    // Efecto para manejar si se cambian los estados.
    useEffect(() => {
        if(isEmpty == true){
            setDisplayRequired('block')
            setRedBorder('border-[#ed3548]')
        }
    },[isEmpty])

  return (
    <div>
        {/* Mostramos el label y el mensaje de error si es necesario. */}
        <div className="flex justify-between items-center">
            <label>{label}</label>
            <p className={`${displayRequired} font-medium text-[14px] text-[#ed3548]`}>
                This field is required
            </p>
        </div>
        {/* Mostramos los input necesarios y en los estilos le pasamos el "redBorder" por si hay algun error en los datos del formulario. */}
        <div>
            <input 
                type="text" 
                className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
                name={name}
                onChange={onChangeYourInfo}
                placeholder={placeholder}
                value={value}
            />
        </div>
    </div>
    )
}
