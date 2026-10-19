
import { createContext, useState } from "react";

export const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  const [tweets, setTweets] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <TweetContext.Provider
      value={{
        tweets,
        setTweets,
        loading,
        setLoading,
        message,
        setMessage,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
