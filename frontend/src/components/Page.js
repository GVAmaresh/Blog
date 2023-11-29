import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Page() {
  const { id } = useParams();
  const location = useLocation();

  const [value, setValue] = useState({
    id: "",
    title: "",
    image: "",
    subheading: "",
    summary: "",
    description: "",
    otherComment: "",
    heading: "",
    comment: "",
    input: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryId = searchParams.get("id");

    setValue((prev) => ({ ...prev, id: queryId }));
    fetch("http://127.0.0.1:5000/api/v1/post/getPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
      body: JSON.stringify({ id: queryId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const details = data.data;

          setValue((prev) => ({
            ...prev,
            title: details.title,
            image: details.photo,
            subheading: details.subheading,
            summary: details.summary,
            description: details.description.replace(/\n/g, "<br><br>"),
          }));
        }
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
      });

    fetch("http://127.0.0.1:5000/api/v1/user/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
      body: JSON.stringify({ id: queryId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setValue((prev) => ({ ...prev, otherComment: "" }));
        if (data.status === "success") {
          console.log(data.data);
          commentSection(data.data.comment);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [value.id, location.search, id]);

  const onCommit = () => {
    if (!value.input.trim()) return;
    fetch("http://127.0.0.1:5000/api/v1/user/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
      body: JSON.stringify({ comment: value.input, id: value.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.compile) {
          setValue((prev) => ({ ...prev, input: "" }));
          return alert("You have already commented on this post");
        }
        if (data.status === "success") {
          setValue((prev) => ({ ...prev, otherComment: "" }));
          commentSection(data.data.comment);
        }
      });
  };

  function commentSection(data) {
    setValue((prev) => ({ ...prev, heading: `Comments (${data.length})` }));

    const comments = data.map((comment, index) => (
      <div key={index} className="comments">
        <div
          className="circle-images"
          style={{ backgroundImage: `url(${comment.personImg})` }}
        ></div>
        <div className="details">
          <div className="name">{comment.personName}</div>
          <div className="opinion">{comment.comment}</div>
        </div>
      </div>
    ));

    setValue((prev) => ({ ...prev, otherComment: comments, input: "" }));
  }

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
          navigator("/login");
        } else {
          window.location.href = url;
        }
      });
  }

  return (
    <div>
      <div className="container-page">
        <div className="navbar">
          <div className="logo">
            <img className="logo-img" src="https://hmp.me/eae2" alt="" />
          </div>
          <div className="content">
            <div className="home">Home</div>
            <div className="about">About</div>
            <div className="create">Create Article</div>
            <div className="loginNav">Login</div>
          </div>
        </div>
        <div className="article-pages">
          <div className="title-p">{value.title}</div>
          <div className="images-p">
            <img src={value.image} alt="" className="image-p" />
          </div>
          <div className="subheading">{value.subheading}</div>
          <div className="summary">{value.summary}</div>
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: value.description }}
          ></p>
          <div className="commentSection">
            <div className="heading">{value.heading}</div>
            <div className="comment">
              What You Think
              <div className="input">
                <input
                  type="message"
                  className="editInput"
                  name=""
                  id=""
                  value={value.input}
                  onChange={(e) =>
                    setValue((prev) => ({ ...prev, input: e.target.value }))
                  }
                />
              </div>
              <div className="commit" onClick={onCommit}>
                Comment
              </div>
            </div>
            <div className="otherComment">{value.otherComment}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
