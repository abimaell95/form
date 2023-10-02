import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [state, setState] = useState(
    {
      sectionsToGo: [0,1,2,11,12],
      currentSection: 0,
      options:[{name:"Académico",selected:false}, {name:"Aula Virtual",selected:false}, {name:"Ayudantias",selected:false}, {name:"Consejerias",selected:false}, {name:"Prácticas",selected:false}, {name:"Certificados",selected:false}, {name:"Citas Médicas",selected:false}, {name:"Biblioteca Virtual",selected:false}],
    });

  const canNext = ()=>{
    let {sectionsToGo, currentSection} = state;
    return ! (sectionsToGo.indexOf(currentSection) == sectionsToGo.length - 1)
  }
  
  const handleNextSection = () =>{
    if(canNext()){
      let {sectionsToGo, currentSection} = state;
      let currentSectionIdx = sectionsToGo.indexOf(currentSection)
      let newSectionId = sectionsToGo[currentSectionIdx + 1]
      setState({
        ...state, currentSection: newSectionId
      })
    }
  }

  const canPrevious = ()=>{
    let {sectionsToGo, currentSection} = state;
    return !(sectionsToGo.indexOf(currentSection) == 0);
  }

  const handlePreviousSection = () =>{
    if(canPrevious()){
      let {sectionsToGo, currentSection} = state;
      let currentSectionIdx = sectionsToGo.indexOf(currentSection)
      let newSectionId = sectionsToGo[currentSectionIdx - 1]
      setState({
        ...state, currentSection: newSectionId
      })
    }
  }

  const handleOptionSelection = (idx)=>{
    let selectedOption = state.options[idx];
    let updatedOptions = state.options.map((option,optIdx)=>{
      if(idx==optIdx){
        return {...option, selected: !option.selected}
      }
      return option;
    });
    let updatedSections = state.sectionsToGo;
    if(!selectedOption.selected){
      updatedSections = [...updatedSections, idx+3]
      updatedSections.sort((a,b)=>a-b)
    }else{
      updatedSections = state.sectionsToGo.filter((optionId)=>{
        return optionId != idx+3
      })
    }
    setState({
      ...state, options: updatedOptions, sectionsToGo: updatedSections
    })
  }

  const getFormProgress = ()=>{
    let {sectionsToGo, currentSection} = state;
    let currentSectionIdx = sectionsToGo.indexOf(currentSection)
    if(currentSection!=12){
      let advance = (currentSectionIdx/sectionsToGo.length)*100;
      return advance;
    }
    return 100;
  }


  return (
    <main className='h-screen relative lg:px-32 xl:px-64 lg:py-32'>
       <div className="h-full relative flex flex-col gtebR">
        <div className="h-full flex-1 relative">
          <div className="h-full overflow-hidden">
            <div className="block">
              <div className="QVLX1">
                <div className="ddGQhK" style={{width: `${getFormProgress()}%`}}>
                  <div color="#37404a" className="hxwEWy"></div>
                </div>
              </div>
            </div>
            <SectionSelector  handleNextSection={handleNextSection} options={state.options} sectionNumber={state.currentSection} selectionHandler={handleOptionSelection}/>
            <div className="block">
              <div className="feCrOL">
                <div className="iEKGNA">
                  <div className="eHOVft">
                    <div className="llgSRH">
                      <div className="flex flex-row-reverse">
                        <nav className="IdseW">
                          <button className={`casmRy ${canNext() ? "hover:bg-slate-600": ""}`} onClick={handleNextSection} disabled={!canNext()}>
                            <span className="FlexWrapper-sc-__sc-1qu8p4z-1 dPEuYY">
                              <span className="ButtonTextWrapper-sc-__sc-1qu8p4z-4 kExVkt">
                                <span className="TextWrapper-sc-__sc-1f8vz90-0 eNNUTr"></span>
                              </span>
                              <span className="Spacer-sc-__sc-1fl5ef-0 biaTGg">
                                <span className="IconWrapper-sc-__sc-1qu8p4z-5 fUtdUI">
                                  <span className="Boundary-sc-__sc-184gmm6-0 BbziR">
                                    <svg style={canNext() ?{fill:"rgba(255, 255, 255, 1)"}:{fill:"rgba(255, 255, 255, 0.6)"}} height="9" width="14">
                                      <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path>
                                    </svg>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </button>
                          <div className="jkLxdx"></div>
                          <button data-qa="fixed-footer-navigation-previous" onClick={handlePreviousSection} className={`ButtonWrapper-sc-__sc-1qu8p4z-0 hMriYH ${canPrevious() ? "hover:bg-slate-600": ""}` } disabled={!canPrevious()}>
                            <span className="FlexWrapper-sc-__sc-1qu8p4z-1 dPEuYY">
                              <span className="ButtonTextWrapper-sc-__sc-1qu8p4z-4 kExVkt">
                                <span className="TextWrapper-sc-__sc-1f8vz90-0 eNNUTr"></span>
                              </span>
                              <span className="Spacer-sc-__sc-1fl5ef-0 biaTGg">
                                <span className="IconWrapper-sc-__sc-1qu8p4z-5 fUtdUI">
                                  <span className="Boundary-sc-__sc-184gmm6-0 eGqsoM">
                                    <svg style={canPrevious() ? {fill:"rgba(255, 255, 255, 1)"} : {fill:"rgba(255, 255, 255, 0.6)"}} height="9" width="14">
                                      <path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path>
                                    </svg>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>
  )
}


