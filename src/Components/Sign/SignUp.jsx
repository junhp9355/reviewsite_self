import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils";
import Topbar from "../Main/Topbar";
import "../../Style/Sign/SignUp.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [userid, setUserid] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUsers = async (userid) => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/user/`,
          method: "GET",
          data: {
            userid,
            nickname,
            email,
          },
        });
        setUser(data.data);
      } catch (e) {}
    };
    getUsers(userid);
  }, [userid]);

  return (
    <>
      <Topbar />
      <div className="signUpBody">
        <div className="signUpBack">
          <div className="signUptemplate">
            <div className="signUpLogo">
              <p>Sign-Up</p>
              <hr />
            </div>
            <div className="signUpForm">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const data = await axios({
                      url: `${BACKEND_URL}/user/join`,
                      method: "POST",
                      data: {
                        username,
                        nickname,
                        userid,
                        password1,
                        password2,
                        email,
                      },
                    });
                  } catch (e) {
                    console.log(e);
                    alert("회원가입 실패! 데이터를 확인하세요");
                  }
                }}
              >
                <div>
                  이름
                  <br />
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div>
                  별명
                  <br />
                  <input
                    type="text"
                    placeholder="사용할 별명을 입력해주세요"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                  <button
                    className="confirm"
                    onClick={() => {
                      console.log(nickname);
                      // if (nickname === user.nickname) {
                      document.getElementById("alert").innerHTML =
                        "이미 존재하는 별명입니다.";
                      // }
                    }}
                  >
                    중복확인
                  </button>
                  <p id="alert" className="alert"></p>
                </div>
                <div>
                  ID
                  <br />
                  <input
                    type="text"
                    placeholder="사용할 ID를 입력해주세요"
                    value={userid}
                    onChange={(e) => {
                      setUserid(e.target.value);
                    }}
                  />
                  <button
                    className="confirm"
                    onClick={() => {
                      document.getElementById("alert2").innerHTML =
                        "이미 존재하는 ID입니다.";
                    }}
                  >
                    중복확인
                  </button>
                  <p id="alert2" className="alert"></p>
                </div>
                <div>
                  password
                  <br />
                  <input
                    type="password"
                    value={password1}
                    onChange={(e) => {
                      setPassword1(e.target.value);
                    }}
                  />
                </div>
                <div>
                  Confirm password
                  <br />
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                  />
                  {/* <p className="alert">비밀번호를 확인해주세요.</p> */}
                </div>
                <div>
                  E-mail
                  <br />
                  <input
                    type="text"
                    placeholder="E-mail을 입력해주세요"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button
                    className="confirm"
                    onClick={() => {
                      document.getElementById("alert3").innerHTML =
                        "이미 존재하는 E-mail입니다.";
                    }}
                  >
                    중복확인
                  </button>
                  <p id="alert3" className="alert"></p>
                </div>
                <button
                  type="submit"
                  className="signUpButton"
                  onClick={() => {
                    if (window.confirm("가입하시겠습니까?")) {
                      alert("회원가입 성공!");
                      setUsername("");
                      setNickname("");
                      setUserid("");
                      setPassword1("");
                      setPassword2("");
                      setEmail("");
                      window.location.href = "/main";
                    }
                  }}
                >
                  가입하기
                </button>
              </form>
              <div className="loginButton">
                <a href="/login">로그인하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
