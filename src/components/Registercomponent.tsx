import cross from "../assets/img/cross.png";
import { useNavigate } from "react-router-dom";
import {
  handleSubmit,
  eraseMessageError,
} from "../store/reducers/apiCall/apiPostRegisterLogin";
import { useDispatch, useSelector,  } from "react-redux";
import {
  ChildComponentProps,
  RootState,
  ApiPostRegisterState,
} from "../interfaces/interfaces";

//componente//

export default function RegisterComponent({ 
  setIsDropdownEnterButton,
  setisDropdownCuenta,
}: ChildComponentProps) {
  const dispatch = useDispatch();
  const { messageError, isLoadingMessageError }: ApiPostRegisterState =
    useSelector((state: RootState) => state.apiPostRegister);
  const submitInformation = (e: any): void => {
    handleSubmit(dispatch, e, 1, Navegador);
  };
  const Navegador = useNavigate();
  return (
    <>
      <div>
        <div
          className={`absolute z-50 right-0 top-full mt-6 w-80 rounded-xl bg-white border-2 `}
        >
          <div className="p-3 flex ">
            <img
              onClick={() => setisDropdownCuenta(false)}
              src={cross}
              className="cursor-pointer w-3 ml-auto"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-evenly h-[500px] px-5 py-0 ">
            <h1 className="text-start">Registro</h1>

            <form onSubmit={submitInformation}>
              <input
                name="dni"
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder="DNI o NIE"
              />
              <input
                name="email"
                type="email"
                className="mt-2 input input-bordered w-full max-w-xs"
                placeholder="Email"
              />
              <input
                name="password"
                type="password"
                className="mt-2 input input-bordered w-full max-w-xs"
                placeholder="Contraseña"
              />
              <input
                name="password_confirmation"
                type="password"
                className="mt-2 input input-bordered w-full max-w-xs"
                placeholder="Repite Contraseña"
              />
              <input
                name="name"
                type="text"
                className="mt-2 input input-bordered w-full max-w-xs"
                placeholder="Nombre"
              />
              <input
                name="Code"
                type="text"
                className="mt-2 input input-bordered w-full max-w-xs"
                placeholder="Codigo de confirmación"
              />
              <button
                type="submit"
                className="mt-5 btn btn-wide bg-pink-it text-white"
              >
                Registro
              </button>
            </form>

            {/* Icono de carga */}
            {!isLoadingMessageError ? (
              <p>{messageError}</p>
            ) : (
              <div className="flex justify-center">
                <span className=" loading loading-spinner loading-lg "></span>
              </div>
            )}
            <a className="text-xs mt-5">
              <span
                onClick={() => {
                  dispatch(eraseMessageError());
                  setIsDropdownEnterButton(true);
                  setisDropdownCuenta(false);
                }}
                className="border-b-2 border-black"
              >
                ¿Tienes cuenta? acceder
              </span>
            </a>
          </div>
        </div>
        <div
          onClick={() => {
            setisDropdownCuenta(false);
            dispatch(eraseMessageError());
          }}
          className="opacity-25 fixed inset-0 z-40 bg-black"
        ></div>
      </div>
    </>
  );
}
