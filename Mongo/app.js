const express = require("express");
const mongoose = require("mongoose");
const method_override = require("method-override");
const PORT = 8080;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(method_override("_method"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/music");
}

main().catch((err) => {
  console.log(err);
});

const songsSchema = new mongoose.Schema({
  song_name: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String,
});

const Songdetail = mongoose.model("Songdetail", songsSchema);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/insert5", async (req, res) => {
  let arr = [
    { song_name: "hello", film: "world", music_director: "xyz", singer: "abc" },
    { song_name: "he", film: "wo", music_director: "x", singer: "a" },
    { song_name: "lo", film: "or", music_director: "yz", singer: "bc" },
    { song_name: "o", film: "w", music_director: "z", singer: "c" },
    {
      song_name: "compass",
      film: "mongo",
      music_director: "node",
      singer: "express",
    },
  ];
  let result = await Songdetail.insertMany(arr);
  res.send(result);
});

app.get("/add", async (req, res) => {
  let result = await Songdetail.insertMany({
    song_name: "Tum se hi",
    film: "Jab we met",
    music_director: "Pritam",
    singer: "Mohit Chauhan",
  });
  res.send(result);
});

app.get("/totalcount", async (req, res) => {
  let allsongs = await Songdetail.find();
  let count = allsongs.length;
  res.send({ allsongs: allsongs, count: count });
});

app.put("/update", async (req, res) => {
  console.log(req.body.song);
  let { song, actor, actress } = req.body;
  const filter = { song_name: song };
  const update = { actor: actor, actress: actress };
  let result = await Songdetail.findOneAndUpdate(filter, update, { new: true });
  res.send(result);
});

app.get("/display", async (req, res) => {
  const songs = await Songdetail.find();
  let html = "<table border=1 style='border-collapse: collapse'>";
  html =
    html +
    `<tr>
        <th>Song Name</th>
        <th>Film</th>
        <th>Music Director</th>
        <th>Singer</th>
        <th>Actor</th>
        <th>Actress</th>
    </tr>`;
  songs.map(function (song) {
    html = html + "<tr>";
    html = html + "<td>" + song.song_name + "</td>";
    html = html + "<td>" + song.film + "</td>";
    html = html + "<td>" + song.music_director + "</td>";
    html = html + "<td>" + song.singer + "</td>";
    html = html + "<td>" + song.actor + "</td>";
    html = html + "<td>" + song.actress + "</td>";
    html = html + "</tr>";
  });
  html = html + "</table>";
  res.send(html);
});

app.post("/musicd", async (req, res) => {
  let director = req.body.musicd;
  let result = await Songdetail.find({ music_director: director });
  res.send(result);
});

app.post("/musicd/singer", async (req, res) => {
  let { musicd, singer } = req.body;
  console.log(musicd, singer);
  let result = await Songdetail.find({
    music_director: musicd,
    singer: singer,
  });
  res.send(result);
});

app.delete("/delete", async (req, res) => {
  let { songname } = req.body;
  let result = await Songdetail.deleteOne({ song_name: songname });
  res.send(result);
});

app.post("/singer/film", async (req, res) => {
  const singerName = req.body.singer;
  const filmName = req.body.film;
  const songs = await Songdetail.find({ singer: singerName, film: filmName });
  res.send(songs);
});
