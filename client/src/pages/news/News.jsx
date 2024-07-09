import "./news.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { makeRequest } from "../../axios.js";
import { useQuery } from "@tanstack/react-query";

const News = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { isLoading, err, data } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`/news${searchQuery}`);
        setIsSearching(false);
        return response.data;
      } catch (err) {
        return err;
      }
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(`?search=${search}`);
      setSearch("");
      setIsSearching(true);
    }
  };

  return (
    <div className="news">
      <div className="search">
        <SearchOutlinedIcon />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for news..."
        />
      </div>
      {err
        ? "Something went wrong"
        : isLoading || isSearching
        ? "Loading news..."
        : data.map((newsItem, index) => {
            return (
              <div className="item" key={index}>
                <div className="newsItem">
                  <img src={newsItem.photo_url} className="newsImg" alt="" />
                  <div className="newsTitle">
                    <Link
                      to={newsItem.link}
                      style={{ textDecoration: "none", color: "inherit" }}
                      target="_blank"
                    >
                      <p>{newsItem.title}</p>
                    </Link>
                    <Link
                      to={newsItem.source_url}
                      style={{ textDecoration: "none", color: "inherit" }}
                      target="_blank"
                    >
                      <img src={newsItem.source_favicon_url} alt="" />
                    </Link>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
    </div>
  );
};

export default News;
