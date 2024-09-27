import React, { useEffect, useState } from "react";
import Auth_input from "./Auth_input";
import { useNavigate } from "react-router-dom";
import { signIn_, signUp_ } from "../../api";
import Simpleloader from "../../Simpleloader";

function Auth() {
  let initialdata = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);

  const navigate = useNavigate();

  const [IsSignup, setIsSignup] = useState(false);
  const [Formdata, setFormdata] = useState(initialdata);
  const handlechange = (e) => {
    setFormdata({ ...Formdata, [e.target.name]: e.target.value });
  };

  const signup = async (Formdata) => {
    try {
      setisloading(true);

      await signUp_(Formdata);
      setisloading(false);
      setIsSignup(false);
      seterror(null);
    } catch (err) {
      setisloading(false);

      seterror(err.response.data.message);
    }
  };
  const signin = async (Formdata, navigate) => {
    try {
      setisloading(true);

      let { data } = await signIn_(Formdata);

      localStorage.setItem("currentUser", JSON.stringify(data));
      setisloading(false);
      setIsSignup(false);
      seterror(null);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setisloading(false);
      seterror(err?.response?.data.message);
    }
  };

  const submit_handler = () => {
    if (IsSignup) {
      signup(Formdata, navigate);
    } else {
      signin(Formdata, navigate);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-[80vh]  ">
      <div className="w-[32%] border bg-[#f3f3f3] rounded-lg shadow-lg">
        <div className="w-full h-full  p-4">
          <div className="w-full  flex justify-center p-1">
            <img src="auth_img.png" width={"60px"} />
          </div>
          {error && (
            <div className="w-full  flex justify-center p-1 bg-[#da4e4e] text-[white]">
              {error && error}
            </div>
          )}
          {isloading && (
            <div className="w-full  flex justify-center p-1">
              <Simpleloader />
            </div>
          )}

          <div className="w-full flex  ">
            <div className="bg-yellow-400 w-full text-center">
              {!IsSignup ? "Sign In" : "Sign Up"}
            </div>
          </div>
          <div className="flex flex-col w-full h-[80%]  bg-slate-400 p-3">
            {IsSignup && (
              <Auth_input
                handlechange={handlechange}
                type={"text"}
                name={"name"}
                placeholder={"Name"}
                autoFocus
                label={"Name"}
              ></Auth_input>
            )}
            <Auth_input
              handlechange={handlechange}
              type={"email"}
              name={"email"}
              placeholder={"Enter your Email"}
              label={"Email"}
            ></Auth_input>
            <Auth_input
              handlechange={handlechange}
              type={"password"}
              name={"password"}
              placeholder={"Enter the Password"}
              autoFocus
              label={"Password"}
            ></Auth_input>
            {IsSignup && (
              <Auth_input
                handlechange={handlechange}
                type={"password"}
                name={"confirmpassword"}
                placeholder={"Enter Password again"}
                autoFocus
                label={"Confirm Password"}
              ></Auth_input>
            )}

            <div className="mt-2">
              {IsSignup ? (
                <span>
                  Have an account ?
                  <b
                    onClick={() => {
                      setIsSignup(false);
                    }}
                    className="cursor-pointer"
                  >
                    Sign in
                  </b>
                </span>
              ) : (
                <span>
                  Don't have an account ?
                  <b
                    onClick={() => {
                      setIsSignup(true);
                    }}
                    className="cursor-pointer hover:bg-[#ffffff84] p-[2px] rounded-md"
                  >
                    Sign up
                  </b>
                </span>
              )}
            </div>
            <br />
            <div className="flex justify-center">
              <button
                onClick={() => {
                  submit_handler();
                }}
                disabled={isloading}
                className="bg-[white] rounded-md py-1 px-2"
              >
                {IsSignup ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
