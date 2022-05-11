import { useEffect, useState } from "react";
import axios from "axios";

const GenerateWords = ({ userSubmit }) => {
  const [wordCollection, setWordCollection] = useState([]);

  useEffect(() => {
    axios({
      url: "https://api.datamuse.com/words",
      method: "GET",
      dataResponse: "JSON",
      params: {
        rel_jja: userSubmit,
        max: 50,
      },
    })
      .then((response) => {
        setWordCollection(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userSubmit]);

  return (
    <div>
      {wordCollection.map((wordCollection, index) => {
        return <div key={index}>{wordCollection.word}</div>;
      })}
    </div>
  );
};

export default GenerateWords;
