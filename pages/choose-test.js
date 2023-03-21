import jsLogo from "../public/js.svg";
import reactLogo from "../public/react.svg";
import Card from "../components/Layout/Card";
import Link from "next/link";
import Button from "../components/Button";
import { useState } from "react";

const data = [
  {
    icon: jsLogo,
    type: "Javascript",
    text: " This section will test your knowledge and skills on vanilla javscript",
  },
  {
    icon: reactLogo,
    type: "React",
    text: " This section will test your knowledge and skills on React",
  },
];

function ChooseTest() {
  const [quizType, setQuizType] = useState("Javascript");

  return (
    <section className="flex flex-col bg  gap-5 p-5 max-w-[700px]">
      <h1 className="text-4xl md:text-center font-bold">Pick a Test</h1>
      <p className="md:text-center text-lg text-secondary-darkGray max-w-[320px] md:max-w-[750px]">
        In this following sections, we will test your knowledge on certain web
        technologies, please select the Language you would like to pick first.
      </p>
      <section className="flex flex-col gap-7 justify-between  md:flex-row">
        {data.map((eachType) => (
          <Card
            classes={
              quizType === eachType.type
                ? "flex flex-col justify-between py-3 gap-16 max-w-[320px] px-5 bg-secondary-mid rounded-lg"
                : " flex flex-col justify-between border border-secondary-mid rounded-lg py-3 gap-16 max-w-[320px] px-5"
            }
            type={eachType.type}
            image={eachType.icon}
            key={eachType.type}
            text={eachType.text}
            onClick={() => setQuizType(eachType.type)}
            selected={quizType === eachType.type}
          />
        ))}
      </section>
      <div className="flex mt-5 justify-between gap-9 items-center">
        <Link
          href=""
          className="max-w-[320px] text-center w-full border border-secondary-mid rounded-md py-3 bg-[url('../public/back.svg')] bg-no-repeat bg-[center_left_20%]"
        >
          Back
        </Link>
        <Button
          classes="max-w-[320px] w-full text-center text-center bg-secondary-mid rounded-md py-3 "
          label="Start Quiz"
        ></Button>
      </div>
    </section>
  );
}

export default ChooseTest;
