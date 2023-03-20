import React from "react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Alert from "../components/Alert";

const SignIn = () => {
  const router = useRouter();
  const [fields, setFields] = useState({ number: 0, password: "" });
  const [submitted, setSubmit] = useState(false);
  const [state, setState] = useState({
    message: "",
    type: "error",
    active: false,
  });

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

    const response = await signIn("credentials", {
      redirect: false,
      mobile: fields.number,
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
      <Alert status={state} isActive={state.active} />

      <div className="text-center mt-20 mb-16">
        <h2 className="text-4xl mb-3">Login</h2>
        <p className="text-gray-600">Welcome back, let get you started</p>
      </div>

      <div className="mx-auto my-10 min-h-[200px] rounded max-w-[400px]">
        <form onSubmit={submitForm} className="block p-2 relative w-100">
          <fieldset className="form-group relative block w-100 mb-5">
            <label htmlFor="name" className="text-sm">
              Whatsapp Number
            </label>

            <input
              autoComplete={"off"}
              onInput={(e) =>
                setFields({
                  ...fields,
                  number: insertNumber(e.target.value.trimStart()),
                })
              }
              value={fields.number}
              required
              type="tel"
              id="tel"
              name="tel"
              maxLength={11}
              placeholder="Whatsapp number"
              className="form-control mt-2 block border bg-transparent outline-0 border-gray-500 h-[40px] rounded px-3 w-full"
            />
            {submitted && watchField("number")}
          </fieldset>

          <fieldset className="form-group relative block w-100 mb-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>

            <input
              type="password"
              onInput={(e) =>
                setFields({ ...fields, password: e.target.value.trimStart() })
              }
              value={fields.password}
              required
              autoComplete={"off"}
              id="password"
              className="form-control mt-2 block border bg-transparent outline-0 border-gray-500 h-[40px] rounded px-3 w-full"
            />
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
