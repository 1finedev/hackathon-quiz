import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const Onboarding = () => {
  const [screen, setScreen] = useState(0);
  const [checked, setChecked] = useState(false);

  const screenDisplay = () => {
    if (screen === 0) {
      return <FirstStep />;
    } else if (screen === 1) {
      return <SecondStep />;
    }
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <section className="">
      <div className="py-8">
        {screenDisplay()}
        {screen === 0 ? (
          <div className="w-[90%] mx-auto flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={checked}
              value="terms"
              className=""
              onChange={handleCheck}
            />
            <label htmlFor="" className="">
              I have read the instructions
            </label>
          </div>
        ) : null}
        <div className="w-[90%] mx-auto flex justify-center mt-7 gap-5">
          <Link
            className="bg-[#F9A826]  text-white font-semibold py-2 px-6 rounded-md"
            href="/quiz"
          >
            Proceed
          </Link>
          <Button
            disabled={!checked}
            onClick={() => {
              setScreen((prev) => prev + 1);
            }}
            label="Start"
            classes="bg-[#F9A826] text-white font-semibold py-2 px-6 rounded-md disabled:bg-gray-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
