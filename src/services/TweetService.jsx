
const API_URL = "http://localhost:8080/api/generate";

export const generateTweets = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate tweets.");
  }

  return data.result;
};
