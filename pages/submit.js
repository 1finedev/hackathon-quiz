import { useState } from "react";

const criteria = [
  "UX",
  "UI",
  "responsiveness",
  "functionality",
  "technology",
  "rules",
  "extraCredit",
  "teamwork",
  "codeQuality",
  "presentation",
];

const SubmitHackaton = () => {
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const submitForm = () => {};

  return (
    <section className="flex flex-col items-center justify-center w-full gap-10 pt-96 lg:pt-0 lg:flex-row">
      <div className="w-[500px] max-w-full px-4">
        <div className="mb-10 tracking-widest text-center">
          <h1 className="mb-5 text-xl font-semibold sm:text-2xl">
            Hackathon 4.0 🔥
          </h1>
          <h2 className="text-base sm:text-xl">Welcome great minds</h2>
          <h2>Kindly submit your project below</h2>
        </div>

        <form
          onSubmit={submitForm}
          className="flex flex-col w-full gap-5"
          autoComplete="off"
        >
          <fieldset className="relative flex flex-col min-w-0 gap-3 ">
            <input
              type="text"
              placeholder="Enter your github link"
              required
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              id="githubLink"
              className="px-5 py-2 bg-transparent border rounded-md border-secondary-darkGray"
            />
          </fieldset>
          <fieldset className="relative flex flex-col min-w-0 gap-3 ">
            <input
              type="text"
              placeholder="Enter your live link"
              required
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              id="liveLink"
              className="px-5 py-2 bg-transparent border rounded-md border-secondary-darkGray"
            />
          </fieldset>
          <button className="py-2 mt-4 rounded-md bg-secondary-mid">
            Submit
          </button>
        </form>
      </div>
      <div className="h-full w-[500px] p-5 max-w-full px-4">
        <p>Note: You will be judged base on the following criteria</p>
        <ul className="flex flex-col gap-1 px-5 mt-4 capitalize list-disc">
          {criteria.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
        <p className="mt-4">Best of luck 🚀🚀🚀</p>
      </div>
    </section>
  );
};

export default SubmitHackaton;

// SubmitHackaton.auth = true;
