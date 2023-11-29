import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !email.includes("@") ||
      !(email.length > 8)
    ) {
      return alert("Please Enter a valid email or password");
    }
    if (password.length < 8) {
      return alert("Password should have 8 character");
    }
    fetch("http://127.0.0.1:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.compile === "notFound") {
          alert("Account not Found!");
          return navigate("/signup");
        }
        console.log(data);
        if (data.status === "success") {
          Cookies.set("token", data.token);
          navigate("/");
        }
      });
  };
  const onShift = () => {
    navigate("/signup");
  };

  return (
    <div>
      <form className="container-img">
        <div className="image"></div>
        <div className="extra">
          <div className="login">
            <div className="myLogin">
              <div className="welcome">Already a Memeber</div>
              <div className="email">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="editEmail input-l"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  name=""
                  className="editPassword input-l"
                  onChange={(e) => setPassword(e.target.value)}
                  id=""
                  placeholder="Enter your Password"
                />
              </div>
              <div className="signin" onClick={onLogin}>
                SIGN IN
              </div>
              <div className="signup">
                <div className="">Don't have an Account</div>
                <div className="shift" onClick={onShift}>
                  Create One
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