function SectionSelector({handleNextSection, options, sectionNumber, selectionHandler}){
  switch (sectionNumber) {
    case 0:
      return <FirstSection handleNextSection={handleNextSection}/>
    case 1:
      return <ContactSection />
    case 2:
      return <SecondSection options={options} selectionHandler={selectionHandler}/>
    case 12:
      return <Greetings/>
    default:
      return <ThirdSection selectedOption={sectionNumber}/>
  }
}

function FirstSection ({handleNextSection}){
  return(
    <div className="h-full grid lg:grid-cols-2">

      <div className="col-span-1 lg:py-12 flex flex-col justify-center">
        <div className="lg:px-32 px-12">
          <h1 className="text-start text-3xl text-gray-800 font-semibold">
            Campus Connect - Encuesta Estudiantil
          </h1>
          <br/>
          <p className="text-start text-xl text-gray-600">¡Tu voz cuenta! Participa en la Encuesta Estudiantil de Campus Connect y ayúdanos a mejorar tu experiencia académica.</p>
          <br/>
          <button className='px-5 py-3 bg-gray-800 border rounded-md text-white text-2xl hover:bg-gray-600' onClick={handleNextSection}>
            Continuar
          </button>
        </div>
      </div>
      <div className="col-span-1 lg:py-12 flex flex-col justify-center">
        <div className="px-32 px-12">
          <img src="/form.png"/>
        </div>
      </div>
    </div>
  );
}

