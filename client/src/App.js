import { useEffect, useState } from "react";
const axios = require("axios").default;

function App() {
  // States Hooks
  const [tweet, setTweet] = useState("");
  const [tomato, setTomato] = useState("");
  const [newTweet, setNewTweet] = useState("");
  const [flag, setFlag] = useState(false);

  // Global variables
  const endpoint = "api/translate";
  const domain = "localhost:5000";
  let timeout = null;

  //Generates delay between 0.5 - 2.5s
  const delay = () => {
    return parseFloat((Math.random() * 2000 + 500).toFixed(2));
  };

  // Sets the 'tweet' state for the output from the input
  // Delay used here, clear timeout triggered on change so request is only sent after user stops typing
  const handleChange = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value === "" || e.target.value === null) {
        setTweet("");
        setTomato("");
        setFlag(false);
      }

      setTweet(`${e.target.value}`);
    }, delay());
  };

  // Use Effect makes request to the server for language detection when tweet state is modified
  // Character limit logic implemented here
  useEffect(() => {
    axios
      .post(`http://${domain}/${endpoint}`, {
        tweet: tweet,
      })
      .then((res) => {
        let y = res.data.hashtag.length;
        let z = tweet.length + y;
        if (z > 279) {
          // Max 280 characters
          let diff = z - 279;
          let truncatedTweet = tweet.substring(0, tweet.length - diff); // truncated tweet
          setFlag(true);
          setNewTweet(truncatedTweet);
        }
        setTomato(res.data.hashtag);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tweet]);

  // Rendered elements in the DOM
  return (
    <div>
      <h1>Tomato</h1>
      <h1 class={"animate__animated animate__bounce"}>🍅</h1>
      <textarea maxLength={280} type="text" onChange={handleChange}></textarea>
      <textarea type="text" readOnly value={flag ? `${newTweet} ${tomato}` : `${tweet} ${tomato}`}></textarea>
      {/* If more than 280 characters, render newTweet else render unshortened tweet*/}
    </div>
  );
}

export default App;
