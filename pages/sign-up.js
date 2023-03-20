import { setConfig } from "next/config";
import { useState, useEffect, useMemo, useRef } from "react";
import countryCode from "../components/countryCod.json";
import { validator } from "../functions/helpers";

function SignUp() {
  const [selectedCode, setSelectedCode] = useState("");
  const [showCodes, setShowCodes] = useState(false);
  const codes = useMemo(() => countryCode.countries, []);
   const codeInputs = useRef();
   const countrycode = useRef()
   const confirmPassword = useRef();
   const name = useRef();
   const phoneNumber = useRef();
   const password  = useRef();
  
   const resetError = () => {
    password.current.classList.remove('error');
    phoneNumber.current.classList.remove('error');
    name.current.classList.remove('error');
    confirmPassword.current.classList.remove('error');
    
   }
   const submitHandler = (e) => {
    e.preventDefault();
    if(password.current.value !== confirmPassword.current.value){
      confirmPassword.current.focus();
      confirmPassword.current.classList.add('error')
      
    }
    const valiObj = {
      name:{
        element: name.current,
        value: name.current.value,
        pattern: /^@[\w]/
      },
      phoneNumber:{
        element: phoneNumber.current,
        value: phoneNumber.current,
        max: 11
      },
      password: {
        element:password.current,
        value: password.current.value
      },
      coutryCode:{
        element:countrycode.current,
        value: selectedCode,
      }
     }
    let valid = validator(valiObj);
    if(!valid) return;
    e.target.reset();
    setSelectedCode('')
   }
  return (
    <section>
      <div className="text-center space-y-2">
        <h1>Get Started</h1>
        <p>
          Sign up to get screened for the quiz to participate in the hackathon
          4.0
        </p>
      </div>
      <form className="mt-4" onSubmit={submitHandler} onChange={resetError}>
        <div>
          <label>WhatsApp Name</label>
          <input type="text" placeholder="@whatsappname" required ref={name}  />
        </div>
        <div>
        <label htmlFor="name" className="text-sm">
              Whatsapp Number
            </label>
            <div className="flex flex-row cursor-pointer mt-2  border bg-transparent outline-0 relative border-gray-500 py-1 max-w-full items-center rounded pl-3 gap-2" tabIndex={2} ref={phoneNumber}>
              <div
                className="flex items-center focus:border focus:border-black focus:border-solid  w-fit"
                onClick={() => {
                  setShowCodes((prev) => !prev);
                  codeInputs.current.focus();
                }}  
                ref={countrycode}
                onFocus={(() => {
                  setShowCodes(true)
                })}

              >
                <span
                  className={`${
                    !selectedCode && "opacity-70"
                  } text-sm md:text-lg whitespace-nowrap max-w-full`}
                >
                  {selectedCode || "+234"}
                </span>
              </div>
              <ul
                className={`bg-[#1e1e1e]  px-3 cursor-pointer flex flex-col gap-3 w-fit max-h-32 overflow-y-scroll absolute left-2 z-50 top-full outline-0 ${
                  showCodes ? "h-auto  py-3 " : "h-0"
                } transition-all duration-300 ease-out`}
                onBlur={() => {
                  setShowCodes(false);
                }}
                ref={codeInputs}
                tabIndex={4}
              >
                {codes.map((cod) => (
                  <li
                    key={cod.name}
                    value={cod.code}
                    onClick={() => {
                      setSelectedCode(cod.code);
                      countrycode.current.classList.remove('error');
                      setShowCodes(false);
                    }}
                  >
                    {cod.name} {cod.code}
                  </li>
                ))}
              </ul>
              <input
                autoComplete={"off"}
                required
                type="tel"
                id="tel"
                name="tel"
                maxLength={11}
                placeholder="Whatsapp number"
                className="form-control bg-transparent flex-auto w-auto focus-within:outline-none focus-within:cursor-text border-none px-0"
              />
            </div>  
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter password" required ref={password} />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" placeholder="Password again" required ref={confirmPassword}  />
        </div>
        <button className="mt-6">Register</button>
      </form>
    </section>
  );
}

export default SignUp;
