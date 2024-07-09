import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getNews = (req, res) => {
  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    if (isEmptyObject(req.query)) {
      const options = {
        method: "GET",
        url: "https://real-time-news-data.p.rapidapi.com/top-headlines",
        params: {
          limit: "500",
          lang: "en",
          country: "IN",
        },
        headers: {
          "x-rapidapi-key": process.env.NEWS_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        return res.status(200).json(response.data.data);
      } catch (err) {
        return res.status(404).json(err);
      }
    } else {
      const options = {
        method: "GET",
        url: "https://real-time-news-data.p.rapidapi.com/search",
        params: {
          query: req.query.search,
          limit: "500",
          time_published: "anytime",
          country: "IN",
          lang: "en",
        },
        headers: {
          "x-rapidapi-key": process.env.NEWS_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        return res.status(200).json(response.data.data);
      } catch (err) {
        return res.status(404).json(err);
      }
    }
  });
};
