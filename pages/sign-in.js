import React, { useMemo, useRef } from "react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Alert from "../components/Alert";
import countryCode from "../components/countryCod.json";

const SignIn = () => {
  const router = useRouter();
  const [fields, setFields] = useState({ number: 0, password: "" });
  const [submitted, setSubmit] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [showCodes, setShowCodes] = useState(false);
  const[showPassword, setShowPassword] = useState(false)
  const codeInputs = useRef();
  const [state, setState] = useState({
    message: "",
    type: "error",
    active: false,
  });
  const codes = useMemo(() => countryCode.countries, []);
  const removeError = () => {
    setTimeout(() => {
      setState({ ...state, active: false });
    }, 3000);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (fields.password === "" || fields.number.toString().length < 11) {
      setSubmit(true);
      return null;
    }
    if (!selectedCode) {
      setShowCodes(true);
      setSubmit(true);
      return null;
    }
    let number = fields.number.toString();
    if (number[0] === "0") {
      number = number.slice(1);
    }

    const response = await signIn("credentials", {
      redirect: false,
      mobile: `${selectedCode}${number}`,
      password: fields.password,
    });
    if (!response.ok) {
      setState({ ...state, message: response.error, active: true });
      removeError();
      return;
    }

    setState({ type: "success", message: response.success, active: true });
    await router.push("/dashboard");
    setSubmit(false);
  };
  const watchField = (e) => {
    return e === "password" && fields[e] === "" ? (
      <p className="text-red-400 text-sm mt-2">
        Sorry but your {e} is required{" "}
      </p>
    ) : (
      e === "number" && fields[e].toString().length < 11 && (
        <p className="text-red-400 text-sm mt-2">
          Sorry but your {e} must be 11 digits
        </p>
      )
    );
  };
  const insertNumber = (arg) => {
    //Convert the values to number and limit the number the chars to 11, if pass, start all over
    return /^[0-9]{0,12}$/.test(arg) ? arg : 0;
  };
  useEffect(() => {
    if (submitted) {
      watchField("number");
      watchField("password");
      setTimeout(() => {
        setSubmit(false);
      }, 3000);
    }
  }, [fields, submitted]);

  return (
    <div className="relative p-3">
      {/* <Alert status={state} isActive={state.active} /> */}

      <div className="text-center mt-20 mb-16">
        <h2 className="text-4xl mb-3">Login</h2>
        <p className="text-gray-600">
          Welcome back, let&apos;s get you started
        </p>
      </div>

      <div className="mx-auto my-10 min-h-[200px] rounded max-w-[400px]">
        <form onSubmit={submitForm} className="flex flex-col gap-3 p-2 relative w-100" autoComplete="off">
        <input autoComplete="false" name="hidden" type="text" style={{display:'none'}}/>
          <fieldset className="form-group relative block w-full mb-5">
            <label htmlFor="name" className="text-sm">
              Whatsapp Number
            </label>
            <div className="flex cursor-pointer mt-2  border bg-transparent outline-0 relative border-gray-500 py-1 max-w-full rounded pl-3 gap-2">
              <div
                className="flex items-center focus:border focus:border-black focus:border-solid my-2 w-fit"
                onClick={() => {
                  setShowCodes((prev) => !prev);
                  codeInputs.current.focus();
                }}
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
                      setShowCodes(false);
                    }}
                  >
                    {cod.name} {cod.code}
                  </li>
                ))}
              </ul>
              <input
                autoComplete={"off"}
                onInput={(e) =>
                  setFields({
                    ...fields,
                    number: insertNumber(e.target.value.trimStart()),
                  })
                }
                value={fields.number || ""}
                required
                type="tel"
                id="tel"
                name="tel"
                maxLength={11}
                placeholder="Whatsapp number"
                className="form-control bg-transparent flex-auto w-auto focus-within:outline-none focus-within:cursor-text"
              />
            </div>
            {submitted && watchField("number")}
          </fieldset>

          <fieldset className="form-group relative block w-100 mb-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
             <div className=" flex border bg-transparent outline-0 border-gray-500 h-[40px] rounded pr-3 items-center justify-center w-full">

            <input
              type={`${showPassword ? 'text' : 'password'}`}
              onInput={(e) =>
                setFields({ ...fields, password: e.target.value.trimStart() })
              }
              value={fields.password}
              required
              autoComplete={"off"}
              id="password"
              className="form-control bg-transparent focus-within:outline-none focus-within:cursor-text"
              />
              <div className="text-2xl w-6" onClick={() => setShowPassword((prev) => !prev)}>
                {!showPassword ? <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
</svg>: <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
</svg>}
              </div>
              </div>
            {submitted && watchField("password")}
          </fieldset>

          <button className="btn btn-primary rounded block w-full mt-10">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
