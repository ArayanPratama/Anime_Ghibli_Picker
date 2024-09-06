//import module yang diperlukan
import express from "express";
import axios from "axios";

//inisialisasi
const app = express();
const apiUrl = "https://ghibliapi.vercel.app/films";
const port = 3000;

//penyimpanan file statis
app.use(express.static("public"));

//handle rute beranda
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(apiUrl);
        res.render("index.ejs", {
            films: result.data
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Ghibli API');
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});