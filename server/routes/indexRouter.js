const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getData();
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
});

module.exports = router;
