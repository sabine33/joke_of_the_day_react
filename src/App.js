import { useEffect, useState } from "react";
import "./styles.css";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
    "X-RapidAPI-Key": "IOumhRbhYAmshSuNQBdpoL7NKQ1sp13CmTyjsnleXTdCIqPICH"
  }
};
const API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";

async function fetchRandomJokes() {
  try {
    var response = await fetch(API_URL, options);
    var json = await response.json();
    // console.log(json);
    if (json.body[0] && json.body[0].setup) {
      return json.body[0].setup;
    } else {
      var message = json.message;
      return message;
    }
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

function RenderJoke() {
  const [joke, setJoke] = useState(null);
  useEffect(() => {
    (async () => {
      const joke = await fetchRandomJokes();
      setJoke(joke);
    })();
  }, []);
  return (
    <div className="joke">
      {joke ? <h2>{joke}</h2> : <h2>{"No joke is available."}</h2>}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Joke of the day</h1>
      <RenderJoke />
    </div>
  );
}
