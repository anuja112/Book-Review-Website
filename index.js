import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "permalist",
    password: "123456",
    port: 5432
});

db.connect();

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM books ORDER BY rating DESC");
        res.render("index.ejs", { books: result.rows});
    } catch (err) {
        console.log(err);
    }
});
app.get("/add", (req, res) => {
    res.render("new.ejs");
})
app.post("/add-book", async (req, res) => {
    const { title, author, rating, notes } = req.body;
    try {
        // 1. Get ISBN from Open Library
        const response = await axios.get(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
        );

        const coverId = response.data.docs[0]?.cover_i;

        const cover_url = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "/assets/default.png";

        // 3. Insert into DB
        await db.query(
            "INSERT INTO books (title, author, rating, notes, cover_url) VALUES ($1,$2,$3,$4,$5)",
            [title, author, rating, notes, cover_url]
        );

    } catch (err) {
        console.log(err);
    }

    res.redirect("/");
}
);

app.post("/edit", async (req, res) => {
    const { id, title, author, rating, notes } = req.body;

    try {
        await db.query(
            "UPDATE books SET title=$1, author=$2, rating=$3, notes=$4 WHERE id=$5",
            [title, author, rating, notes, id]
        );
    } catch (err) {
        console.log(err);
    }

    res.redirect("/");
});

app.post("/delete", async (req, res) => {
    const id = req.body.id;
    try {
        await db.query("delete from books where id=$1", [id]);
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
})



app.listen(port, () => {
    console.log(`Server running on ${port}`);
});