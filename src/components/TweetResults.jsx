import { useState } from "react";

const TweetResults = ({ tweets }) => {
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!tweets) {
    return null;
  }

  // Separate the brand voice summary and tweets
  const summaryMatch = tweets.match(
    /BRAND VOICE SUMMARY\s*([\s\S]*?)\s*TWEETS\s*/
  );

  const summaryText = summaryMatch ? summaryMatch[1].trim() : "";

  const summaryList = summaryText
    .split("\n")
    .map((item) => item.replace(/^[•\s]+/, "").trim())
    .filter(Boolean);

  // Extract only the numbered tweets after the TWEETS heading
  const tweetsSection = tweets.includes("TWEETS")
    ? tweets.split("TWEETS").slice(1).join("TWEETS")
    : tweets;

  const tweetList = tweetsSection
    .split(/\n\s*\n/)
    .map((tweet) => tweet.replace(/^\s*\d+\.\s*/, "").trim())
    .filter(Boolean);

  const copyTweet = async (tweet, index) => {
    try {
      await navigator.clipboard.writeText(tweet);
      setCopiedIndex(index);
      setCopiedAll(false);
    } catch {
      alert("Unable to copy. Please copy the tweet manually.");
    }
  };

  const copyAllTweets = async () => {
    try {
      await navigator.clipboard.writeText(
        tweetList
          .map((tweet, index) => `${index + 1}. ${tweet}`)
          .join("\n\n")
      );

      setCopiedAll(true);
      setCopiedIndex(-1);
    } catch {
      alert("Unable to copy tweets. Please copy them manually.");
    }
  };

  return (
    <section className="results">
      <div className="results-heading">
        <div>
          <p className="section-label">YOUR CONTENT</p>
          <h2>Your Generated Tweets</h2>
          <p className="results-description">
            {tweetList.length} tweet ideas created for your brand.
          </p>
        </div>

        <button
          className="copy-btn"
          type="button"
          onClick={copyAllTweets}
        >
          {copiedAll ? "✓ Copied All" : "Copy All"}
        </button>
      </div>

      {/* Brand voice summary */}
      {summaryList.length > 0 && (
        <article className="tweet-card">
          <div className="tweet-body">
            <h3>Brand Voice Summary</h3>

            <ul>
              {summaryList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      )}

      {/* Display only the actual tweets */}
      <div className="tweet-list">
        {tweetList.map((tweet, index) => (
          <article className="tweet-card" key={`${index}-${tweet}`}>
            <div className="tweet-number">{index + 1}</div>

            <div className="tweet-body">
              <p>{tweet}</p>

              <div className="tweet-footer">
                <span className="character-count">
                  {tweet.length} characters
                </span>

                <button
                  className="single-copy-btn"
                  type="button"
                  onClick={() => copyTweet(tweet, index)}
                >
                  {copiedIndex === index ? "✓ Copied" : "Copy tweet"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TweetResults;