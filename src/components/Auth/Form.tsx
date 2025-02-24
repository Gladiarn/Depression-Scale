import { useState } from "react";
import { motion } from "motion/react";
import { IoIosWarning } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export type dataStructure = {
  Firstname: string;
  Lastname: string;
  Username: string;
  Password: string;
};

export default function Form() {

    const router = useRouter();
  async function toggleSignIn() {
    try {
      await signIn("google", { callbackUrl: "http://localhost:3000/" });
    } catch (error) {
      console.log(error);
    }
  }

  const HomeVariants = {
    initial: { opacity: 0, x: "-10vw" },
    animate: { opacity: 1, x: 0 },
  };

  const ChildVariants = {
    initial: { opacity: 0, x: "-10vw" },
    animate: { opacity: 1, x: 0, transition: { delay: 0.2 } },
  };

  // state for show pass
  const [showingPassword, setShowingPassword] = useState<boolean>(false);
  const [showingPassword2, setShowingPassword2] = useState<boolean>(false);

  const togglePass = (): void => {
    setShowingPassword(!showingPassword);
  };

  const togglePass2 = (): void => {
    setShowingPassword2(!showingPassword2);
  };

  // Logic for changing form
  const [whatForm, setWhatForm] = useState<string>("login");
  const triggerForm = (what: string): void => {
    setMessage("");
    clearForm();
    setWhatForm(what);
    setShowingPassword(false);
    setShowingPassword2(false);
  };

  // Messages
  const [message, setMessage] = useState<string>("");

  //states of input Fields
  const [loginUser, setLoginUser] = useState<string>("");
  const [loginPass, setLoginPass] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");
  const [registerLast, setRegisterLast] = useState<string>("");
  const [registerUser, setRegisterUser] = useState<string>("");
  const [registerPass, setRegisterPass] = useState<string>("");
  const [registerPassConfirm, setRegisterPassConfirm] = useState<string>("");

  const [success, setSuccess] = useState<boolean>(true);

  async function submitLoginForm(): Promise<void> {
    const res = await signIn("credentials", {
      redirect: false,
      Username: loginUser,
      Password: loginPass,
    });

    if (res?.error) {
      setMessage("Invalid username or password entered");
      setSuccess(false);
      return
    } else if (res?.ok) {
      setMessage("Successfully logged in.");
      setSuccess(true);
      router.push('/')
    }

  }

  async function submitRegisterForm(): Promise<void> {
    try {
      if (registerPassConfirm !== registerPass) {
        setMessage("Password and Confirm Password do not Match");
        setSuccess(false);
        return;
      }

      const userData: dataStructure = {
        Firstname: registerName,
        Lastname: registerLast,
        Username: registerUser,
        Password: registerPass,
      };

      console.log(userData);

      const res = await fetch("http://localhost:3000/api/adduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (res.ok) {
        clearForm();
        setMessage("Successfully inserted a new user.");
        setSuccess(true);
      } else {
        setMessage("Failed to insert a new record");
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // clear
  const clearForm = (): void => {
    setMessage("");
    setLoginUser("");
    setLoginPass("");

    setRegisterName("");
    setRegisterLast("");
    setRegisterUser("");
    setRegisterPass("");
    setRegisterPassConfirm("");
  };

  return (
    <motion.div
      variants={HomeVariants}
      initial={"initial"}
      animate={"animate"}
      transition={{ type: "spring", duration: 0.5 }}
      className="w-[550px] p-[15px]"
    >
      {/* LogIn */}
      <div
        className={`${
          whatForm == "login" ? "flex" : "hidden"
        } w-full h-full flex-col gap-[25px]`}
      >
        {/* Login Header */}
        <div className="w-full text-center text-surface">
          <p className="text-[40px] font-bold">Login</p>
          <p className="text-[13px] text-surface italic font-light">
            Start today with a personalized path to understanding your mental
            well-being.
          </p>
        </div>

        {/* Login Inputs */}
        <div className="w-full flex flex-col gap-[20px]">
          <motion.div
            variants={ChildVariants}
            initial={"initial"}
            animate={"animate"}
            transition={{ delay: 0.2 }}
            className="w-full relative"
          >
            <input
              value={loginUser}
              onChange={(e) => {
                setLoginUser(e.target.value);
              }}
              required
              type="text"
              className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
            />
            <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
              Username
            </span>
          </motion.div>
          <motion.div
            variants={ChildVariants}
            initial={"initial"}
            animate={"animate"}
            transition={{ delay: 0.2 }}
            className="w-full relative"
          >
            <input
              value={loginPass}
              onChange={(e) => {
                setLoginPass(e.target.value);
              }}
              required
              type={`${showingPassword == true ? "text" : "password"}`}
              className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
            />
            <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
              Password
            </span>
            {showingPassword == true ? (
              <FaRegEye
                className="absolute cursor-pointer text-surface top-[50%] transform translate-y-[-50%] right-[10px]"
                onClick={() => {
                  togglePass();
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute cursor-pointer text-surface top-[50%] transform translate-y-[-50%] right-[10px]"
                onClick={() => {
                  togglePass();
                }}
              />
            )}
          </motion.div>

          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-[5px]">
              <input
                type="checkbox"
                id="check"
                className="w-[12px] h-[12px] accent-background "
              />
              <label
                htmlFor="check"
                className="text-[12px] text-surface cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <div>
              <button
                onClick={() => {
                  clearForm();
                }}
                className="text-[13px] px-[5px] py-[3px] bg-surface border rounded-[7px] text-white"
              >
                Clear
              </button>
            </div>
          </div>

          {message && (
            <div className={`flex w-full gap-[5px] items-center ${
              success ? "text-success" : "text-error"
            } justify-center` }>
              <IoIosWarning />
              <p className="text-[12px]">{message}</p>
            </div>
          )}

          <button
            onClick={() => {
              submitLoginForm();
            }}
            className="w-full bg-surface p-[10px] rounded-[7px] border border-primary border-opacity-[20%] text-white scale-100 hover:scale-[98%] transition-all ease-in-out"
          >
            Submit
          </button>

          <div className="relative">
            <hr className="border border-black border-opacity-[10%]" />
            <p className=" px-[10px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-opacity-[70%] text-[12px] bg-white text-surface">
              Or sign in with
            </p>
          </div>

          <span className="flex justify-center">
            <button
              onClick={() => {
                toggleSignIn();
              }}
              className="flex items-center justify-center font-bold w-1/2 bg-white text-surface p-[10px] rounded-[7px] border border-surface  scale-100 hover:scale-[98%] transition-all ease-in-out"
            >
              <FcGoogle /> oogle
            </button>
          </span>
        </div>

        <div className="text-[13px] flex gap-[5px] text-surface">
          <p>Don&apos;t have an account yet?</p>
          <p
            className="text-surface font-bold text-opacity-[50%] cursor-pointer"
            onClick={() => {
              triggerForm("signup");
            }}
          >
            LogIn
          </p>
        </div>
      </div>

      {/* SignUp */}
      <div
        className={`${
          whatForm == "signup" ? "flex" : "hidden"
        } w-full h-full flex-col gap-[25px]`}
      >
        {/* Login Header */}
        <div className="w-full text-center">
          <p className="text-[30px] font-bold text-surface">SignUp</p>
          <p className="text-[13px] text-surface italic font-light">
            Join Us in Building a Better Mindset—Sign Up and Take the First
            Step.
          </p>
        </div>

        {/* Login Inputs */}
        <div className="w-full flex flex-col gap-[20px]">
          <div className="w-full flex gap-[10px]">
            <div className="w-full relative">
              <input
                value={registerName}
                onChange={(e) => {
                  setRegisterName(e.target.value);
                }}
                required
                type="text"
                className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
              />
              <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
                First Name
              </span>
            </div>
            <div className="w-full relative">
              <input
                value={registerLast}
                onChange={(e) => {
                  setRegisterLast(e.target.value);
                }}
                required
                type="text"
                className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
              />
              <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
                Last Name
              </span>
            </div>
          </div>
          <div className="w-full relative">
            <input
              value={registerUser}
              onChange={(e) => {
                setRegisterUser(e.target.value);
              }}
              required
              type="text"
              className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
            />
            <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
              Username
            </span>
          </div>

          <div className="w-full relative">
            <input
              value={registerPass}
              onChange={(e) => {
                setRegisterPass(e.target.value);
              }}
              required
              type={`${showingPassword == true ? "text" : "password"}`}
              className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
            />
            <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
              Password
            </span>
            {showingPassword == true ? (
              <FaRegEye
                className="absolute cursor-pointer text-surface top-[50%] transform translate-y-[-50%] right-[10px]"
                onClick={() => {
                  togglePass();
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute cursor-pointer text-surface top-[50%] transform translate-y-[-50%] right-[10px]"
                onClick={() => {
                  togglePass();
                }}
              />
            )}
          </div>

          <div className="w-full relative">

            <input
              value={registerPassConfirm}
              onChange={(e) => {
                setRegisterPassConfirm(e.target.value);
              }}
              required
              type={`${showingPassword2 == true ? "text" : "password"}`}
              className="pr-[40px] focus:outline-none valid:border valid:border-surface peer w-full p-[10px] border border-surface text-surface rounded-[7px]"
            />
            <span className="pointer-events-none transition-all ease-in-out peer-focus:outline-surface absolute left-2 top-[50%] translate-y-[-50%] text-surface text-opacity-[30%] peer-focus:top-0 peer-valid:top-0 peer-focus:bg-white peer-valid:bg-white peer-focus:left-5 peer-valid:left-5 peer-focus:px-[5px] peer-valid:px-[5px] peer-focus:text-surface peer-valid:text-surface">
              Confirm Password
            </span>

            {showingPassword2 == true ? (
              <FaRegEye
                className="absolute cursor-pointer text-surface top-[50%] transform translate-y-[-50%] right-[10px]"
                onClick={() => {
                  togglePass2();
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute cursor-pointer text-surface top-[50%] transform translate-y-[-50%] right-[10px]"
                onClick={() => {
                  togglePass2();
                }}
              />
            )}
          </div>

          <div className="flex justify-between items-center w-full">

            <div className="flex items-center gap-[5px]">
              <input
                type="checkbox"
                id="checkreg"
                className="w-[12px] h-[12px] accent-background"
              />
              <label
                htmlFor="checkreg"
                className="text-[12px] text-surface cursor-pointer"
              >
                I accept the Terms and Services
              </label>
            </div>

            <div>
              <button
                onClick={() => {
                  clearForm();
                }}
                className="text-[13px] px-[5px] py-[3px] bg-surface border rounded-[7px] text-white"
              >
                Clear
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`flex w-full gap-[5px] items-center ${
                success ? "text-success" : "text-error"
              } justify-center`}
            >
              <IoIosWarning />
              <p className="text-[12px]">{message}</p>
            </div>
          )}

          <button
            onClick={() => {
              submitRegisterForm();
            }}
            className="w-full bg-surface p-[10px] rounded-[7px] border border-primary border-opacity-[20%] text-white scale-100 hover:scale-[98%] transition-all ease-in-out"
          >
            Submit
          </button>
        </div>

        <div className="text-[13px] flex gap-[5px] text-surface">
          <p>Already have an account?</p>
          <p
            className="text-surface font-bold text-opacity-[50%] cursor-pointer"
            onClick={() => {
              triggerForm("login");
            }}
          >
            LogIn
          </p>
        </div>
      </div>
    </motion.div>
  );
}
