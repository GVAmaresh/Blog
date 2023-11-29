import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Article() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [subheading, setSubheading] = useState("");
  const [description, setDescription] = useState("");

  const handleCategoryClick = (e, category) => {
    const categoryIndex = categories.indexOf(category);

    if (e.target.style.backgroundColor === "") {
      e.target.style.backgroundColor = "red";
      setCategories([...categories, category]);
    } else {
      e.target.style.backgroundColor = "";

      if (categoryIndex !== -1) {
        const newCategories = [...categories];
        newCategories.splice(categoryIndex, 1);
        setCategories(newCategories);
      }
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (
      photo.trim() === "" ||
      title.trim() === "" ||
      summary.trim() === "" ||
      subheading.trim() === "" ||
      description.trim() === "" ||
      categories.length === 0
    ) {
      return alert("Please Fill All Data");
    }

    const sendDetails = {
      photo: photo.trim(),
      title: title.trim(),
      summary: summary.trim(),
      subheading: subheading.trim(),
      description: description.trim(),
      categories: [...new Set(categories)],
    };

    fetch("http://127.0.0.1:5000/api/v1/post/newPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        myCookie: Cookies.get("token"),
      },
      body: JSON.stringify(sendDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.compile) {
          alert("Please Login");
          return navigate("/login");
        }
        console.log("Data Sent Successfully", data.status);
        if (data.status === "success") {
          alert("Posted Successfully");
          setDescription("");
          setSubheading("");
          setSummary("");
          setTitle("");
          setPhoto("");
        }
      });
  };

  return (
    <div>
      <form className="container-a">
        <div className="image-a"></div>
        <div className="login-a">
          <div className="welcome-a">Create a Post</div>
          <div className="photo-a">
            <input
              type="text"
              className="editPhoto input"
              placeholder="Enter your Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
          <div className="title-a">
            <input
              type="text"
              className="editTitle input"
              placeholder="Enter your Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="summary-a">
            <input
              type="text"
              className="editSummary input"
              placeholder="Enter your Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div className="subheading-a">
            <input
              type="text"
              className="editSubheading input"
              placeholder="Enter your Subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
            />
          </div>
          <div className="description-a">
            <input
              type="text"
              className="editDescription input"
              placeholder="Enter your Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="categories">
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Romance")}
            >
              Romance
            </div>
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Crime")}
            >
              Crime
            </div>
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Cricket")}
            >
              Cricket
            </div>
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Politics")}
            >
              Politics
            </div>
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Corona")}
            >
              Corona
            </div>
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Celebrity")}
            >
              Celebrity
            </div>
            <div className="cat" onClick={(e) => handleCategoryClick(e, "War")}>
              War
            </div>
            <div
              className="cat"
              onClick={(e) => handleCategoryClick(e, "Internaltional")}
            >
              Internaltional
            </div>
          </div>
          <div className="create-a" onClick={handleCreatePost}>
            Create post
          </div>
        </div>
      </form>
    </div>
  );
}

export default Article;
