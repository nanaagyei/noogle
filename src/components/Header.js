"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

export default function Header({ setShowMailer }) {
  const { theme } = useTheme();
  const path = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [linkMenu, setLinkMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [textCopy, setIsCopy] = useState(false);
  const menuRef = useRef(null);
  const linkRef = useRef(null);
  const profileRef = useRef(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const displayQuery = query ? query : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("prince.agyei.tuffour@gmail.com");
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 4000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const externalLinks = [
    { text: "code :3", icon: "github.svg", url: "https://github.com/nanaagyei" },
    {
      text: "stalk",
      icon: "x.svg",
      url: "https://x.com/tkay_jnr",
    },
    {
      text: "connect",
      icon: "linkedin.svg",
      url: "https://www.linkedin.com/in/prince-agyei-tuffour/",
    },
    {
      text: "designs",
      icon: "figma.svg",
      url: "https://www.figma.com/proto/pTxckVdMWIXy0af6hIZlGJ/Wintima?node-id=5-16&scaling=scale-down-width&page-id=0:1&starting-point-node-id=5:16&hotspot-hints=0&hide-ui=1",
    },
    {
      text: "articles",
      icon: "articles.svg",
      url: "https://medium.com/@tuffourp",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if the click is outside the menu, but not inside the linkRef or profileRef
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !linkRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setShowMenu(false);
        setProfileMenu(false);
        setLinkMenu(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("click", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`flex   ${
        path !== "/" ? "flex-col-reverse " : "flex-row"
      } gap-y-2 w-full md:flex-row justify-between items-center font-ropaSans p-4 ${
        (path !== "/" && "pt-8") || "pl-10"
      }  md:pl-16 relative`}
      style={{ color: theme.text.secondary }}
    >
      <div
        style={{ zIndex: 40 }}
        className={`flex ${
          path !== "/" ? "flex-col" : "flex-row"
        } w-full md:flex-row gap-x-5 items-center`}
      >
        {(path !== "/" && (
          <Link 
            href="/" 
            className="text-2xl hidden md:block hover:opacity-70 transform transition-all duration-300"
            style={{ color: theme.text.primary }}
          >
            (N)oogle
          </Link>
        )) || (
          <Link
            href="/about"
            className="cursor-pointer hover:opacity-70 transform transition-all duration-300"
            style={{ color: theme.text.secondary }}
          >
            About
          </Link>
        )}

        {path !== "/" && <SearchBar query={displayQuery} />}
      </div>

      <div className="flex flex-row items-center justify-center gap-x-5">
        {path !== "/" && (
          <Link 
            href="/" 
            className="text-2xl block md:hidden hover:opacity-70 transform transition-all duration-300"
            style={{ color: theme.text.primary }}
          >
            (N)oogle
          </Link>
        )}
        <div
          className="cursor-pointer hover:opacity-70 transform transition-all duration-300"
          onClick={() => setShowMailer(true)}
          style={{ color: theme.text.secondary }}
        >
          Gmail
        </div>

        <ThemeToggle />

                  <div
            onClick={() => {
              setLinkMenu(!linkMenu);
              profileMenu ? setShowMenu(true) : setShowMenu(!showMenu);
              setProfileMenu(false);
            }} // Toggle onClick
            className="w-10 h-10 flex items-center justify-center rounded-full transform transition-all duration-300"
            style={{
              backgroundColor: linkMenu 
                ? `${theme.text.primary}20` 
                : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (!linkMenu) {
                e.target.style.backgroundColor = `${theme.text.primary}10`;
              }
            }}
            onMouseLeave={(e) => {
              if (!linkMenu) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
            ref={linkRef}
          >
          <div
            className="bg-no-repeat w-6 h-6 bg-cover cursor-pointer"
            style={{ backgroundImage: "url(icons/menu.svg)" }}
          />
        </div>

        <div
          style={{ backgroundImage: "url(head-shot.png)" }}
          onClick={() => {
            setProfileMenu(!profileMenu);
            linkMenu ? setShowMenu(true) : setShowMenu(!showMenu);
            setLinkMenu(false);
          }}
          ref={profileRef}
          className="rounded-full bg-no-repeat bg-cover w-8 h-8 cursor-pointer"
        />

        {showMenu && (
          <div
            ref={menuRef}
            style={{ 
              zIndex: 90,
              backgroundColor: theme.bg.card,
              border: `4px solid ${theme.border.secondary}`,
              boxShadow: `0 20px 25px -5px ${theme.shadow}, 0 10px 10px -5px ${theme.shadow}`
            }}
            className={`absolute ${
              (linkMenu &&
                `grid grid-cols-3 right-5 ${
                  path !== "/"
                    ? "-bottom-[12rem] md:-bottom-[16.5rem]"
                    : "-bottom-[16.5rem]"
                }`) ||
              (profileMenu &&
                `flex flex-col right-5 ${
                  path !== "/"
                    ? "-bottom-[20.5rem] md:-bottom-[24.5rem]"
                    : " -bottom-[24.5rem]"
                }`)
            } rounded-[1.5rem] p-6 gap-6`}
          >
            {linkMenu &&
              externalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  target="_blank"
                  className="flex flex-col items-center px-4 py-2 rounded-lg transform transition ease-out duration-200"
                  style={{ color: theme.text.secondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.text.primary}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    className={`bg-no-repeat bg-cover w-12 h-12 ${
                      (link.icon === 'articles.svg' || link.icon === 'x.svg') 
                        ? 'rounded-lg' 
                        : ''
                    }`}
                    style={{ 
                      backgroundImage: `url(icons/${link.icon})`,
                      backgroundColor: (link.icon === 'articles.svg' || link.icon === 'x.svg') 
                        ? '#1a1a1a' 
                        : 'transparent',
                      padding: (link.icon === 'articles.svg' || link.icon === 'x.svg') 
                        ? '8px' 
                        : '0'
                    }}
                  />
                  <h2>{link.text}</h2>
                </Link>
              ))}

            {profileMenu && (
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full gap-x-10 justify-end">
                  <div className="flex flex-row">
                    <h2 style={{ color: theme.text.secondary }}>prince.agyei.tuffour@gmail.com</h2>
                    <div
                      className="bg-no-repeat bg-cover w-5 h-5 cursor-pointer"
                      onClick={handleCopy}
                      style={{
                        backgroundImage: textCopy
                          ? "url(icons/copy-filled.svg)"
                          : "url(icons/copy.svg)",
                      }}
                    />
                  </div>
                  <div
                    className="bg-no-repeat bg-cover w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setProfileMenu(!profileMenu);
                      setShowMenu(!showMenu);
                      setLinkMenu(false);
                    }}
                    style={{ backgroundImage: "url(icons/exit.svg)" }}
                  />
                </div>
                <div className="flex flex-row w-full">
                  <h2
                    className={`${
                      textCopy ? "visible" : "invisible"
                    } text-xs text-center w-full mb-4`}
                    style={{ color: theme.text.accent }}
                  >
                    email copied successfully!
                  </h2>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div
                    style={{ backgroundImage: "url(head-shot.png)" }}
                    className="rounded-full bg-no-repeat bg-cover w-24 h-24 cursor-pointer"
                  />
                  <h2 className="text-xl" style={{ color: theme.text.primary }}>Hi, I'm Prince (Nana)</h2>
                </div>
                <div className="flex flex-col font-ropaSans-light text-md gap-y-5">
                  <h2 className="text-center" style={{ color: theme.text.secondary }}>
                    Welcome to my personal website! 
                  </h2>

                  <div className="flex flex-col">
                    {" "}
                    <h2 className="text-sm" style={{ color: theme.text.primary }}>HOW TO USE</h2>
                    <h2 style={{ color: theme.text.secondary }}>
                      Explore my projects and journey using{" "}
                      <span className="italic" style={{ color: theme.text.primary }}>Search </span>
                    </h2>
                    <h2 style={{ color: theme.text.secondary }}>
                      Send me a message using{" "}
                      <span className="italic" style={{ color: theme.text.primary }}>Gmail</span>{" "}
                    </h2>
                    <h2 style={{ color: theme.text.secondary }}>
                      View more of my work using the{" "}
                      <span className="italic" style={{ color: theme.text.primary }}>Dot-Menu</span>
                    </h2>
                    <h2 className="flex flex-row gap-x-1 items-center" style={{ color: theme.text.secondary }}>
                      Book a call using{" "}
                      <span className="italic flex inline-flex self-center" style={{ color: theme.text.primary }}>
                        <div
                          className="bg-no-repeat w-5 h-5 bg-cover"
                          style={{
                            backgroundImage: "url(icons/calendar.svg)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
