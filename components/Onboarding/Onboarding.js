import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

const FirstStep = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className=" md:grid md:grid-cols-10 lg:gap-36">
        {/* Left Column */}
        <div className="flex flex-col md:grid items-center md:items-start md:col-span-4 py-40 px-10 md:pr-0 md:pl-20">
          <div className=" text-center md:text-left">
            <h1 className="text-[1.3rem] font-semibold ">Hackathon 4.0 🔥</h1>
            <p className="font-medium text-[#06BA6B] text-3xl mt-5">
              Welcome to the assessment for the hackathon of a lifetime.
            </p>
            <p className="font-normal text-sm mt-5">
              It&apos;s great that you got this far, your sweat will turn to
              blood, your eyes will see shege but the good thing is that, you
              won&apos;t die.
            </p>
          </div>
          <div className="mt-10 px-7 py-3 border-yellow-600 border-2 bg-yellow-400 bg-opacity-20 text-yellow-400 rounded-md flex flex-row w-64 gap-4">
            <Image src="/warning.svg" alt="warning" width={25} height={25} />

            <h1 className="text-xs  ">
              Before you proceed, read the instructions carefully.
            </h1>
          </div>
          <div className=" flex items-center md:items-start gap-2 mt-10">
            <input
              type="checkbox"
              checked={checked}
              value="terms"
              className="rounded-sm"
              onChange={handleCheck}
            />
            <label htmlFor="" className="">
              I have read the
              <a href="#" className="text-[#06BA6B] px-1">
                instructions
              </a>
            </label>
          </div>
          <Link href={"/sign-in"}>
            <Button
              disabled={!checked}
              label="Get Started"
              classes="mt-14 w-64 text-sm bg-[#06BA6B] text-white font-medium py-2 px-6 rounded-md disabled:bg-gray-500"
            />
          </Link>
        </div>

        <div className="col-span-1 hidden md:flex"></div>

        {/* Right Column */}
        <div
          className="col-span-5 mt-28 h-[80%] md:relative text-white hidden md:flex"
          style={{
            backgroundImage: "url(/homeside.jpg)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="md:absolute rounded-full h-28 w-28 -left-10 bottom-[40%] bg-[#06BA6B] justify-center items-center p-3 "
            style={{
              filter: "drop-shadow(5px 7px 15px rgba(255, 202, 40, 0.33))",
            }}
          >
            <Image
              src={"/5.png"}
              width={80}
              height={80}
              alt="memoji"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
