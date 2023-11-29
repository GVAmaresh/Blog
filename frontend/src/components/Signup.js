import React, { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
function Signup() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    photo: "",
  });
  const onShift = () => {
    navigate("/login");
  };
  const onSignup = () => {
    if (
      !value.name.trim() ||
      !value.email.trim() ||
      !value.password.trim() ||
      !value.passwordConfirm.trim()
    ) {
      return alert("Please fill the Form");
    }
    if (
      !value.email.includes("@") ||
      !(value.email.length >= 8) ||
      !(value.password.length >= 8)
    ) {
      return alert("Please enter the email or password");
    }
    if (!(value.password === value.passwordConfirm)) {
      return alert("Password doesn't match");
    }
    fetch("http://127.0.0.1:5000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photo: value.photo,
        name: value.name,
        email: value.email,
        password: value.password,
        passwordConfirm: value.passwordConfirm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Cookies.set("token", data.token);
        if (data.status === "success") {
          alert("Signup Successfully");
          navigate("/");
          return;
        }
        alert(" Un-successfully Signup");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <form className="container-sign">
        <div className="image-s"></div>
        <div className="extra-s">
          <div className="login-s">
            <div className="myLogin-s">
              <div className="welcome">Become a Member</div>
              <div className="photo">
                <input
                  type="text"
                  className="editPhoto input-s"
                  onChange={(event) =>
                    setValue((e) => ({ ...e, photo: event.target.value }))
                  }
                  placeholder="Enter your Photo in URL(optionnal)"
                />
              </div>
              <div className="name">
                <input
                  type="name"
                  className="editName input-s"
                  onChange={(event) =>
                    setValue((e) => ({ ...e, name: event.target.value }))
                  }
                  placeholder="Enter your Name"
                />
              </div>
              <div className="email-s">
                <input
                  type="email"
                  className="editEmail input-s"
                  onChange={(event) =>
                    setValue((e) => ({ ...e, email: event.target.value }))
                  }
                  placeholder="Enter your Email"
                />
              </div>
              <div className="password-s">
                <input
                  type="password"
                  name=""
                  id=""
                  onChange={(event) =>
                    setValue((e) => ({ ...e, password: event.target.value }))
                  }
                  className="editPassword input-s"
                  placeholder="Enter your Password"
                />
              </div>
              <div className="changePassword">
                <input
                  type="password"
                  className="editPasswordConfirm input-s"
                  name=""
                  onChange={(event) =>
                    setValue((e) => ({
                      ...e,
                      passwordConfirm: event.target.value,
                    }))
                  }
                  id=""
                  placeholder="Enter your Password"
                />
              </div>
              <div className="signin-s" onClick={onSignup}>
                SIGN IN
              </div>
              <div className="signup-s">
                <div className="">Have an Account</div>
                <div className="shift-s" onClick={onShift}>
                  Login
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
