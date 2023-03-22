import getSession from "../backend/getSession";
import React, { useMemo, useRef } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import countryCode from "../components/countryCod.json";
import { toast } from "react-toastify";
import hidePass from "../public/hide-password.svg";
import showPass from "../public/show-password.svg";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res);
  if (session) {
    return {
      redirect: {
        destination: "/choose-test",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

const SignIn = () => {
  const router = useRouter();
  const [values, setValues] = useState({ mobile: "", password: "" });
  const [selectedCode, setSelectedCode] = useState("+234");
  const [showCodes, setShowCodes] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const codeInputs = useRef();
  const codes = useMemo(() => countryCode.countries, []);

  const submitForm = async (e) => {
    e.preventDefault();

    // basic input validation

    if (!values.mobile > 10) {
      toast.error("Invalid phone number!");
      return;
    }
    const response = await signIn("credentials", {
      redirect: false,
      mobile: `${selectedCode}${
        values.mobile.startsWith("0")
          ? values.mobile.toString().replace("0", "")
          : values.mobile
      }`,
      password: values.password,
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Login successful");
      router.push("/choose-test");
    }
  };

  return (
    <div className="  flex flex-col justify-center w-[90%] max-w-[350px] items-center gap-5">
      <div
        onClick={() => router.back()}
        className="fixed top-[5vh] left-[5vh] flex items-center"
      >
        <button>
          <span className="text-2xl text-white">
            <BsArrowLeft />
          </span>
        </button>
        <span className="ml-2">Go back</span>
      </div>
      <h2 className="mb-3 text-4xl ">Login</h2>
      <p className="">Welcome back, let&apos;s get you started</p>

      <form
        onSubmit={submitForm}
        className="flex flex-col w-full gap-5 p-5 "
        autoComplete="off"
      >
        <fieldset className="flex flex-col min-w-0 gap-3 ">
          <label htmlFor="name" className="text-sm">
            Registered Number
          </label>
          <div className="relative flex max-w-full gap-2 py-1 pl-3 mt-2 bg-transparent border rounded-md cursor-pointer outline-0 border-secondary-darkGray">
            <div
              className="flex items-center my-2 focus:border focus:border-black focus:border-solid w-fit"
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
                setValues((prev) => ({
                  ...prev,
                  mobile: e.target.value.trimStart(),
                }))
              }
              value={values.mobile}
              required
              type="tel"
              id="tel"
              name="tel"
              maxLength={11}
              placeholder="Whatsapp number"
              className="flex-auto w-auto min-w-0 bg-transparent focus-within:outline-none focus-within:cursor-text placeholder:text-ellipsis"
            />
          </div>
        </fieldset>

        <fieldset className="relative flex flex-col min-w-0 gap-3 ">
          <label htmlFor="password" className="text-sm">
            Password
          </label>

          <input
            type={`${showPassword ? "text" : "password"}`}
            onInput={(e) =>
              setValues((prev) => ({
                ...prev,
                password: e.target.value.trimStart(),
              }))
            }
            placeholder="Password"
            value={values.password}
            required
            autoComplete={"off"}
            id="password"
            className="px-5 py-2 bg-transparent border rounded-md border-secondary-darkGray focus-within:outline-none focus-within:cursor-text"
          />
          <div
            className="absolute top-[42px] right-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {!showPassword ? (
              <Image src={hidePass} alt="" width={20} height={20} />
            ) : (
              <Image src={showPass} alt="" width={20} height={20} />
            )}
          </div>
        </fieldset>
        <button className="py-2 mt-4 rounded-md bg-secondary-mid">Login</button>
      </form>
      <p>
        Don&apos;t have an account yet?{" "}
        <Link href="/sign-up" className="text-secondary-mid">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
