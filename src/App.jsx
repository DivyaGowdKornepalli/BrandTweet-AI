
import { useContext } from "react";
import Header from "./components/Header";

import TweetResults from "./components/TweetResults";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import { TweetContext } from "./context/TweetContext";
import { generateTweets as generateTweetsAPI } from "./services/TweetService";
import "./App.css";
import BrandForm from "./components/Brandform";

const App = () => {
  const {
    tweets,
    setTweets,
    loading,
    setLoading,
    message,
    setMessage,
  } = useContext(TweetContext);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setTweets("");
    setMessage("");

    try {
      const result = await generateTweetsAPI(formData);

      setTweets(result);
      setMessage("Tweets generated successfully!");
    } catch (error) {
      setMessage(
        error.message || "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="intro">
          <p className="tagline">AI CONTENT GENERATOR</p>

          <h1>Create tweets that match your brand</h1>

          <p>
            Enter your campaign details and generate 10
            creative tweet ideas.
          </p>
        </section>

        <BrandForm
          onGenerate={handleGenerate}
          loading={loading}
        />

        {loading && <Loading />}

        {message && <p className="message">{message}</p>}

        <TweetResults tweets={tweets} />

        <Footer />
      </main>
    </div>
  );
};

export default App;
