import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink} from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import PersonIcon from "@mui/icons-material/Person";

const NavContainer = styled.div`
  position: sticky;
  top:0; 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 100%;
  height: auto;
  min-height: 60px;
  max-height: 60px;
  font-weight: 500;
  font-size: 1.35em;
  margin: 0;
  padding: 2px 10% 0 10%;
  background-color: #fff;
  border-bottom: 3px solid;
  z-index:1;
  box-shadow: 0 0 25px 3px rgba(0,0,0,.1); 
  border-image: linear-gradient(
      to right,
      rgba(227, 230, 228, 1) 75%,
      rgba(227, 230, 228, 0.8) 25%
    )
    2;
   
`;

const NavLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: auto;

  a {
    color: ${(props) => props.theme.fontColor};
    margin: 0 1.5rem 0 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    transition: ease-in-out 250ms;

    &:hover {
      color: ${(props) => props.theme.secondary};
      border-bottom: 2px solid #f6773d;
    }
  }

  .nav-link {
    cursor: pointer;
  }

  .nav-menu-btn {
    display: none;
    position: fixed;
  }

  .isActive {
    color: ${(props) => props.theme.secondary};
    border-bottom: 2px solid #f6773d;
  }

  .unselected {
    color: ${(props) => props.theme.fontColor};
    border-bottom: 2px solid rgba(0, 0, 0, 0);
  }

  svg {
    color: ${(props) => props.theme.fontColor};
    cursor: pointer;
    font-size: 35px;

    &:hover {
      color: #f6773d;
    }
  }

  @media only screen and (max-width: 630px) {
    .nav-link {
      display: none;
      position: fixed;
    }

    .nav-menu-btn {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-self: center;
  justify-content: center;
  align-items: center;
  // flex -1;
  width: 150px;
  height: 100%;
  margin: 0 0 0 15px;

  svg {
    color: ${(props) => props.theme.fontColor};
    cursor: pointer;
    height: 35px;
    width: 35px;

    &:hover {
      color: #f6773d;
    }
  }

  a {
    color: ${(props) => props.theme.fontColor};
    margin: 0 0px 0 10px;
    // border-bottom: 2px solid rgba(0, 0, 0, 0);

    &:hover {
      color: ${(props) => props.theme.secondary};
      // border-bottom: 2px solid #f6773d;
    }
  }
`;

const SideBarNavContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: ${(props) => (props.sidebar ? "0" : "-250px")};
  margin: 0 0 0 ${(props) => (props.sidebar ? "0" : "15px")};
  width: 250px;
  // width: 50%;
  height: 100%;
  min-height: 100%;
  background-color: white;
  box-shadow: ${(props) => (props.sidebar ? "15px" : "0")} 15px 25px 8px
    rgba(0, 0, 0, 0.1);
  transition: ease-in-out left 350ms;
  z-index: 2;
  border-right: 15px solid;
  border-image: linear-gradient(
      to bottom,
      #ff773d 25%,
      #f19143 25%,
      #fabc3c 25%,
      #ffb238 25%
    )
    4;

  .close-sidebar {
    display: flex;
    justify-content: end;
    align-items: end;
    width: 100%;

    svg {
      color: ${(props) => props.theme.fontColor};
      cursor: pointer;
      height: 35px;
      width: 35px;

      &:hover {
        color: #f6773d;
      }
    }
  }

  .nav-link.sidebar {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: auto;
    min-height: 55px;
    max-height: 55px;
    cursor: pointer;
    padding: 15px;
    border-bottom: 2px solid none;
    border-top-bottom: 2px solid none;
    // background-color: red;
    color: ${(props) => props.theme.fontColor};
    font-size: 1.2em;

    &:hover {
      color: #f6773d;
      background-color: rgb(246, 119, 61, 0.1);
      border-bottom: 2px solid rgb(246, 119, 61, 0.4);
      border-top: 2px solid rgb(246, 119, 61, 0.4);
      color: ${(props) => props.theme.fontColor};

      svg {
        color: #f6773d;
      }
    }

    &:active {
      background-color: rgb(246, 119, 61, 0.05);
    }

    svg {
      color: ${(props) => props.theme.fontColor};
      height: 35px;
      width: auto;
      margin: 0px 10px 0 0;

      &:hover {
        color: #f6773d;
      }
    }
  }

  @media only screen and (max-width: 630px) {
    border-right: 5px solid;
    margin: 0 0 0px ${(props) => (props.sidebar ? "0" : "5px")};
  }
`;

const navData = [
  {
    title: "Intro",
    path: "/",
    scroll: "top",
    icon: <PersonIcon />,
    type: "scroll",
  },
  {
    title: "Projects",
    path: "/projects",
    scroll: "projects",
    icon: <ViewSidebarIcon />,
    type: "scroll",
  },
  // {
  //   title: "Sound Engineer",
  //   path: "/music",
  //   scroll: "",
  //   icon: <MusicNoteIcon />,
  //   type: "link",
  // },
];

const Nav = () => {
  const [sidebar, setSideBarStatus] = useState(false);
  const toggleSideBar = () => {
    setSideBarStatus(!sidebar);
  };

  const accessibilityScroll = (id) => {
    const section = document.querySelector(`#${id}`);
    section.scrollIntoView({behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SideBarNavContainer sidebar={sidebar}>
        <div className="close-sidebar">
          <CloseIcon
            onClick={() => toggleSideBar()}
            tabIndex="0"
            onKeyDown={(e) => {
              e.key === "Enter" ? toggleSideBar() : console.log();
            }}
          />
        </div>
        {navData.map((item, i) => {
          return item.type === "scroll" ? (
            <ScrollLink
              key={i}
              to={item.scroll}
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              onClick={() => toggleSideBar()}
              tabIndex="0"
              onKeyDown={(e) => {
                e.key === "Enter"
                  ? accessibilityScroll(item.scroll)
                  : console.log();
              }}
            >
              <div className="nav-link sidebar">
                {item.icon}
                {item.title}
              </div>
            </ScrollLink>
          ) : (
            <NavLink
              to={item.path}
              key={i}
              className={({ isActive }) =>
                !isActive ? "unselected" : "isActive"
              }
              onClick={() => toggleSideBar()}
            >
              <div className="nav-link sidebar">
                {item.icon}
                {item.title}
              </div>
            </NavLink>
          );
        })}
      </SideBarNavContainer>
      <NavContainer id="top-nav" sidebar={sidebar}>
        <NavLinkWrapper>
          <div className="nav-menu-btn">
            <MenuIcon
              onClick={() => toggleSideBar()}
              tabIndex="0"
              onKeyDown={(e) => {
                e.key === "Enter" && toggleSideBar();
              }}
            />
          </div>
          {navData.map((item, i) => {
            return item.type === "scroll" ? (
              <ScrollLink
                key={i}
                to={item.scroll}
                spy={true}
                smooth={true}
                offset={-100}
                duration={1000}
                tabIndex="0"
                onKeyDown={(e) => {
                  e.key === "Enter" && accessibilityScroll(item.scroll);
                }}
              >
                <div className="nav-link">{item.title}</div>
              </ScrollLink>
            ) : (
              <NavLink
                to={item.path}
                key={i}
                className={({ isActive }) =>
                  !isActive ? "unselected" : "isActive"
                }
              >
                <div className="nav-link">{item.title}</div>
              </NavLink>
            );
          })}
        </NavLinkWrapper>
        <Socials>
          <a
            href="https://github.com/JaredMabus?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/jaredmabusth"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </Socials>
      </NavContainer>
    </>
  );
};

export default Nav;
