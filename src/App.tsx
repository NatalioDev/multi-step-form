// Importando las dependencias necesarias.
import { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
// Imagenes de fondo segun el dispositivo.
import BgSidebar from '../public/assets/images/bg-sidebar-desktop.svg';
import BgSidebarMobile from '../public/assets/images/bg-sidebar-mobile.svg';
// Componentes.
import Step from './components/Step';
import Thankyou from './components/Thankyou';
import Info from './components/Info';
import Plan from './components/Plan';
import Addons from './components/Addons';
import Summary from './components/Summary';

// Logos e imagenes.
import arcadeLogo from "../public/assets/images/icon-arcade.svg";
import advancedLogo from "../public/assets/images/icon-advanced.svg";
import proLogo from "../public/assets/images/icon-pro.svg"

// Definimos tipos de datos para la información del usuario. Opciones de Addon, Addon, Plan, etc.
type Info = {
  name: string,
  email: string,
  phone: string | number,
}

interface AddonOptions {
  id: number;
  title: string;
  desc: string;
  price: number;
  monthlyPrice: number;
  yearlyPrice: number;      
  selected: boolean;
}

interface Addon {
  id: number;
  title: string;
  price: number;
}

interface Plan {
  title: string;
  price: number;
  yearly: boolean;
}


function App() {
  // Estado para gestionar las etapas del formulario.
  const [steps, setSteps]=useState([
    {id:1, title: "YOUR INFO", active: true},
    {id:2, title: "SELECT PLAN", active: false},
    {id:3, title: "ADD-ONS", active: false},
    {id:4, title: "SUMMARY", active: false},
  ])

  // Estado para rastrear el número de estapa "step" actual.
  const [stepNumber, setStepNumber] = useState(() => 1)

  // Estado para almacenar la información del usuario.
  const [yourInfo, setYourInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Estado para gestionar la visibilidad del botón "Go back".
  const [goBackVisible, setGoBackVisible] = useState("invisible")

  // Estado para gestionar la visibilidad del mensaje de erro si algún campo está vacío.
  const [isEmpty, setIsEmpty] = useState(false);

  //Estado para gestionar la visibilidad del mensaje de error si no se ha seleccionado un plan.
  const [isPlanEmpty, setIsPlanEmpty] = useState(false);

  // Estado para gestionar la duración del plan (mensual o anual).
  const [planDuration, setPlanDuration] = useState("mo");

  // Estado para almacenar el nombre de la duración del plan (mensual o anual).
  const [planDurationName, setPlanDurationName] = useState("Monthly")

  // Estado para almacenar la información del plan seleccionado.
  const [plan, setPlan] = useState<Plan>(
    {
      title: " ",
      price: 0,
      yearly: false,
    })

  // Estado para almacenar las opciones de Plan.
  const [planOptions, setPlanOptions] = useState([
    {
      id: 1,
      logo: arcadeLogo,
      title: "Arcade",
      price: 9,
      monthlyPrice: 9,
      yearlyPrice: 90,
      selected: false,
    },
    {
      id: 2,
      logo: advancedLogo,
      title: "Advanced",
      price: 12,
      monthlyPrice: 12,
      yearlyPrice: 120,
      selected: false,
    },
    {
      id: 3,
      logo: proLogo,
      title: "Pro",
      price: 15,
      monthlyPrice: 15,
      yearlyPrice: 150,
      selected: false,
    },
  ])

  // Estado para almacenar las opciones de Addon.
  const [addonOptions, setAddonOptions] = useState<AddonOptions[]>([
    {
      id: 1,
      title: "Online service",
      desc: "Access to multiplayer games",
      price: 1,
      monthlyPrice: 1,
      yearlyPrice: 10,
      selected: false,
    },
    {
      id: 2,
      title: "Larger storage",
      desc: "Extra 1TB of cloud save",
      price: 2,
      monthlyPrice: 2,
      yearlyPrice: 20,
      selected: false,
    },
    {
      id: 3,
      title: "Customizable profile",
      desc: "Custom theme on your profile",
      price: 2,
      monthlyPrice: 2,
      yearlyPrice: 20,
      selected: false,
    },
  ]);

  // Esatdo para almacenar los Addons seleccionados.
  const [addons, setAddons] = useState<Addon[]>([]);

  // Estado para mostrar el componente de agredeciomiento "Thankyou" después de completar el formulario.
  const [displayThankyou, setDisplayThankyou] = useState(false);



// Este efecto se ejecutará cada vez que cambie 'stepNumber'.
  useEffect(() => {
    setSteps((prevSteps) => {
      // Mapea sobre las etapas previas y actualiza el estado 'active' según la etapa actual.
      const updatedSteps = prevSteps.map((steps) =>{
        if(steps.id === stepNumber){
          return{...steps, active: true}
        }else{
          return{...steps, active: false}
        }
      });
      return updatedSteps
    });
    displayThankyou;
    // Actualiza la visibilidad del botón "Go back" según la etapa actual.
    if (stepNumber > 1) {
      setGoBackVisible("visible")
    } else {
      setGoBackVisible("invisible")
    }
  },[
    stepNumber,
    yourInfo,
    plan,
    planOptions,
    isPlanEmpty,
    addons,
    displayThankyou,
  ])

  // Functions

  // Función para avanzar a la siguiente etapa del formulario.
  const nextStep = () =>{
    //Validaciones específicas para cada etapa.
    if (stepNumber == 1) {
      if (
        yourInfo.name.length == 0 || 
        yourInfo.email.length == 0 ||
        yourInfo.phone.length == 0
      ) {
        setIsEmpty(true);
        return;
      } else {
        setIsEmpty(false);
      }
    }

    if (stepNumber == 2) {
      if (plan.title.length == 0) {
        setIsPlanEmpty(true); 
        return;
      } else {
        setIsPlanEmpty(false);
      }
      
    }
    // Avanza a la siguiente etapa.
    setStepNumber((prevStep) => prevStep + 1);
  };

  // Función para retroceder a la etapa anterior.
  const prevStep = () =>{
    setStepNumber((prevStep) => prevStep - 1)
  };

  // Función para retroceder dos etapas.
  const changeClick = () => {
    setStepNumber((prevStep) => prevStep - 2)
  };

  // Función para seleccionar un plan.
  const selectPlan = (title: string, price: number, id: number) => {
    setPlanOptions((prevPlanOptions) => {
      const updatedPlanOptions = prevPlanOptions.map((planOption) => {
        if (planOption.id == id) {
          return { ...planOption, selected: true }
        } else {
          return {... planOption, selected: false}
        }
      })
      return updatedPlanOptions;
    });

    setPlan((prevPlan) => {
      return {...prevPlan, title: title, price: price};
    });
  };

  // Función para manejar el cambio en la selección de una casilla de Addon.
  const checkBox = (e: ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.getAttribute("data-id")  || "0");
    const title = e.target.getAttribute("data-title-name") || "";
    const price = parseInt(e.target.getAttribute("data-price") || "0");
    if (e.target.checked == true) {
      setAddons((prevAddons) => [
        ...prevAddons,
        {id: id, title: title, price: price},
      ]);
    } else {
      setAddons((prevAddons) => {
        return prevAddons.filter((addon) => addon.id != id);
      })
    }

    setAddonOptions((prevAddons) => {
      const updateAddons = prevAddons.map((addon) => {
        if (addon.id == id) {
          if (addon.selected == false) {
            return {...addon, selected: true};
          }else{
            return {...addon, selected: false};
          }
        }else{
          return addon;
        }
      });
      return updateAddons;
    })
  }

  // Función para cambiar la duración del plan (mensual o anual).
  const toggleDuration = () =>{
    if (plan.yearly == false) {
      setPlan((prevPlan) =>{
        setPlanDuration("yr");
        setPlanDurationName("Yearly");

        // Actualiza los precios de las opciones de Plan y Addons para el modo anual.
        setPlanOptions((prevPlanOptions) =>{
          const updatedPlanOptions = prevPlanOptions.map((planOption) =>{
            return { ...planOption, price: planOption.yearlyPrice};
          });
          return updatedPlanOptions;
        });

        setAddonOptions((prevAddonOptions) => {
          const updateAddonOptions = prevAddonOptions.map((addonOptions) => {
            return { ...addonOptions, price: addonOptions.yearlyPrice};
          });
          return updateAddonOptions;
        });
        return { ...prevPlan, yearly:true};
      })
    } else {
      setPlan((prevPlan) => {
        setPlanDuration("mo");
        setPlanDurationName("Monthly");

        // Actualiza los precios de las opciones de Plan y Addons para el modo anual.
        setPlanOptions((prevPlanOptions) => {
          const updatedPlanOptions = prevPlanOptions.map((planOption) => {
            return { ...planOption, price: planOption.monthlyPrice};
          });
          return updatedPlanOptions;
        });

        setAddonOptions((prevAddonOptions) => {
          const updateAddonOptions = prevAddonOptions.map((addonOption) => {
            return { ...addonOption, price: addonOption.monthlyPrice};
          });
          return updateAddonOptions;
        });
        return { ...prevPlan, yearly:false};
      })
    }
  }

  // Función para manejar el cambio de la información del usuario.
  const changeYourInfo = (event: ChangeEvent<HTMLInputElement>) => {
    setYourInfo((prevInfo) => {
      return{ ...prevInfo, [event.target.name]: event.target.value };
    });
  };

  return (
    <>
      <div className="container md:p-5">
        <main className='bg-white md:bg-white rounded-xl md:p-4 md:flex justify-center'>
          {/* Barra lateral */}
          <div className="relative">
            <img
              className='hidden md:block'
              src={BgSidebar} 
              alt="Sidebar" />
              <img 
                src={BgSidebarMobile} 
                alt="Topbar" 
                className="block md:hidden m-0 p-0 w-screen" />
            <div className='flex justify-center mt-8 absolute inset-0 space-x-10 md:space-x-0 md:block md:mt-0 md:pl-6 md:pt-8 md:space-y-7'>
              {steps.map(({id, title, active}) =>
              // Renderiza componentes 'Step' para cada etapa.
                <Step 
                  key={id}
                  number={id}
                  title={title}
                  active={active}
                />
              )}
              
            </div>
          </div>
          {/* Contenido principal del formulario. */}
          <div className="flex justify-between flex-grow flex-shrink lg:px-0 mx-12 md:flex-col md:justify-between absolute top-[95px] max-w-[350px] md:static mb-10 rounded-2xl pt-10 pb-16 bg-white md:px-0 md:py-5 md:mx-28 md:w-100 md:my-2">
            {/* Muestra el componente correspondiente a cada etapa actual. */}
            {( displayThankyou && (
              <>
                <Thankyou/>
              </>
            )) || (
              <>
                <div>
                  {(stepNumber === 1 && (
                    <Info
                      onChangeYourInfo={changeYourInfo}
                      yourInfo={yourInfo}
                      currentStep={stepNumber}
                      isEmpty={isEmpty}
                    />
                  )) || 
                    (stepNumber === 2 && (
                      <Plan
                        onPlanSelect={selectPlan}
                        onToggleDuration={toggleDuration}
                        currentStep={stepNumber}
                        planOptions={planOptions}
                        isPlanEmpty={isPlanEmpty}
                        planDuration={planDuration}
                      />
                    )) || (
                      (stepNumber === 3 && (
                        <Addons
                          onBoxCheck={(e: ChangeEvent<HTMLInputElement>) => checkBox(e)}
                          currentStep={stepNumber}
                          addonOptions={addonOptions}
                          planDuration={planDuration}
                        />
                      )) || 
                      (stepNumber === 4 && (
                        <Summary
                        selectedPlan={plan}
                        selectedAddons={addons}
                        currentStep={stepNumber}
                        planDuration={planDuration}
                        planDurationName={planDurationName}
                        onChangeClick={changeClick}
                        />
                      ))
                    )}
                </div>
              </>
            )}
            {/* Contiene la parte de los botones del formulario */}
            <div className="flex justify-between fixed px-16 bottom-0 top-auto left-0 w-screen md:w-full bg-white p-5 md:static md:p-0 items-center lg:items-end">
              <div
                  onClick={prevStep}
                  className={`font-medium lg:mb-3 md:mt-4 text-[#9699ab] select-none cursor-pointer transition duration-100 hover:text-[#02295a] ${goBackVisible}`}
                >
                  Go back
                </div>
                {stepNumber === 4 ? (
                  <div
                    onClick={() => setDisplayThankyou(true)}
                    className="font-medium bg-[#473dff] md:mt-4 select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90"
                  >
                    Confirm
                  </div>
                ) : (
                  <div
                    onClick={nextStep}
                    className="font-medium md:mt-3 bg-[#02295a] select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90"
                  >
                    Next Step
                  </div>
                )}
              </div>
            </div>          
        </main>
      </div>
    </>
  )
}

export default App
