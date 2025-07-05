"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import RichTextEditor from "./RichTextEditor";

export default function Mailer({ isExpand, setIsExpand, setIsOpen, isOpen }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [resp, setResp] = useState();
  const [isMinimize, setMinimize] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await axios.get("/api/csrf");
        setCsrfToken(response.data.token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    
    fetchCSRFToken();
  }, []);

  const inputStyle = {
    color: theme.text.primary,
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    background: 'transparent',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none'
  };
  const handleContact = async (e) => {
    e.preventDefault();

    if (!csrfToken) {
      setResp("Security token not available. Please refresh the page.");
      setTimeout(() => {
        setResp("");
      }, 3000);
      return;
    }

    try {
      const response = await axios.post("/api/mailer", {
        email,
        subject,
        message,
        cc,
        bcc,
      }, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });

      if (response.status === 200) {
        setResp("Email sent successfuly! I'll get to you in bit.");
        setTimeout(() => {
          setIsOpen(false);
          setResp("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        setResp("Security validation failed. Please refresh the page.");
      } else {
        setResp("There was an issue sending the email :(");
      }

      setTimeout(() => {
        setResp("");
      }, 3000);
    }
  };

  const Notif = () => {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center">
        <div
          style={{ backgroundImage: "url(email-success.png)" }}
          className="bg-no-repeat bg-cover bg-right bg-dark-purple-300 w-[22rem] h-[10rem] shadow-xl rounded-xl flex flex-col text-white items-start justify-start py-10"
        >
          <h2 className="w-1/2 text-center">{resp}</h2>{" "}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`font-ropaSans w-4/5 h-4/5 ${
        isMinimize
          ? "md:w-[25rem]"
          : `${isExpand ? "md:w-4/5 md:h-4/5" : "md:w-[35rem] md:h-[35rem]"} `
      } rounded-t-xl flex flex-col font-light`}
      style={{ backgroundColor: theme.bg.card }}
    >
      {resp == "Email sent successfuly! I'll get to you in bit." && <Notif />}
      <div 
        className="rounded-t-xl text-sm font-semibold flex flex-row w-full h-10 items-center justify-between p-2"
        style={{ 
          backgroundColor: theme.bg.accent,
          color: theme.text.primary
        }}
      >
        <h2>New Message</h2>
        <div className={`flex flex-row items-end gap-x-2`}>
          <div
            className={`mr-1 hidden md:block ${isMinimize && "pb-3"}`}
            onClick={() => {
              setIsExpand(false);
              setMinimize(!isMinimize);
            }}
          >
            _
          </div>
          <div
            className={` hidden md:block bg-no-repeat bg-cover
        ${!isExpand ? "rotate-45 w-5 h-5  " : " w-4 h-4"}`}
            onClick={() => {
              setMinimize(false);
              setIsExpand(!isExpand);
            }}
            style={{
              backgroundImage: `url(icons/${
                isExpand ? "shrink" : "expand"
              }.svg)`,
            }}
          />
          <div
            className="bg-no-repeat bg-cover w-5 h-5"
            onClick={() => setIsOpen(false)}
            style={{ backgroundImage: "url(icons/exit.svg)" }}
          />
        </div>
      </div>

      <form
        className={`md:${
          isMinimize ? "hidden" : "flex"
        } flex flex-col p-2 justify-between h-full`}
        onSubmit={handleContact}
      >
        <div className="flex flex-col gap-y-3 h-full w-full">
          <div className="flex flex-col w-full border-b-[0.05rem]">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-x-2 py-2 w-full">
                <h2 style={{ color: theme.text.primary }}>From</h2>
                <input
                  type={"email"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="bg-transparent focus:outline-none w-full"
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-row gap-x-2 cursor-pointer py-2 justify-center">
                {ccOpen || bccOpen || (
                  <>
                    <div 
                      onClick={() => setCCOpen(!ccOpen)}
                      style={{ color: theme.text.primary }}
                    >
                      Cc
                    </div>
                    <div 
                      onClick={() => setBCCOpen(!bccOpen)}
                      style={{ color: theme.text.primary }}
                    >
                      Bcc
                    </div>
                  </>
                )}
              </div>
            </div>
            {ccOpen && (
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-x-2 py-2 w-full">
                  <h2 style={{ color: theme.text.primary }}>Cc</h2>
                  <input
                    type={"email"}
                    value={cc}
                    onChange={(e) => setCC(e.target.value)}
                    placeholder="Cc Email"
                    className="bg-transparent focus:outline-none w-full"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-row gap-x-2 cursor-pointer py-2 justify-center">
                  {!bccOpen && (
                    <div 
                      onClick={() => setBCCOpen(!bccOpen)}
                      style={{ color: theme.text.primary }}
                    >
                      Bcc
                    </div>
                  )}
                </div>
              </div>
            )}

            {bccOpen && (
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-x-2 py-2 w-full">
                  <h2 style={{ color: theme.text.primary }}>Bcc</h2>
                  <input
                    type={"email"}
                    value={bcc}
                    onChange={(e) => setBCC(e.target.value)}
                    placeholder="Bcc Email"
                    className="bg-transparent focus:outline-none w-full"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-row gap-x-2 cursor-pointer py-2 justify-center">
                  {!ccOpen && (
                    <div 
                      onClick={() => setCCOpen(!ccOpen)}
                      style={{ color: theme.text.primary }}
                    >
                      Cc
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between w-full border-b-[0.05rem] pb-2 justify-center">
            <input
              type={"text"}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="bg-transparent focus:outline-none w-full"
              style={inputStyle}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <RichTextEditor
              value={message}
              onChange={setMessage}
              theme={theme}
              placeholder="Write your message..."
            />
          </div>
        </div>
        {resp == "There was an issue sending the email :(" && (
          <h2 className="text-red-700 p-2 w-full bg-red-100 my-2 rounded-md">
            {resp}
          </h2>
        )}

        <button
          type="submit"
          className="bg-accent-color rounded-full w-20 flex items-center justify-center p-2 justify-end text-white"
        >
          Send
        </button>
      </form>

      <style jsx global>{`
        input[type="email"], input[type="text"] {
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
          color: ${theme.text.primary} !important;
        }
        
        input[type="email"]::placeholder, input[type="text"]::placeholder {
          color: ${theme.text.secondary} !important;
        }
        
        input[type="email"]:focus, input[type="text"]:focus {
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        /* Chrome autofill styles */
        input[type="email"]:-webkit-autofill,
        input[type="email"]:-webkit-autofill:hover,
        input[type="email"]:-webkit-autofill:focus,
        input[type="email"]:-webkit-autofill:active,
        input[type="text"]:-webkit-autofill,
        input[type="text"]:-webkit-autofill:hover,
        input[type="text"]:-webkit-autofill:focus,
        input[type="text"]:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px transparent inset !important;
          -webkit-text-fill-color: ${theme.text.primary} !important;
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
        
        /* Firefox autofill styles */
        input[type="email"]:-moz-autofill,
        input[type="text"]:-moz-autofill {
          background: transparent !important;
          background-color: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        /* Safari autofill styles */
        input[type="email"]::-webkit-contacts-auto-fill-button,
        input[type="text"]::-webkit-contacts-auto-fill-button {
          display: none !important;
        }
        
        /* Edge autofill styles */
        input[type="email"]::-ms-clear,
        input[type="email"]::-ms-reveal,
        input[type="text"]::-ms-clear,
        input[type="text"]::-ms-reveal {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
