import { useEffect , useState, useRef  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import FaqsModified from "./FaqsModified";
import { apiCall,putApiFaqs } from "../../store/reducers/faqsCall/faqsReducer";

import deleteFaqIcon from '../../images/icon-delete-faq-backoffice.png';
import DeleteFaqModal from "./Modals/DeleteFaqModal";


const FAQs = () => {
  //Interfaces//
  interface Faq {
    title: string;
    description: string;
    id:number;
  }

  interface createToken {
    acces_token: String;  
  }

  interface createFaqs {
    faqs: any;  
  }
  //Dispatch//
  const dispatch = useDispatch();

  //Getters para los datos desde redux//
  
  const { acces_token }: createToken = useSelector(
    (state: RootState) => state.apiPostRegister
  );

  
  const { faqs }: createFaqs = useSelector(
    (state: RootState) => state.faqsReducer
  );

 //llamada api//

  useEffect(()=>{
    apiCall(dispatch)
  },[])


  const [faqsClone, setFaqClone] = useState(faqs) // Clone Faqs

  const [deleteModal, setDeleteModal] = useState(false) // DeleteModal

  const [titleButtons, setTitleButtons] = useState(true); // Editar & Eliminar buttons
  const [descriptionButtons, setDescriptionButtons] = useState(false); // Cancelar & Guardar buttons

  const [isContentEditing, setIsContentIsEditing] = useState(false); // Title & Description editable

  const [inputNewTitleValue, setInputNewTitleValue] = useState('');
  const [inputNewDescriptionValue, setInputNewDescriptionValue] = useState('');

  const [positionId, setPositionId] = useState('')


  const displayInput = (index:number, faq:any) => {

    setTitleButtons(false)

    const checkbox = document.getElementById(index.toString()) as HTMLInputElement;
    if (checkbox && !checkbox.checked) {
      checkbox.checked = true;
    }

    setPositionId(index.toString())
    setDescriptionButtons(true)

    setInputNewTitleValue(faq.title)
    setInputNewDescriptionValue(faq.description)

    setIsContentIsEditing(true)
  }


  const cancelEditing = (index: number, faq: any) => {
    
    setTitleButtons(true)
    setDescriptionButtons(false)

    setIsContentIsEditing(false)
    
    setInputNewTitleValue(faq.title)
    setInputNewDescriptionValue(faq.description)

    const checkbox = document.getElementById(index.toString()) as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
    
  }

  const saveEditingFaq = (index: number) => {

    const updatedFaqs = [ ...faqsClone ];
    const updatedFaq = { ...updatedFaqs[index] };

    updatedFaq.title = inputNewTitleValue
    updatedFaq.description = inputNewDescriptionValue

    updatedFaqs[index] = updatedFaq;

    setFaqClone(updatedFaqs)

    setTitleButtons(true)
    setDescriptionButtons(false)
    setIsContentIsEditing(false)

    // Y AHORA HACER LA LLAMADA A API
    // putApiFaqs(faqsClone[index].id, updatedFaqs, acces_token, dispatch) // NOT WORK! -> pero valores correctos
  }

  return (

    <div className="w-3/4 m-auto ">
      <div className="grid grid-cols-6 grid-rows-2">
        <h2 className="font-black text-2xl font-poppins  text-center col-span-6"> Preguntas frecuentes </h2>
      </div>

      { window.location.pathname =='/backoffice'&&( <FaqsModified/> ) }

      {faqsClone.map((faq:Faq, index:number) => (
        <div className={`collapse rounded-md ${ 'mb-5'  // Agrega mb-5 si no es el último elemento
          } shadow-xl`} key={index}>

          <input type="checkbox" className="peer" id={index.toString()}/>
          <div className="collapse-title relative flex rounded-b-md bg-white text-left text-black text-4 font-poppins font-bold text-4 font-poppins peer-checked:bg-[#BA007C] peer-checked:rounded-b-[0px] peer-checked:text-secondary-content">

            {isContentEditing && index.toString() === positionId ? (<input type="text" className="z-10 text-black input input-bordered w-full max-w-xs" placeholder={faqsClone[index].title} value={inputNewTitleValue} onChange={(e) => setInputNewTitleValue(e.target.value)}/>) : (faqsClone[index].title)}
            
            {titleButtons &&
              <div className="flex relative z-10 ml-auto">
                <button className="mx-4 px-4 border-gray-500 h-[30px]" onClick={() => displayInput(index, faqsClone[index])}>Editar</button>
                <img src={deleteFaqIcon} className='h-[30px] cursor-pointer self-center' onClick={() => {setDeleteModal(true)}} alt="locker" />
                {deleteModal && <DeleteFaqModal deleteModal={setDeleteModal} faqId={faq.id} acces_token={acces_token} dispatch={dispatch} />}
              </div>
            }

          </div>

          <div className="collapse-content rounded-b-md bg-white">
            <p className="text-left text-black  text-4 font-poppins font-medium ml-9 mr-24 mt-9 mb-6">
              {isContentEditing && index.toString() === positionId ? (<input type="text" className="z-10 text-black input input-bordered w-full" placeholder={faqsClone[index].description} value={inputNewDescriptionValue} onChange={(e) => setInputNewDescriptionValue(e.target.value)}/>) : (faqsClone[index].description)}
            </p>
        
            {window.location.pathname == '/backoffice' && (
              <div className="flex justify-end mr-20 pb-7">
                
                {descriptionButtons && index.toString() === positionId &&
                  <div>
                    <button className="mr-5 xl:px-7 btn btn-outline-primary border-gray-600 bg-transparent text-gray-600" onClick={() => cancelEditing(index, faqsClone[index])}>Cancelar</button>
                    <button className="btn xl:px-9  bg-pink-it text-white" onClick={() => saveEditingFaq(index)}>Guardar</button>
                  </div>
                }

              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default FAQs;