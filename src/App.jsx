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
      answer: {
        "0":"",
        "1":"",
        "2":"",
        "3":"",
        "4":"",
        "5":"",
        "6":"",
        "7":"",
        "8":"",
        "email":"",
        "start_year":"",
        "start_semester":"",
        "birth_year":"",
        "gender":"",
        "from_gye":false,
        "faculty":"",
        "career":""
     }});

  const canNext = ()=>{
    let {sectionsToGo, currentSection} = state;
    if(currentSection===11||currentSection===12){
      return false
    }else{
      return ! (sectionsToGo.indexOf(currentSection) == sectionsToGo.length - 1)  
    }
  }


  const onChangeAnswer = (key, value) =>{
    setState({
      ...state, answer: {...state.answer, [key]: value}
    })
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

  const nextToGreetings = ()=>{
    setState({
      ...state, currentSection: 12
    })
  }

  const canPrevious = ()=>{
    let {sectionsToGo, currentSection} = state;
    if(currentSection===12){
      return false
    }else{
      return !(sectionsToGo.indexOf(currentSection) == 0);
    }
    
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
    let validateThree = state.options.filter((option)=>option.selected).length < 3;
    let validateSelected = state.options[idx].selected;
    if( validateThree || validateSelected){
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
            <SectionSelector  nextToGreetings={nextToGreetings} answers={state.answer} onChangeAnswer={onChangeAnswer} handleNextSection={handleNextSection} options={state.options} sectionNumber={state.currentSection} selectionHandler={handleOptionSelection}/>
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


function SectionSelector({ answers, onChangeAnswer , handleNextSection, options, sectionNumber, selectionHandler, nextToGreetings}){
  switch (sectionNumber) {
    case 0:
      return <FirstSection handleNextSection={handleNextSection}/>
    case 1:
      return <ContactSection onChangeAnswer={onChangeAnswer} answers={answers}/>
    case 2:
      return <SecondSection options={options} selectionHandler={selectionHandler}/>
    case 12:
      return <Greetings/>
    default:
      return <ThirdSection selectedOption={sectionNumber} onChangeAnswer={onChangeAnswer} answers={answers} nextToGreetings={nextToGreetings} />
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
          <img src="https://raw.githubusercontent.com/abimaell95/form/5c701215c764ba5e042cb1b72713e94e1e692145/public/form.png"/>
        </div>
      </div>
    </div>
  );
}

function ContactSection ({onChangeAnswer, answers}){

  const [state, setState] = useState({
    email:"",
    start_year:"",
    start_semester:"",
    birth_year:"",
    gender:"",
    from_gye:false,
    career:"",
  })


  const onChangeInput = (e, key) =>{
    setState({...state, [key]: e.target.value});
    
    switch (key) {
      case 'email':
        onChangeAnswer('email', e.target.value);
        break;
      case 'start_year':
        onChangeAnswer('start_year', e.target.value);
        break;
      case 'birth_year':
        onChangeAnswer('birth_year', e.target.value);
        break;
    }

  }


  const onChangeCategoricalOption = (key, value) =>{
    setState({...state, [key]: value});

    switch (key) {
      case 'start_semester':
        onChangeAnswer('start_semester', value);
        break;
      case 'gender':
        onChangeAnswer('gender', value);
        break;
      case 'from_gye':
        onChangeAnswer('from_gye', value);
        break;
    }
  }
  
  const onChangeCareer = (value)=>{
    setState({...state, career: value});
    onChangeAnswer('career',value)
  }




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
              <textarea value={answers.email} onInput={(e)=>onChangeInput(e, 'email')} className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Año de Nacimiento</h1>
            <div className="hdHAaO text-lg">
              <textarea value={answers.birth_year} onInput={(e)=>onChangeInput(e, 'birth_year')} className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Año de Ingreso a ESPOL</h1>
            <div className="hdHAaO text-lg">
              <textarea value={answers.start_year} onInput={(e)=>onChangeInput(e, 'start_year')} className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Semestre de Ingreso</h1>
            <div className="hdHAaO text-lg flex gap-4">
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${answers.start_semester=="1S"?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>onChangeCategoricalOption('start_semester','1S')}>
                <div className="">
                  1S
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${answers.start_semester=="2S"?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>onChangeCategoricalOption('start_semester','2S')}>
                <div className="">
                  2S
                </div>
              </div>
            </div>    
          </div>
          
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">Género</h1>
            <div className="hdHAaO text-lg flex gap-4">
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${answers.gender=="M"?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>onChangeCategoricalOption('gender','M')}>
                <div className="" >
                  M
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${answers.gender=="F"?"border-2 font-bold":"border"} border-gray-500 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>onChangeCategoricalOption('gender','F')}>
                <div className="" > 
                  F
                </div>
              </div>
              <div className= {`flex justify-between flex-row text-sm lg:text-sm ${answers.gender=="N/A"?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={()=>onChangeCategoricalOption('gender','N/A')}>
                <div className="" >
                No especifico
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-start text-xl text-gray-800 mb-2">¿Eres de Guayaquil?</h1>
            <div className="hdHAaO text-lg flex gap-4">
              <div onClick={()=>onChangeCategoricalOption('from_gye',true)} className= {`flex justify-between flex-row text-sm lg:text-sm ${answers.from_gye?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`} >
                <div className="">
                  Sí
                </div>
              </div>
              <div onClick={()=>onChangeCategoricalOption('from_gye',false)} className= {`flex justify-between flex-row text-sm lg:text-sm ${!answers.from_gye?"border-2 font-bold":"border"} border-gray-500 py-2 px-3 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer`}>
                <div className="">
                  No
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-2">
            <h1 className="text-start text-xl text-gray-800 mb-2">Carrera</h1>
            <div className="hdHAaO text-lg">
              <Dropdown onChangeCareer={onChangeCareer} answers={answers}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function SecondSection ({options,selectionHandler}){


  const setClassName = (option)=>{
    const classNames = ["flex justify-between flex-row text-lg lg:text-2xl border-gray-500 py-2 px-5 rounded-md"]
    if(option.selected){
      classNames.push('border-2')
      classNames.push('bg-gray-200 hover:bg-gray-300 cursor-pointer')
    }else{
      if(options.filter((option)=>option.selected).length === 3){
        classNames.push('border border-gray-300')
        classNames.push('bg-gray-100 text-gray-400')
      }else{
        classNames.push('border')
        classNames.push('bg-gray-200 hover:bg-gray-300 cursor-pointer')
      }
    }
    return classNames.join(' ');
  }

  return(
    <div className="h-full flex flex-col items-center justify-center">
      <div className="p-8">
        <h1 className="text-xl lg:text-3xl text-gray-600">¿Cuál de los siguientes servicios en línea de ESPOL utilizas con frecuencia?*</h1>
        <div className="lg:text-lg text-gray-500 mb-6">Puedes escoger hasta 3</div>
        <div className="grid lg:grid-cols-3 gap-4 text-2xl text-gray-600">
          {options.map((option, idx)=>(
          <div key={idx} className= {setClassName(option)} onClick={()=>selectionHandler(idx)}>
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

function ThirdSection ({selectedOption, onChangeAnswer, answers, nextToGreetings}){

  const [inputH, setInputH] = useState(42)

  const [loading, setLoading] = useState(false);

  const careerMap = {"Diseño Gráfico":"FADCOM",
  "Diseño de Productos":"FADCOM",
  "Producción para Medios de Comunicación":"FADCOM",
  "Biología":"FCV",
  "Ingeniería Agrícola y Biológica":"FCV",
  "Nutrición y Dietética":"FCV",
  "Matemática":"FCNM",
  "Ingeniería Química":"FCNM",
  "Logistica y Transporte":"FCNM",
  "Estadística":"FCNM",
  "Turismo":"FCSH",
  "Auditoría y Control de Gestión":"FCSH",
  "Economía":"FCSH",
  "Administración de Empresas":"FCSH",
  "Arqueología":"FCSH",
  "Ingeniería Civil":"FICT",
  "Petróleos":"FICT",
  "Geología":"FICT",
  "Minas":"FICT",
  "Electricidad":"FIEC",
  "Telemática":"FIEC",
  "Computación":"FIEC",
  "Electrónica y Automatización":"FIEC",
  "Telecomunicaciones":"FIEC",
  "Mecatrónica":"FIMCP",
  "Ingeniería Industrial":"FIMCP",
  "Mecánica":"FIMCP",
  "Alimentos":"FIMCP",
  "Materiales":"FIMCP",
  "Ingeniería Naval":"FIMCM",
  "Acuicultura":"FIMCM",
  "Oceanografía":"FIMCM"}

  const onChangeInput = (e)=>{
    let idx =  (selectedOption - 3).toString();
    e.preventDefault();
    onChangeAnswer(idx,e.target.value);
    if(e.target.clientHeight < e.target.scrollHeight){
      setInputH(e.target.scrollHeight)
    }
  }

  const createAnswer = (data)=>{
    setLoading(true);
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
      setLoading(false);
      nextToGreetings()
      console.log(data)
    });
  };

  const sendAnswer = ()=>{
    if(!loading){
      let faculty = careerMap[answers.career]
      createAnswer({...answers, faculty:faculty})
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
            <textarea value={answers[(selectedOption - 3).toString()]} onInput={onChangeInput} style={{"overflowX": "hidden", "overflowWrap": "break-word","height": `${inputH}px`}} className="auto-size-text-area"  placeholder="Escribe aquí tu respuesta..." rows="1"></textarea>
          </div>
          {selectedOption==11 && 
          <>
          <br/>
          <button className={`inline-flex items-center px-5 py-3 border rounded-md text-white text-2xl ${loading?'bg-gray-600':' bg-gray-800  hover:bg-gray-600'}`} onClick={sendAnswer}>
            {loading && <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
            Enviar
          </button>
          </>}
        </div>
      </div>
    </div>
  );
}

function Dropdown({onChangeCareer, answers}){
  const options = 
  ["Diseño Gráfico",
  "Diseño de Productos",
  "Producción para Medios de Comunicación",
  "Biología",
  "Ingeniería Agrícola y Biológica",
  "Nutrición y Dietética",
  "Matemática",
  "Ingeniería Química",
  "Logistica y Transporte",
  "Estadística",
  "Turismo",
  "Auditoría y Control de Gestión",
  "Economía",
  "Administración de Empresas",
  "Arqueología",
  "Ingeniería Civil",
  "Petróleos",
  "Geología",
  "Minas",
  "Electricidad",
  "Telemática",
  "Computación",
  "Electrónica y Automatización",
  "Telecomunicaciones",
  "Mecatrónica",
  "Ingeniería Industrial",
  "Mecánica",
  "Alimentos",
  "Materiales",
  "Ingeniería Naval",
  "Acuicultura",
  "Oceanografía"]

  const [state, setState] = useState({
    actionIcon : 0,
    filteredOptions: options,
    keyStr:""
  })
  
  const actionButton = (actionState)=> {
    switch (actionState) {
      case 0:
        return(
          <button tabIndex="0" aria-controls="dropdown-1a2a59b1-5621-4d1a-a71f-eca68f429bcc-Yo6V3WL6w9YzLcKD-options-list" aria-expanded="false" aria-label="Mostrar opciones" className="IconWrapperRoot-sc-__sc-1w8q90m-4 jILXOM">
            <span className="Boundary-sc-__sc-184gmm6-0 hWOEmS">
              <svg height="9" width="14">
                <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path>
              </svg>
            </span>
          </button>
        );
      case 1:
        return(
          <button tabIndex="0" aria-controls="dropdown-1a2a59b1-5621-4d1a-a71f-eca68f429bcc-Yo6V3WL6w9YzLcKD-options-list" aria-expanded="false" aria-label="Mostrar opciones" className="IconWrapperRoot-sc-__sc-1w8q90m-4 jILXOM">
            <span className="Boundary-sc-__sc-184gmm6-0 hWOEmS">
              <svg height="16" width="16">
                <path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path>
              </svg>
            </span>
          </button>
        );
    }
    
  }

  const filterOptions = (keyStr)=>{
    return options.filter((option)=>{
      return option.toLowerCase().includes(keyStr.toLowerCase());
    });
  }

  const handleInputChange = (e)=>{
    e.preventDefault();
    setState({...state, filteredOptions: filterOptions(e.target.value), keyStr:e.target.value })
    onChangeCareer(e.target.value)
  }

  const autoCompleteOption = (idx)=>{
    setState({...state, keyStr: state.filteredOptions[idx], actionIcon: 0});
    onChangeCareer(state.filteredOptions[idx]);
  }


  return(
    <div className="relative">
      <div role="combobox" className="relative">
        <div className="width-full relative">
          <input value={answers.career} onFocus={()=>{setState({...state, actionIcon:1})}} onInput={handleInputChange} type="text" aria-autocomplete="list" placeholder="Escribe o selecciona una opción" className="jhCqZI" />
        </div>
       {actionButton(state.actionIcon)}
      </div>
      <div className="" >
        <div className="">
          <ul role="listbox" className="dJkqrm text-lg">
            {(state.actionIcon!=0 && state.filteredOptions) && state.filteredOptions.map((option, idx)=>(
            <li key={idx} className="jCeoNW hover:bg-gray-100" role="option" onClick={()=>autoCompleteOption(idx)}>
              <div data-qa="option-0-0-readable-element" className="ChoiceContent-sc-__sc-1r651ck-0 njCeoNW">
                <span className="A11yVisuallyHidden-sc-__sc-nyquty-0 ">{option}</span>
              </div>
            </li>))}
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




export default App
