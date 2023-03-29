import jsLogo from "../public/js.svg";
import reactLogo from "../public/react.svg";
import Card from "../components/Layout/Card";
import Link from "next/link";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

const data = [
  {
    icon: jsLogo,
    type: "JavaScript",
    text: "This section will test your knowledge and skills on vanilla Javascript",
  },
  {
    icon: reactLogo,
    type: "React",
    text: "This section will test your knowledge and skills on ReactJs",
  },
];

function ChooseTest() {
  const router = useRouter();
  const [quizType, setQuizType] = useState("JavaScript");

  const handleProceed = () => {
    axios
      .post("/api/quiz/start", { category: quizType })
      .then((res) => {
        router.push(`quiz/${res.data.quiz._id}`);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.success("Quiz Resumed!");
          router.push(`quiz/${err?.response?.data?.quiz?._id}`);
        } else {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <section>
      <p className="md:text-center text-lg text-secondary-darkGray max-w-[320px] md:max-w-[750px]">
        You must take these tests in order to be qualify for the hackathon!
        Choose a test below to get started
      </p>
      <section className="flex flex-col justify-between gap-7 md:flex-row">
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
      <div className="flex items-center justify-between mt-5 gap-9">
        <Link
          href="/"
          className="max-w-[320px] text-center w-full border border-secondary-mid rounded-md py-3 bg-[url('../public/back.svg')] bg-no-repeat bg-[center_left_20%]"
        >
          Back
        </Link>
        <Button
          onClick={handleProceed}
          classes="max-w-[320px] w-full text-center text-center bg-secondary-mid rounded-md py-3 "
          label="Start Quiz"
        />
      </div>
    </section>
  );
}

export default ChooseTest;
ChooseTest.auth = true;
