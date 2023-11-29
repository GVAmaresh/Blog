import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const randomWords = [
  "scrollBackground",
  "scrollBackgroundMiddle",
  "scrollBackgroundReverse",
  "scrollBackgroundFirst",
  "scrollBackgroundLast",
  "scrollBackgroundLastFirst",
  "scrollBackgroundFirstLast",
];

function Blog({ id, photo, title, height, width }) {
  const navigate = useNavigate();
  function checkLoggedIn(url) {
    fetch("http://127.0.0.1:5000/api/v1/user/isLoggedIn", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.compile === "notLoggedIn") {
          alert("You are not logged in");
          return navigate("/login");
        }
        navigate(url);
      });
  }

  const handleMouseOver = (event) => {
    const img = event.currentTarget.querySelector(".img");
    const title = event.currentTarget.querySelector(".title");

    if (img && title) {
      img.style.opacity = "0.8";
      title.style.display = "block";
    }
  };

  const handleMouseOut = (event) => {
    const img = event.currentTarget.querySelector(".img");
    const title = event.currentTarget.querySelector(".title");

    if (img && title) {
      img.style.opacity = "1";
      title.style.display = "none";
    }
  };

  const handleClick = () => {
    // Handle click
    checkLoggedIn(`/page?id=${id}`);
  };

  return (
    <div
      className={`article blog-${id}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <img
        className="img"
        id={id}
        src={photo}
        alt=""
        style={{
          height: `${height}px`,
          width: `${width}px`,
          objectFit: "cover",
          animation: `${
            randomWords[Math.floor(Math.random() * randomWords.length)]
          } 10s linear infinite`,
        }}
      />
      <p className="title" style={{ zIndex: 100 }}>
        {title}
      </p>
    </div>
  );
}

function Main() {
  const [repeatColumn, setRepeatColumn] = useState({
    height: 600,
    width: 999,
    column: 2,
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dividePost, setDividePost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let column;
    let height;
    let width;
    const screen = window.innerWidth;
    if (screen < 600) {
      setRepeatColumn((prev) => ({ ...prev, column: 1, height: 400 }));
      column = 1;
      height = 400;
    } else if (screen > 600 && screen <= 800) {
      setRepeatColumn((prev) => ({ ...prev, column: 2, height: 400 }));
      column = 2;
      height = 400;
    } else if (screen > 800 && screen <= 1300) {
      setRepeatColumn((prev) => ({ ...prev, column: 2, height: 600 }));
      column = 2;
      height = 600;
    } else if (screen > 1300) {
      setRepeatColumn((prev) => ({
        ...prev,
        column: 3,
        height: 600,
        width: 1200,
      }));
      column = 3;
      height = 600;
      width = 1200;
    } else if (screen > 2000) {
      setRepeatColumn((prev) => ({
        ...prev,
        column: 4,
        height: 700,
        width: 999,
      }));
      column = 4;
      height = 700;
      width = 999;
    }
    // setRepeatColumn((prev) => ({
    //   ...prev,
    //   height: 700,
    // }));
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/v1/post/getAllPost/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const news = data.data.reverse();
        const result = Array.from({ length: column }, () => []);
        news.forEach((item, index) => {
          const targetArrayIndex = index % column;
          result[targetArrayIndex].push(item);
        });
        console.log(result);
        setPosts(result);
      });
    setLoading(false);
    console.log("true");
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("http://127.0.0.1:5000/api/v1/post/getAllPost/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const news = data.data.reverse();
  //       const result = Array.from({ length: column }, () => []);
  //       news.forEach((item, index) => {
  //         const targetArrayIndex = index % repeatColumn.column;
  //         result[targetArrayIndex].push(item);
  //       });
  //       console.log(result);
  //       setPosts(result);
  //     });
  //   setLoading(false);
  //   console.log("true");
  // }, [repeatColumn]);

  function checkLoggedIn(url) {
    fetch("http://127.0.0.1:5000/api/v1/user/isLoggedIn", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.compile === "notLoggedIn") {
          alert("You are not logged in");
          return navigate("/login");
        }
        navigate(url);
      });
  }
  return (
    <div>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <img className="logo-img" src="https://hmp.me/eae2" alt="" />
          </div>
          <div className="content">
            <div className="home" onClick={() => navigate("/")}>
              Home
            </div>
            <div className="about" onClick={() => navigate("/about")}>
              About
            </div>
            <div
              className="create"
              onClick={() => checkLoggedIn("/createArticle")}
            >
              Create Article
            </div>
            <div className="loginNav" onClick={() => navigate("/login")}>
              Login
            </div>
          </div>
        </div>

        <div
          className="blogs"
          style={{ gridTemplateColumns: `repeat(${repeatColumn.column}, 1fr)` }}
        >
          {Array.from({ length: repeatColumn.column }).map((_, index) => (
            <div
              className={`blog blog-${index}`}
              key={index}
              style={{ height: `${window.innerHeight}px` }}
            >
              {loading
                ? "Loading..."
                : posts.length < 1
                ? null
                : posts[index].map((post) => (
                    <Blog
                      key={post._id + repeatColumn.column}
                      id={post._id}
                      photo={post.photo}
                      title={post.title}
                      height={repeatColumn.height}
                      width={repeatColumn.width}
                    />
                  ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
