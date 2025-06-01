"use client";
import { useState } from "react";
import axios from "axios";

export default function Mailer({ isExpand, setIsExpand, setIsOpen, isOpen }) {
  const [email, setEmail] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [resp, setResp] = useState();
  const [isMinimize, setMinimize] = useState(false);
  const handleContact = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/mailer", {
        email,
        subject,
        message,
        cc,
        bcc,
      });

      // Assuming the response status is in the form of a standard HTTP status code
      if (response.status === 200) {
        setResp("Email sent successfuly! I'll get to you in bit.");
        setTimeout(() => {
          setIsOpen(false);
          setResp("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setResp("There was an issue sending the email :(");

      setTimeout(() => {
        setResp("");
      }, 2000);
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
      className={` font-ropaSans bg-white w-4/5 h-4/5 ${
        isMinimize
          ? "md:w-[25rem]"
          : `${isExpand ? "md:w-4/5 md:h-4/5" : "md:w-[35rem] md:h-[35rem]"} `
      } rounded-t-xl flex flex-col font-light`}
    >
      {resp == "Email sent successfuly! I'll get to you in bit." && <Notif />}
      <div className="rounded-t-xl text-sm font-semibold text-white flex flex-row w-full bg-[#736B90] h-10 items-center justify-between p-2">
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
          <div className="flex flex-col w-full border-b-[0.05rem] ">
            <div className="flex flex-row justify-between w-full ">
              <div className="flex flex-row gap-x-2 py-2 w-full">
                <h2>From</h2>
                <input
                  type={"email"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="bg-transparent focus:outline-none text-[#736B90] placeholder-[#736B90] w-full"
                />
              </div>
              <div className="flex flex-row gap-x-2 cursor-pointer py-2 justify-center">
                {ccOpen || bccOpen || (
                  <>
                    <div onClick={() => setCCOpen(!ccOpen)}>Cc</div>
                    <div onClick={() => setBCCOpen(!bccOpen)}>Bcc</div>
                  </>
                )}
              </div>
            </div>
            {ccOpen && (
              <div className="flex flex-row justify-between w-full ">
                <div className="flex flex-row gap-x-2 py-2 w-full">
                  <h2>Cc</h2>
                  <input
                    type={"email"}
                    required
                    value={cc}
                    onChange={(e) => setCC(e.target.value)}
                    placeholder="Cc Email"
                    className="bg-transparent focus:outline-none text-[#736B90] placeholder-[#736B90] w-full"
                  />
                </div>
                <div className="flex flex-row gap-x-2 cursor-pointer py-2 justify-center">
                  {!bccOpen && (
                    <div onClick={() => setBCCOpen(!bccOpen)}>Bcc</div>
                  )}
                </div>
              </div>
            )}

            {bccOpen && (
              <div className="flex flex-row justify-between w-full ">
                <div className="flex flex-row gap-x-2 py-2 w-full">
                  <h2>Bcc</h2>
                  <input
                    type={"email"}
                    required
                    value={bcc}
                    onChange={(e) => setBCC(e.target.value)}
                    placeholder="Bcc Email"
                    className="bg-transparent focus:outline-none text-[#736B90] placeholder-[#736B90] w-full"
                  />
                </div>
                <div className="flex flex-row gap-x-2 cursor-pointer py-2 justify-center">
                  {!ccOpen && <div onClick={() => setCCOpen(!ccOpen)}>Cc</div>}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between w-full  border-b-[0.05rem] pb-2 justify-center">
            <input
              type={"text"}
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="bg-transparent focus:outline-none placeholder-[#736B90] w-full"
            />
          </div>

          <textarea
            className="w-full h-full bg-transparent focus:outline-none text-dark-purple-200 f"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
    </div>
  );
}
