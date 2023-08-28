import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import InputControl from "./inputControl/InputControl";
import { Link, redirect, useNavigate } from "react-router-dom";
import { auth,  } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, updateProfile } from "firebase/auth";



const useStyles = makeStyles(() => ({
  container1: {
    display: "flex",
    height: "100vh",
  },
  left: {
    width: "40%",
    height: "100%",

    backgroundColor: "#14161a",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 80,
  },
  right: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    height: "100%",
    minHeight: "100vh",
    width: "80%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    minWidth: 480,
    height: "fit-content",
    width: "fit-content",
    backgroundColor: "#fff",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
    padding: 30,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  error: {
    fontWeight: "bold",
    fontSize: "0.875rem",
    color: "#ff3300",
    textAlign: "center",
  },
  button: {
    outline: "none",
    border: "none",
    backgroundColor: "#14161a",
    color: "#fff",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "10px 16px",
    width: "100%",
    transition: "100ms",
    cursor: "pointer",
    "&:disabled": {
      backgroundColor: "gray !important",
    },
    "&:hover": {
      backgroundColor: "gray",
      color: "#14161a",
    },
  },
  paragraph: {
    fontWeight: 700,
    color: "#000",
  },
  link: {
    fontWeight: "bold",
    color: "#14161a",
    letterSpacing: 1,
    fontSize: "1rem",
    textDecoration: "none",
  },
}));
const Home = (props) => {
  const navigate =useNavigate();
 
  // error msg
  const toggleChecked = () => setSwei((swi) => !swi);
  const [errormsg, setErrormsg] = useState("");
  const [swi, setSwei] = useState(false);
  const [disablesubmitbutton, setDisablesubmitbutton] = useState(false);



  // sign in
  const [signInValues, setSignInvalues] = useState({
   
    email: "",
    pass: "",
  });
  const handleSignInSubmission = () => {
    if ( !signInValues.pass || !signInValues.email) {
      setErrormsg("Fill all the filed bc!!");
      return;
    }
    setErrormsg("");
    setDisablesubmitbutton(true);
    signInWithEmailAndPassword(auth, signInValues.email, signInValues.pass)
      .then(async (res) => {
        setDisablesubmitbutton(false);
        
        navigate("/post1");
      
      })
      .catch((err) => {
        setErrormsg(err.message);
        setDisablesubmitbutton(false);
      });
   
  };




 // signup
 const [values, setValues] = useState({
  name: "",
  email: "",
  pass: "",
});
  // Sign up 
  const handleSubmission = () => {
    if (!values.name || !values.pass || !values.email) {
      setErrormsg("Fill all the filed bc!!");
      return;
    }
    setErrormsg("");
    setDisablesubmitbutton(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setDisablesubmitbutton(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        console.log(user)
        toggleChecked();
      
      })
      .catch((err) => {
        setErrormsg(err.message);
        setDisablesubmitbutton(false);
      });
   
  };

// google


  const classess = useStyles(props);

  return (
    <div className={classess.container1}>
      <div className={classess.left}>Board.</div>
      <div className={classess.right}>
        {!swi ? (
          <div className={classess.container}>
            <div className={classess.innerBox}>
              <h1 className={classess.heading}>Sign In</h1>
              <div >
              {/* <button className={classess.button} style={{width:"50%"}}>Google</button>
              <button className={classess.button} style={{width:"50%"}}>Google</button> */}
              </div>
              
              <InputControl label="Email" placeholder="Enter email address"  onChange={(event) =>
                  setSignInvalues((prev) => ({ ...prev, email: event.target.value }))
                }
               />
              <InputControl label="Password" placeholder="Enter Password"  onChange={(event) =>
                  setSignInvalues((prev) => ({ ...prev, pass: event.target.value }))
                } />
              <div className={classess.footer}>
                <p className={classess.error}>{errormsg}</p>
                <button className={classess.button} onClick={handleSignInSubmission}>
                  Sign In
                </button>
                <p>
                  Don't have an account?{" "}
                  <span>
                    <Link onClick={toggleChecked} className={classess.link}>
                      Sign up
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={classess.container}>
            <div className={classess.innerBox}>
              <h1 className={classess.heading}>Signup</h1>

              <InputControl
                label="Name"
                placeholder="Enter your name"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              <InputControl
                label="Email"
                placeholder="Enter email address"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
              <InputControl
                label="Password"
                placeholder="Enter password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />

              <div className={classess.footer}>
                <p className={classess.error}>{errormsg}</p>
                <button
                  className={classess.button}
                  onClick={handleSubmission}
                  disabled={disablesubmitbutton}
                >
                  Signup
                </button>
                <p>
                  Already have an account?{" "}
                  <span>
                    <Link onClick={toggleChecked} className={classess.link}>
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
