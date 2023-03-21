import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { quizId } = context.query;
  if (!quizId) {
    return {
      redirect: {
        destination: "/choose-test",
        permanent: false,
      },
    };
  }
  return {
    props: {
      quizId,
    },
  };
}

const Quiz = ({ quizId }) => {
  const router = useRouter();
  const [question, setQuestions] = useState();
  const [answer, setAnswer] = useState();

  console.log(question);

  const fetchQuestion = useCallback(async () => {
    axios
      .post("/api/questions/getOne", { quizId })
      .then((response) =>
        setQuestions({
          ...response.data.question,
          count: response.data.totalAttempted,
        })
      )
      .catch((err) => {
        toast.error(err.response.data.error);
        router.push("/choose-test");
      });
  }, [quizId, router]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return (
    <div className="w-screen h-screen xl:flex bg-[101010] px-6 xl:px-0">
      <div className="bg-[#101010] flex items-center justify-center basis-1/2 lg:basis-[55%] pt-14 pb-11">
        <div className="w-full max-w-[664px] space-y-14">
          <div className="text-xl lg:text-3xl flex items-center justify-between w-full">
            <h1>Question {question?.count + 1 || 1}/20</h1>
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 rounded-full"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.92822 19.0677C4.92822 16.3795 5.60027 13.889 6.93119 11.6093C8.2621 9.32962 10.0674 7.52431 12.3471 6.1934C14.6268 4.86248 17.1041 4.20361 19.7791 4.20361C21.7821 4.20361 23.706 4.59893 25.5377 5.3764C27.3693 6.15387 28.9374 7.22123 30.2683 8.53897C31.5993 9.85671 32.6535 11.438 33.4309 13.2828C34.2084 15.1277 34.6037 17.0384 34.6037 19.0677C34.6037 21.0707 34.2084 22.9946 33.4309 24.8262C32.6535 26.6579 31.5861 28.2392 30.2683 29.5569C28.9506 30.8746 27.3693 31.9288 25.5377 32.7063C23.706 33.4838 21.7953 33.8791 19.7791 33.8791C17.763 33.8791 15.8259 33.4838 13.9943 32.7063C12.1626 31.9288 10.5813 30.8615 9.25041 29.5437C7.91949 28.226 6.87848 26.6447 6.08783 24.8262C5.29719 23.0077 4.92822 21.0838 4.92822 19.0677ZM8.19622 19.0677C8.19622 22.1907 9.32947 24.9053 11.6092 27.2113C13.8888 29.491 16.6034 30.6243 19.7791 30.6243C21.8612 30.6243 23.7982 30.1103 25.564 29.0693C27.3298 28.0283 28.7529 26.6315 29.794 24.8526C30.835 23.0736 31.3621 21.1497 31.3621 19.0677C31.3621 16.9857 30.835 15.0486 29.794 13.2697C28.7529 11.4907 27.343 10.0807 25.564 9.03971C23.7851 7.9987 21.8612 7.48478 19.7791 7.48478C17.6971 7.48478 15.76 7.9987 13.9943 9.03971C12.2285 10.0807 10.8053 11.4907 9.75115 13.2697C8.69696 15.0486 8.19622 16.9857 8.19622 19.0677ZM12.5316 19.0545C12.5316 18.7514 12.637 18.4879 12.8478 18.2771C13.0587 18.0662 13.3222 17.9608 13.6253 17.9608H18.6195V10.2916C18.6195 9.98848 18.725 9.72494 18.9358 9.5141C19.1466 9.30326 19.4102 9.19784 19.7133 9.19784C20.0163 9.19784 20.2799 9.30326 20.4907 9.5141C20.7016 9.72494 20.807 9.98848 20.807 10.2916V19.0809C20.807 19.384 20.7016 19.6475 20.4907 19.8583C20.2799 20.0692 20.0163 20.1746 19.7133 20.1746C19.5815 20.1746 19.5024 20.1746 19.4629 20.1614H13.6121C13.309 20.1614 13.0455 20.056 12.8347 19.832C12.637 19.608 12.5316 19.3444 12.5316 19.0545Z"
                  fill="white"
                />
              </svg>
              <h1>00:30</h1>
            </div>
          </div>

          <div className="bg-[#1E2D3D] border border-[#1E2D3D] w-full rounded-lg overflow-hidden p-6">
            <div className="w-full h-full">
              <p className="text-center text-lg md:text-xl">
                {question?.question}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:bg-[#06BA6B] flex items-center justify-center basis-1/2 lg:basis-[45%] py-10 border-t-2 border-double border-[#06BA6B] xl:border-none">
        <div className="w-full xl:w-4/5 md:w-fit space-y-6 lg:space-y-16">
          <h1 className="text-xl lg:text-3xl">Select your answer</h1>

          <form className="relative">
            {question?.options?.map((option) => (
              <div
                className="flex flex-row items-center space-x-5 py-4"
                key={option}
              >
                <input
                  type="radio"
                  value={option}
                  checked={answer === option ? true : false}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <p className="text-md md:xl">{option}</p>
              </div>
            ))}
            <button className="w-full h-[60px] max-w-[365px] rounded-lg bg-white text-xl text-[#011221] font-bold mt-10">
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
Quiz.auth = true;
