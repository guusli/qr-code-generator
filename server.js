const express = require("express");
var cors = require("cors");
const axios = require("axios");
const app = express();
const port = 8888;

app.use(cors());

app.get("/qrcode/:productId", async (req, res) => {
  var QRCode = require("qrcode");

  QRCode.toDataURL(
    `http://localhost:3000/?productId=${req.params.productId}`,
    function (err, url) {
      console.log(url);
      const imgBase64 = url.split(",")[1];

      var img = Buffer.from(imgBase64, "base64");

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      });
      res.end(img);
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
