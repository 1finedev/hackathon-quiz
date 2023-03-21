import { useEffect } from "react";
import Questions from "../questions.json";
import axios from "axios";

const Create = () => {
  const postAllQuestions = () => {
    Questions.forEach(async (question) => {
      const response = await axios.post("/api/questions/create", question);
      console.log(response.data.message);
    });
  };

  //   postAllQuestions();
  return <div>Create</div>;
};

export default Create;