function ContactSection (){
  return(
    <div className="h-full lg:grid lg:grid-cols-12 lg:py-12 flex flex-col justify-center px-8 lg:px-24 gap-4">
      <div className="col-span-5 lg:py-12 flex flex-col justify-center">
        <div className="">
          <h1 className="text-start text-3xl text-gray-800 font-semibold">
            Completa esta sección con tu información.
          </h1>
          <br/>
          <p className="text-start text-xl text-gray-600">Tu feedback es fundamental para mejorar tu experiencia en Campus Connect. ¡Gracias por ser parte de este proceso!</p>
          <br/>
        </div>
      </div>
      <div className="col-span-7 lg:py-12 flex flex-col lg:justify-center">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Correo</h1>
            <div className="hdHAaO text-lg">
              <textarea className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Año de Ingreso a ESPOL</h1>
            <div className="hdHAaO text-lg">
              <textarea className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Semestre de Ingreso</h1>
            <div className="hdHAaO text-lg flex gap-4">
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${true?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                  1S
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${false?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                  2S
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Año de Nacimiento</h1>
            <div className="hdHAaO text-lg">
              <textarea className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Género</h1>
            <div className="hdHAaO text-lg flex gap-4">
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${true?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                  M
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${false?"border-2 font-bold":"border"} border-gray-500 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                  F
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${false?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                No especifico
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Carrera</h1>
            <div className="hdHAaO text-lg">
              <Dropdown/>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">¿Eres de Guayaquil?</h1>
            <div className="hdHAaO text-lg flex gap-4">
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${true?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                  Sí
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${false?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>{}}>
                <div className="">
                  No
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function SecondSection ({options,selectionHandler}){
  return(
    <div className="h-full flex flex-col items-center justify-center">
      <div className="p-8">
        <h1 className="text-xl lg:text-3xl text-gray-600">¿Cuál de los siguientes servicios en línea de ESPOL utilizas con frecuencia?*</h1>
        <div className="lg:text-lg text-gray-500 mb-6">Puedes escoger hasta 3</div>
        <div className="grid lg:grid-cols-3 gap-4 text-2xl text-gray-600">
          {options.map((option, idx)=>(
          <div key={idx} className= {`flex justify-between flex-row text-lg lg:text-2xl ${option.selected?"border-2":"border"} border-gray-500 py-2 px-5 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>selectionHandler(idx)}>
            <div className="">
              {option.name}
            </div>
            {option.selected &&
              <div className="CheckboxContent-sc-__sc-1r651ck-1 lbQWmh order-last flex items-center">
                <span data-qa="icon-check-svg" className="Boundary-sc-__sc-184gmm6-0 hnRbqA">
                  <svg height="13" width="16">
                    <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
                  </svg>
                </span>
            </div>}
          </div>))}
        </div>
      </div>
    </div>
  );
}

function ThirdSection ({selectedOption}){

  const [inputH, setInputH] = useState(42) 

  const changeHeight = (e)=>{
    e.preventDefault();
    if(e.target.clientHeight < e.target.scrollHeight){
      setInputH(e.target.scrollHeight)
    }
  }

  

  const questionMap = {
    3: {question: "¿Qué dificultades has encontrado en el uso del Sistema Académico?", hint:"Ejemplo: "},
    4: {question: "¿Qué dificultades has encontrado en el uso del Aula Virtual?",hint:""},
    5: {question: "¿Qué dificultades has encontrado en el uso del Sistema de Ayudantías?",hint:""},
    6: {question: "¿Qué dificultades has encontrado en el uso del Sistema de Consejerias?",hint:""},
    7: {question: "¿Qué dificultades has encontrado en el uso del Sistema de Prácticas (Empresariales - Comunitarias)?",hint:""},
    8: {question: "¿Qué dificultades has encontrado en el uso del Sistema de Certificados?",hint:""},
    9: {question: "¿Qué dificultades has encontrado en el uso del Sistema de Citas Médicas?",hint:""},
    10: {question: "¿Qué dificultades has encontrado en el uso de la Biblioteca Virtual?", hint:""},
    11: {question: "Si tuvieras una varita mágica para mejorar los servicios en línea ESPOL y facilitar tu vida académica, ¿Qué añadirías?", hint:"Ejemplos: Un planificador de actividades. Notificación de mis tareas. Registro automático de materias."}
  };

  return(
    <div className="h-full flex flex-col items-center justify-center">
      <div className="px-8 text-start">
        <div className="iJgKPa">
          <h1 className="text-start text-xl lg:text-3xl text-gray-600">{questionMap[selectedOption].question}</h1>
          <div className='text-lg lg:text-xl text-gray-400'>{questionMap[selectedOption].hint}</div>
          <br/>
          <div className="hdHAaO text-xl lg:text-3xl">
            <textarea onInput={changeHeight} style={{"overflowX": "hidden", "overflowWrap": "break-word","height": `${inputH}px`}} className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdown(){

  const [state, setState] = useState({
    actionIcon : 0
  })

  
  
  const actionButton = (actionState)=> {
    switch (actionState) {
      case 0:
        return(
          <button tabindex="0" aria-controls="dropdown-1a2a59b1-5621-4d1a-a71f-eca68f429bcc-Yo6V3WL6w9YzLcKD-options-list" aria-expanded="false" aria-label="Mostrar opciones" class="IconWrapperRoot-sc-__sc-1w8q90m-4 jILXOM">
            <span class="Boundary-sc-__sc-184gmm6-0 hWOEmS">
              <svg height="9" width="14">
                <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path>
              </svg>
            </span>
          </button>
        );
      case 1:
        return(
          <button tabindex="0" aria-controls="dropdown-1a2a59b1-5621-4d1a-a71f-eca68f429bcc-Yo6V3WL6w9YzLcKD-options-list" aria-expanded="false" aria-label="Mostrar opciones" class="IconWrapperRoot-sc-__sc-1w8q90m-4 jILXOM">
            <span class="Boundary-sc-__sc-184gmm6-0 hWOEmS">
              <svg height="16" width="16">
                <path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path>
              </svg>
            </span>
          </button>
        );
      case 2:
        return(
          <button tabindex="0" class="jILXOM">
            <span class="hWOEmS">
              <svg height="16" width="16">
                <path d="M8 6.586l6-6L15.414 2l-6 6 6 6L14 15.414l-6-6-6 6L.586 14l6-6-6-6L2 .586l6 6z"></path>
              </svg>
            </span>
          </button>
        );
    }
    
  }


  return(
    <div class="relative">
      <div role="combobox" class="relative">
        <div class="width-full relative">
          <input  type="text" aria-autocomplete="list" placeholder="Escribe o selecciona una opción" class="jhCqZI" />
        </div>
       {actionButton(state.actionIcon)}
      </div>
      <div class="" >
        <div class="">
          <ul role="listbox" class="dJkqrm text-lg">
            <li class="jCeoNW hover:bg-gray-100" role="option" >
              <div data-qa="option-0-0-readable-element" class="ChoiceContent-sc-__sc-1r651ck-0 njCeoNW">
                <span class="A11yVisuallyHidden-sc-__sc-nyquty-0 ">FIEC</span>
              </div>
            </li>
            <li class="jCeoNW hover:bg-gray-50" role="option">
              <div data-qa="option-0-0-readable-element" class="ChoiceContent-sc-__sc-1r651ck-0 njCeoNW">
                <span class="A11yVisuallyHidden-sc-__sc-nyquty-0 ">FICMP</span>
              </div>
            </li>
            <li class="jCeoNW hover:bg-gray-50" role="option">
              <div data-qa="option-0-0-readable-element" class="ChoiceContent-sc-__sc-1r651ck-0 njCeoNW">
                <span class="A11yVisuallyHidden-sc-__sc-nyquty-0 ">FCNM</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Greetings (){
  return(
    <div className="h-full grid lg:grid-cols-2">

      <div className="col-span-2 lg:py-12 flex flex-col justify-center">
        <div className="lg:px-64 px-12 text-center">
          <h1 className="text-3xl text-gray-800 font-semibold">
          ¡Gracias por tu participación!
          </h1>
          <br/>
          <p className="text-xl text-gray-600">Tu opinión es esencial para nosotros y nos ayudará a mejorar Campus Connect. ¡Apreciamos tu tiempo y contribución a nuestra comunidad universitaria!</p>
          <br/>
        </div>
      </div>
    </div>
  );
}
function createAnswer(data){
  fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-dtudt/endpoint/answer', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((data)=>{
    console.log(data);
  });
};



export default App
