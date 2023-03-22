import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const Score = () => {
  const borderRef = useRef();

  const router = useRouter();
  const [score, setScore] = useState({
    percentage: 0,
    correct: 0,
    pass: false,
  });

  useEffect(() => {
    // update the percentage with router query value
    if (router?.query?.score) {
      setScore({
        correct: router.query.score,
        percentage: (router.query.score / 20) * 100,
        pass: router.query.score >= 10 ? true : false,
      });
    } else {
      // if no score is found redirect to home
      router.push("/choose-test");
    }
  }, [router]);
  useEffect(() => {
    let progressEnd = score.percentage;
    let progressStart = 0;
    const progress = setInterval(() => {
      progressStart++;
      if (progressStart >= progressEnd) {
        clearInterval(progress);
      }

      borderRef.current.style.background = `conic-gradient(${
        score.pass ? "rgba(6, 186, 107, 1)" : "rgba(255, 0, 0, 1)"
      }${progressStart * 3.6}deg, ${
        score.pass ? "rgba(6, 186, 107, 0.25)" : " rgba(255, 0, 0, 0.25)"
      } 0deg)`;
    }, 10);

    return () => {
      clearInterval(progress);
    };
  }, [score.pass, score.percentage]);
  console.log(score.pass);
  return (
    <section className="flex flex-col items-center gap-3">
      <div className="mx-auto stack w-min">
        <div
          className="transition-all duration-500 ease-in scale-110 rounded-full animate-load"
          style={{
            background: score.pass
              ? `conic-gradient(rgba(6, 186, 107, 1) 0deg, rgba(6, 186, 107, 0.25) 0deg)`
              : `conic-gradient(rgba(255, 0, 0, 1) 0deg, rgba(255, 0, 0, 0.25) 0deg)`,
          }}
          ref={borderRef}
        ></div>
        <div className="relative grid p-6 bg-black rounded-full aspect-square after:absolute after:inset-0 after:w-full after:rounded-full place-items-center w-fit">
          <h1
            className={`${
              !score.pass ? "text-red-500" : "text-[#06BA6B]"
            } font-semibold text-5xl lg:text-6xl`}
          >
            {score.percentage}%
          </h1>
        </div>
      </div>
      <p className="text-[#C9C9C9] font-normal text-lg mt-4">
        You scored {score.correct || 0} / 20
      </p>
      <p
        className={`${
          !score.pass ? "text-red-500" : "text-[#06BA6B]"
        } font-semibold text-2xl lg:text-3xl`}
      >
        {score.pass ? "Congratulations! 🎉" : "Better luck next time! 🙁"}
      </p>

      <p className="text-[#C9C9C9] font-normal text-lg mt-4 text-center mx-4">
        You will be informed if you are drafted into a hackathon team{" "}
      </p>
      <button
        onClick={() => router.push("/choose-test")}
        className="px-4 py-2 mt-4 rounded-md bg-secondary-mid"
      >
        Back to quiz
      </button>
    </section>
  );
};

export default Score;
Score.auth = true;
