import React from "react";

const Success = () => {
  return (
    <section className="flex flex-col max-w-md bg-slate-900 rounded-lg  justify-center py-10 px-4 text-white font-bold m-5 shadow-md  items-center gap-4 mx-auto">
      <h1 className="text-green-600 ">You got 6/10 question</h1>
      <p>Thank you for participating</p>
      <button className="bg-blue-600 shadow shadow-blue-400 px-4 py-2 rounded-lg w-fit ">
        Continue to home page
      </button>
      <button className="text-blue-600">Restart quiz</button>
    </section>
  );
};

export default Success;
