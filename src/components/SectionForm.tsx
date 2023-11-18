// Definimos los tipos necesarios.
type Props = {
    title: string,
    desc: string
}

export default function SectionForm({title, desc}: Props) {
  return (
    <div className="mb-8 -mt-[17px] px-5 md:px-1">
        {/* Muestra el title y desc (descripción) necesaria dinamicamente. */}
        <h1 className="text-3xl-font-bold text-[#02295a] my-1">{title}</h1>
        <p className="text-[#9699ab] text-[14px]">{desc}</p>
    </div>
    )
}
