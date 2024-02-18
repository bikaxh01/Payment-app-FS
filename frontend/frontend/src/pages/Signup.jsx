import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const btnonClick = async () => {
    // btn handler
    try {
      const response = await axios.post(
        // api request
        "http://localhost:3000/api/v1/user/signup",
        {
          firstname: firstName,
          lastname: lastName,
          username: userName,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token); // save token to localhost
      alert(response.data.msg); // alert message
      navigate("/dashboard");
      return;
    } catch (error) {
      // if catch
      alert(error.response.data); // return alert
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            placeholder="Bikash"
            label={"First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            placeholder="Mishra"
            label={"Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            placeholder="example@gmail.com"
            label={"Email"}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={btnonClick} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
