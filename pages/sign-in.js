import React from "react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const [fields, setFields] = useState({ name: "", password: "" });
  const [submitted, setSubmit] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (fields.name === "" && fields.password === "") return null;

    const response = await signIn("credentials", {
      redirect: false,
      mobile: fields.mobile,
      password: fields.password,
    });

    console.log(response);

    setSubmit(false);
  };
  const watchField = (e) => {
    return fields[e] === "" ? (
      <p className="text-red-400 text-sm mt-2">
        Sorry but your {e} is required
      </p>
    ) : (
      ""
    );
  };

  useEffect(() => {
    if (submitted) {
      watchField("name");
      watchField("password");
    }
  }, [fields]);

  return (
    <div className="relative p-3">
      <div className="text-center mt-20 mb-16">
        <h2 className="text-4xl mb-3">Login</h2>
        <p className="text-gray-600">Welcome back, let's get you started</p>
      </div>

      <div className="mx-auto my-10 min-h-[200px] rounded max-w-[400px]">
        <form onSubmit={submitForm} className="block p-2 relative w-100">
          <fieldset className="form-group relative block w-100 mb-5">
            <label htmlFor="name" className="text-sm">
              Whatsapp Name
            </label>

            <input
              autoComplete="off"
              onInput={(e) => setFields({ ...fields, name: e.target.value })}
              value={fields.name.trimStart()}
              required
              type="text"
              id="name"
              placeholder="Whatsapp name"
              className="form-control mt-2 block border bg-transparent outline-0 border-gray-500 h-[40px] rounded px-3 w-full"
            />
            {submitted && watchField("name")}
          </fieldset>

          <fieldset className="form-group relative block w-100 mb-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>

            <input
              type="password"
              onInput={(e) =>
                setFields({ ...fields, password: e.target.value })
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
