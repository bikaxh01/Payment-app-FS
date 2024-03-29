import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const btnhandler = async () => {
    // Onclick handler
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username: user,
          password: password,
        }
      );
      alert(response.data.signed_In);

      localStorage.setItem("token", response.data.token); // save JWT to local storage
      navigate("/dashboard");
      return;
    } catch (error) {
      if (error) {
        alert("Invalid user");
        return;
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="example@gmail.com"
            label={"Email"}
            onChange={(e) => setuser(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={btnhandler} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
