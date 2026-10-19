
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TweetProvider } from "./context/TweetContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <TweetProvider>
    <App />
  </TweetProvider>
);
