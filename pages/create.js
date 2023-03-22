import { useEffect } from "react";
// import Questions from "../questions.json";
import axios from "axios";

const Create = () => {
  const postAllQuestions = () => {
    let timer = 0;
    Questions.forEach(async (question) => {
      setTimeout(async () => {
        const response = await axios.post("/api/questions/create", question);
        console.log(response.data.message);
      }, timer);
      timer += 1000;
    });
  };

  useEffect(() => {
    //   postAllQuestions();
  }, []);

  return <div>Create</div>;
};

export default Create;
