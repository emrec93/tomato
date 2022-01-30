import { useEffect, useState } from "react";
const axios = require("axios").default;

function App() {
  const [tweet, setTweet] = useState("");
  const [tomato, setTomato] = useState("");
  const [newTweet, setNewTweet] = useState("");
  const [flag, setFlag] = useState(false);

  const endpoint = "api/translate";
  const domain = "localhost:5000";
  let timeout = null;

  const delay = () => {
    return parseFloat((Math.random() * 2000 + 500).toFixed(2));
  };

  function handleChange(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value === "" || e.target.value === null) {
        setTweet("");
        setTomato("");
        setFlag(false);
      }

      setTweet(`${e.target.value}`);
    }, delay());
  }

  useEffect(() => {
    axios
      .post(`http://${domain}/${endpoint}`, {
        tweet: tweet,
      })
      .then((res) => {
        let y = res.data.hashtag.length;
        let z = tweet.length + y;
        if (z > 279) {
          let diff = z - 279;
          let truncatedTweet = tweet.substring(0, tweet.length - diff);
          console.log(truncatedTweet);
          setFlag(true);
          setNewTweet(truncatedTweet);
        }
        setTomato(res.data.hashtag);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tweet]);

  return (
    <div>
      <h1>Tomato</h1>
      <h1 class={"animate__animated animate__bounce"}>🍅</h1>
      <textarea maxLength={280} type="text" onChange={handleChange}></textarea>
      <textarea type="text" readOnly value={flag ? `${newTweet} ${tomato}` : `${tweet} ${tomato}`}></textarea>
    </div>
  );
}

export default App;

// DETECT URL
