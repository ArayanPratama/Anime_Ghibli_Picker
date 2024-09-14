import express from "express";
import axios from "axios";

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle the homepage route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Endpoint to get a random film
app.get("/random-film", async (req, res) => {
  const apiUrl = "https://ghibliapi.vercel.app/films";
  try {
    const response = await axios.get(apiUrl);
    const films = response.data;
    // Pilih satu film acak
    const randomFilm = films[Math.floor(Math.random() * films.length)];
    res.json(randomFilm);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    console.error(
      "Error response:",
      error.response ? error.response.data : "No response data"
    );
    res.status(500).send("Error fetching data from Ghibli API");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
