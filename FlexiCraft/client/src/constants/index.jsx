import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import {
  FaTools,
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaCogs,
} from "react-icons/fa";

export const navItems = [
  { label: "Features" },
  { label: "Workflow" },
  { label: "Pricing" },
  { label: "Testimonials" },
];

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Drag-and-Drop Interface",
    description:
      "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Compatibility",
    description:
      "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
  },
  {
    icon: <ShieldHalf />,
    text: "Built-in Templates",
    description:
      "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];

export const dashboardMainItems = [
  {
    icon: <FaTools className="text-purple-600 text-3xl" />,
    heading: "Components Library",
    description:
      "Browse and customize a wide range of pre-built components for your website.",
  },
  {
    icon: <FaUsers className="text-purple-600 text-3xl" />,
    heading: "Collaboration Tools",
    description:
      "Work together in real-time with your team, enhancing productivity.",
  },
  {
    icon: <FaCogs className="text-purple-600 text-3xl" />,
    heading: "SEO Optimization",
    description:
      "Optimize your website’s performance on search engines with our tools.",
  },
  {
    icon: <FaChartLine className="text-purple-600 text-3xl" />,
    heading: "Analytics",
    description:
      "Access comprehensive analytics to monitor your website's performance.",
  },
  // {
  //   icon: <FaFileAlt className="text-purple-600 text-3xl" />,
  //   heading: "Documentation Generator",
  //   description:
  //     "Generate LaTeX and PDF documentation for your projects with ease.",
  // },
];

export const headers = [
  {
    "id": 1,
    name: 'Header 1',
    "html": `
      <header class="site-header-1">
        <div class="wrapper site-header__wrapper-1">
          <a href="#" class="brand-1">Brand</a>
          <nav class="nav-1">
            <button class="nav__toggle-1" aria-expanded="false" type="button">
              menu
            </button>
            <ul class="nav__wrapper-1">
              <li class="nav__item-1"><a href="#">Home</a></li>
              <li class="nav__item-1"><a href="#">About</a></li>
              <li class="nav__item-1"><a href="#">Services</a></li>
              <li class="nav__item-1"><a href="#">Hire us</a></li>
              <li class="nav__item-1"><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>`,
    "css": `
      .brand-1 {
        font-weight: bold;
        font-size: 20px;
      }
  
      .site-header-1 {
        
        background-color: #def7ff;
      }
  
      .site-header__wrapper-1 {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
  
      @media (min-width: 600px) {
        .site-header__wrapper-1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0;
          padding-bottom: 0;
        }
      }
  
      @media (min-width: 600px) {
        .nav__wrapper-1 {
          display: flex;
        }
      }
  
      @media (max-width: 599px) {
        .nav__wrapper-1 {
          position: absolute;
          top: 100%;
          right: 0;
          left: 0;
          z-index: -1;
          background-color: #d9f0f7;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-100%);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        .nav__wrapper-1.active {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .nav__item-1 a {
        display: block;
        padding: 1.5rem 1rem;
      }
  
      .nav__toggle-1 {
        display: none;
      }
  
      @media (max-width: 599px) {
        .nav__toggle-1 {
          display: block;
          position: absolute;
          right: 1rem;
          top: 1rem;
        }
      }
    `
  },
  
  {
    "id": 2,
    name: 'Header 2',
    "html": `
  <header class="site-header-2">
    <div class="wrapper site-header__wrapper-2">
      <nav class="nav-2">
        <button class="nav__toggle-2" aria-expanded="false" type="button">
          menu
        </button>
        <ul class="nav__wrapper-2" style="display: flex; justify-content: space-between; align-items: center;">
          <li class="nav__item-2"><a href="#">Home</a></li>
          <li class="nav__item-2"><a href="#">About</a></li>
          <li class="nav__item-2"><a href="#" class="brand-2" style="padding-top: 21px;">Brand</a></li>
          <li class="nav__item-2"><a href="#">Hire us</a></li>
          <li class="nav__item-2"><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>`,
    "css": `
      .brand-2 {
        font-weight: bold;
        font-size: 20px;
      }
  
      .site-header-2 {

        background-color: #def7ff;
      }
  
      .site-header__wrapper-2 {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
  
      @media (min-width: 600px) {
        .site-header__wrapper-2 {
          display: flex;
          align-items: center;
          padding-top: 0;
          padding-bottom: 0;
        }
      }
  
      .nav-2 {
        flex: 1;
      }
  
      @media (min-width: 600px) {
        .nav__wrapper-2 {
          display: flex;
        }
      }
  
      @media (max-width: 599px) {
        .nav__wrapper-2 {
          position: absolute;
          top: 100%;
          right: 0;
          left: 0;
          z-index: -1;
          background-color: #d9f0f7;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-100%);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        .nav__wrapper-2.active {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .nav__item-2 a {
        display: block;
        padding: 1.5rem 1rem;
      }
  
      .nav__toggle-2 {
        display: none;
      }
  
      @media (max-width: 599px) {
        .nav__toggle-2 {
          display: block;
          position: absolute;
          right: 1rem;
          top: 1rem;
        }
      }
    `
  },
  {
    "id": 3,
    name: 'Header 3',
    "html": `
      <header class="site-header-3">
        <div class="wrapper site-header__wrapper-3">
          <div class="site-header__start-3">
            <a href="#" class="brand-3">Brand</a>
          </div>
          <div class="site-header__end-3">
            <nav class="nav-3">
              <button class="nav__toggle-3" aria-expanded="false" type="button">
                menu
              </button>
              <ul class="nav__wrapper-3">
                <li class="nav__item-3"><a href="#">Home</a></li>
                <li class="nav__item-3"><a href="#">About</a></li>
                <li class="nav__item-3"><a href="#">Services</a></li>
                <li class="nav__item-3"><a href="#">Hire us</a></li>
                <li class="nav__item-3"><a href="#">Contact</a></li>
              </ul>
            </nav>
            <div class="search-3">
              <button class="search__toggle-3" aria-label="Open search">
                Search
              </button>
              <form class="search__form-3" action="">
                <label class="sr-only" for="search-3">Search</label>
                <input
                  type="search"
                  name=""
                  id="search-3"
                  placeholder="What's on your mind?"
                />
              </form>
            </div>
          </div>
        </div>
      </header>`,
    "css": `
      .brand-3 {
        font-weight: bold;
        font-size: 20px;
      }
  
      .site-header-3 {
        
        background-color: #def7ff;
      }
  
      .site-header__start-3,
      .site-header__end-3 {
        display: flex;
        align-items: center;
      }
  
      .site-header__wrapper-3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
  
      @media (min-width: 800px) {
        .site-header__wrapper-3 {
          padding-top: 0;
          padding-bottom: 0;
        }
      }
  
      @media (min-width: 800px) {
        .nav__wrapper-3 {
          display: flex;
        }
      }
  
      @media (max-width: 799px) {
        .nav__wrapper-3 {
          position: absolute;
          top: 100%;
          right: 0;
          left: 0;
          z-index: -1;
          background-color: #d9f0f7;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-100%);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        .nav__wrapper-3.active {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .nav__item-3 a {
        display: block;
        padding: 1.5rem 1rem;
      }
  
      .nav__toggle-3 {
        display: none;
      }
  
      @media (max-width: 799px) {
        .nav__toggle-3 {
          display: block;
          position: absolute;
          right: 1rem;
          top: 1rem;
        }
      }
  
      .search-3 {
        display: flex;
        align-items: center;
      }
  
      .search__toggle-3 {
        appearance: none;
        order: 1;
        font-size: 0;
        width: 34px;
        height: 34px;
        background: url('https://cdn-icons-png.flaticon.com/512/54/54481.png') center right/22px no-repeat;
        border: 0;
      }
  
      @media (min-width: 800px) {
        .search__toggle-3 {
          border-left: 1px solid #979797;
          padding-left: 10px;
        }
      }
  
      @media (max-width: 799px) {
        .search__toggle-3 {
          position: absolute;
          right: 5.5rem;
          top: 0.65rem;
          background: url('https://cdn-icons-png.flaticon.com/512/54/54481.png') center right/22px no-repeat;
        }
      }
  
      .search__form-3 {
        display: none;
      }
      .search__form-3.active {
        display: block;
      }
      @media (max-width: 799px) {
        .search__form-3 {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          background-color: red;
        }
        .search__form-3 input {
          width: 100%;
        }
      }
  
      .search__form-3 input {
        min-width: 200px;
        appearance: none;
        border: 0;
        background-color: #fff;
        border-radius: 0;
        font-size: 16px;
        padding: 0.5rem;
      }
      @media (max-width: 799px) {
        .search__form-3 input {
          border-bottom: 1px solid #979797;
        }
      }
    `,
    "js": `
      let navToggle = document.querySelector(".nav__toggle-3");
      let navWrapper = document.querySelector(".nav__wrapper-3");
  
      navToggle.addEventListener("click", function () {
        if (navWrapper.classList.contains("active")) {
          this.setAttribute("aria-expanded", "false");
          this.setAttribute("aria-label", "menu");
          navWrapper.classList.remove("active");
        } else {
          navWrapper.classList.add("active");
          this.setAttribute("aria-label", "close menu");
          this.setAttribute("aria-expanded", "true");
          searchForm.classList.remove("active");
        }
      });
  
      let searchToggle = document.querySelector(".search__toggle-3");
      let searchForm = document.querySelector(".search__form-3");
  
      searchToggle.addEventListener("click", showSearch);
  
      function showSearch() {
        searchForm.classList.toggle("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "menu");
        navWrapper.classList.remove("active");
      }
    `
  },
  
  {
    id:4,
    name: 'Header 4',
    html:`    <header class="site-header">
      <div class="wrapper site-header__wrapper">
        <div class="site-header__start">
          <a href="#" class="brand">Brand</a>
          <div class="search">
            <button class="search__toggle" aria-label="Open search">
              Search
            </button>
            <form class="search__form" action="">
              <label class="sr-only" for="search">Search</label>
              <input
                type="search"
                name=""
                id="search"
                placeholder="What's on your mind?"
              />
            </form>
          </div>
        </div>
        <div class="site-header__end">
          <nav class="nav">
            <button class="nav__toggle" aria-expanded="false" type="button">
              menu
            </button>
            <ul class="nav__wrapper">
              <li class="nav__item active">
                <a href="#">
                  <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    x="0"
                    y="0"
                    preserveAspectRatio="xMinYMin meet"
                    class="nav-icon"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22,9.45,12.85,3.26A1.52,1.52,0,0,0,12,3a1.49,1.49,0,0,0-.84.26L2,9.45,3.06,11,4,10.37V20a1,1,0,0,0,1,1h5V16h4v5h5a1,1,0,0,0,1-1V10.37l.94.63Z"
                      class="active-item"
                      style="fill-opacity: 1"
                    ></path>
                    <path
                      d="M22,9.45L12.85,3.26a1.5,1.5,0,0,0-1.69,0L2,9.45,3.06,11,4,10.37V20a1,1,0,0,0,1,1h6V16h2v5h6a1,1,0,0,0,1-1V10.37L20.94,11ZM18,19H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v4H6V8.89l6-4,6,4V19Z"
                      class="inactive-item"
                      style="fill: currentColor"
                    ></path>
                  </svg>
                  <span>Home</span>
                </a>
              </li>
              <li class="nav__item">
                <a href="#">
                  <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    x="0"
                    y="0"
                    preserveAspectRatio="xMinYMin meet"
                    class="nav-icon"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16,17.85V20a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V17.85a4,4,0,0,1,2.55-3.73l2.95-1.2V11.71l-0.73-1.3A6,6,0,0,1,4,7.47V6a4,4,0,0,1,4.39-4A4.12,4.12,0,0,1,12,6.21V7.47a6,6,0,0,1-.77,2.94l-0.73,1.3v1.21l2.95,1.2A4,4,0,0,1,16,17.85Zm4.75-3.65L19,13.53v-1a6,6,0,0,0,1-3.31V9a3,3,0,0,0-6,0V9.18a6,6,0,0,0,.61,2.58A3.61,3.61,0,0,0,16,13a3.62,3.62,0,0,1,2,3.24V21h4a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.75,14.2Z"
                      class="inactive-item"
                      style="fill-opacity: 1"
                    ></path>
                    <path
                      d="M20.74,14.2L19,13.54V12.86l0.25-.41A5,5,0,0,0,20,9.82V9a3,3,0,0,0-6,0V9.82a5,5,0,0,0,.75,2.63L15,12.86v0.68l-1,.37a4,4,0,0,0-.58-0.28l-2.45-1V10.83A8,8,0,0,0,12,7V6A4,4,0,0,0,4,6V7a8,8,0,0,0,1,3.86v1.84l-2.45,1A4,4,0,0,0,0,17.35V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.74,14.2ZM16,8.75a1,1,0,0,1,2,0v1.44a3,3,0,0,1-.38,1.46l-0.33.6a0.25,0.25,0,0,1-.22.13H16.93a0.25,0.25,0,0,1-.22-0.13l-0.33-.6A3,3,0,0,1,16,10.19V8.75ZM6,5.85a2,2,0,0,1,4,0V7.28a6,6,0,0,1-.71,2.83L9,10.72a1,1,0,0,1-.88.53H7.92A1,1,0,0,1,7,10.72l-0.33-.61A6,6,0,0,1,6,7.28V5.85ZM14,19H2V17.25a2,2,0,0,1,1.26-1.86L7,13.92v-1a3,3,0,0,0,1,.18H8a3,3,0,0,0,1-.18v1l3.72,1.42A2,2,0,0,1,14,17.21V19Zm7,0H16V17.35a4,4,0,0,0-.55-2l1.05-.4V14.07a2,2,0,0,0,.4.05h0.2a2,2,0,0,0,.4-0.05v0.88l2.53,1a1.5,1.5,0,0,1,1,1.4V19Z"
                      class="active-item"
                      style="fill: currentColor"
                    ></path>
                  </svg>
                  <span>My Network</span>
                </a>
              </li>
              <li class="nav__item">
                <a href="#">
                  <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    x="0"
                    y="0"
                    preserveAspectRatio="xMinYMin meet"
                    class="nav-icon"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2,13H22v6a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V13ZM22,8v4H2V8A1,1,0,0,1,3,7H7V6a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V7h4A1,1,0,0,1,22,8ZM15,6a1,1,0,0,0-1-1H10A1,1,0,0,0,9,6V7h6V6Z"
                      class="inactive-item"
                      style="fill-opacity: 1"
                    ></path>
                    <path
                      d="M21,7H17V6a3,3,0,0,0-3-3H10A3,3,0,0,0,7,6V7H3A1,1,0,0,0,2,8V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8A1,1,0,0,0,21,7ZM9,6a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V7H9V6ZM20,18H4V13H20v5Zm0-6H4V9H20v3Z"
                      class="active-item"
                      style="fill: currentColor"
                    ></path>
                  </svg>
                  <span>Jobs</span>
                </a>
              </li>
              <li class="nav__item">
                <a href="#">
                  <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    x="0"
                    y="0"
                    preserveAspectRatio="xMinYMin meet"
                    class="nav-icon"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21,8H8A1,1,0,0,0,7,9V19a1,1,0,0,0,1,1H18l4,3V9A1,1,0,0,0,21,8Zm-4,8H12V15h5Zm1-3H11V12h7ZM17,4V6H6A1,1,0,0,0,5,7v8H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3H16A1,1,0,0,1,17,4Z"
                      class="inactive-item"
                      style="fill-opacity: 1"
                    ></path>
                    <path
                      d="M21,8H8A1,1,0,0,0,7,9V19a1,1,0,0,0,1,1H18l4,3V9A1,1,0,0,0,21,8ZM20,19.11L18.52,18H9V10H20v9.11ZM12,15h5v1H12V15ZM4,13H5v2H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3H16a1,1,0,0,1,1,1V6H15V5H4v8Zm14,0H11V12h7v1Z"
                      class="active-item"
                      style="fill: currentColor"
                    ></path>
                  </svg>
                  <span>Messaging</span>
                </a>
              </li>
              <li class="nav__item">
                <a href="#">
                  <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    x="0"
                    y="0"
                    preserveAspectRatio="xMinYMin meet"
                    class="nav-icon"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.94,14H5.06L5.79,8.44A6.26,6.26,0,0,1,12,3h0a6.26,6.26,0,0,1,6.21,5.44Zm2,5-1.71-4H4.78L3.06,19a0.71,0.71,0,0,0-.06.28,0.75,0.75,0,0,0,.75.76H10a2,2,0,1,0,4,0h6.27A0.74,0.74,0,0,0,20.94,19Z"
                      class="inactive-item"
                      style="fill-opacity: 1"
                    ></path>
                    <path
                      d="M20.94,19L19,14.49s-0.41-3.06-.8-6.06A6.26,6.26,0,0,0,12,3h0A6.26,6.26,0,0,0,5.79,8.44L5,14.49,3.06,19a0.71,0.71,0,0,0-.06.28,0.75,0.75,0,0,0,.75.76H10a2,2,0,1,0,4,0h6.27A0.74,0.74,0,0,0,20.94,19ZM12,4.75h0a4.39,4.39,0,0,1,4.35,3.81c0.28,2.1.56,4.35,0.7,5.44H7L7.65,8.56A4.39,4.39,0,0,1,12,4.75ZM5.52,18l1.3-3H17.18l1.3,3h-13Z"
                      class="active-item"
                      style="fill: currentColor"
                    ></path>
                  </svg>
                  <span>Notifications</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>`,
    css:`
.brand {
  font-weight: bold;
  font-size: 20px; }

.site-header {
  background-color: #def7ff; }

.site-header__start {
  display: flex;
  align-items: center; }

.site-header__end {
  display: flex;
  align-items: center; }

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem; }
  @media (min-width: 800px) {
    .site-header__wrapper {
      padding-top: 0;
      padding-bottom: 0; } }
@media (min-width: 800px) {
  .nav__wrapper {
    display: flex; } }

@media (max-width: 799px) {
  .nav__wrapper {
    position: absolute;
    top: calc(100% + 35px);
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out; }
    .nav__wrapper.active {
      visibility: visible;
      opacity: 1;
      transform: translateY(0); } }

.nav__item:not(:last-child) {
  margin-right: 0.5rem; }

.nav__item a {
  display: block;
  padding: 1rem;
  border-left: 4px solid transparent; }
  @media (min-width: 800px) {
    .nav__item a {
      text-align: center;
      border-left: 0;
      border-bottom: 4px solid transparent; } }
.nav__item svg {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin-right: 1rem; }
  @media (min-width: 800px) {
    .nav__item svg {
      display: block;
      margin: 0 auto 0.5rem; } }
.nav__item.active a {
  border-left-color: #222; }
  @media (min-width: 800px) {
    .nav__item.active a {
      border-bottom-color: #222; } }
.nav__toggle {
  display: none; }
  @media (max-width: 799px) {
    .nav__toggle {
      display: block;
      position: absolute;
      right: 1rem;
      top: 1rem; } }
.search {
  display: flex;
  margin-left: 1rem; }

.search__toggle {
  appearance: none;
  order: 1;
  font-size: 0;
  width: 34px;
  height: 34px;
  background: url('https://cdn-icons-png.flaticon.com/512/54/54481.png') center right/22px no-repeat;
  border: 0;
  display: none; }
  @media (min-width: 800px) {
    .search__toggle {
      border-left: 1px solid #979797;
      padding-left: 10px; } }
  @media (max-width: 799px) {
    .search__toggle {
      position: absolute;
      right: 5.5rem;
      top: 0.65rem;
      background: url('https://cdn-icons-png.flaticon.com/512/54/54481.png') center/22px no-repeat; } }
.search__form {
  display: block; }
  .search__form.active {
    display: block; }
  @media (max-width: 799px) {
    .search__form {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%; }
      .search__form input {
        width: 100%; } }
  .search__form input {
    min-width: 200px;
    appearance: none;
    border: 0;
    background-color: #fff;
    border-radius: 0;
    font-size: 16px;
    padding: 0.5rem; }
    @media (max-width: 799px) {
      .search__form input {
        border-bottom: 1px solid #979797; } }
.inactive-item {
  opacity: 0; }
`,
    js:`let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");
  } else {
    navWrapper.classList.add("active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
  }
});

let searchToggle = document.querySelector(".search__toggle");
let searchForm = document.querySelector(".search__form");

searchToggle.addEventListener("click", showSearch);

function showSearch() {
  searchForm.classList.toggle("active");
}
`
  },
  
  {
    id:5,
    name: 'Header 5',
    html:`<header class="site-header">
      <div class="site-header__top">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__start">
            <ul class="">
              <li class=""><a href="#">About</a></li>
              <li class=""><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="site-header__middle">
            <a href="#" class="brand">Brand</a>
          </div>
          <div class="site-header__end top">
            <a href="#">Login</a>
            <a href="#" class="button" style="background-color:#007bff; color: white;padding: 5px 10px; border-radius: 8px;">Some action</a>
          </div>
        </div>
      </div>
      <div class="site-header__bottom">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__start">
            <nav class="nav">
              <button class="nav__toggle" aria-expanded="false" type="button">
                menu
              </button>
              <ul class="nav__wrapper">
                <li class="nav__item"><a href="#">Home</a></li>
                <li class="nav__item"><a href="#">About</a></li>
                <li class="nav__item"><a href="#">Services</a></li>
                <li class="nav__item"><a href="#">Hire us</a></li>
                <li class="nav__item"><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>

          <div class="site-header__end bottom">
            <div class="search">
              <button class="search__toggle" aria-label="Open search">
                Search
              </button>
              <form class="search__form" action="">
                <label class="sr-only" for="search">Search</label>
                <input
                  type="search"
                  name=""
                  id="search"
                  placeholder="What's on your mind?"
                />
              </form>
            </div>
            <a href="#" class="cart">
              <svg
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <title>Cart</title>
                  <path
                    d="m95.398 23.699c-1.8008-2.3008-4.6016-3.6992-7.5-3.6992h-60.898l-1.8984-7.3984c-1.1016-4.3008-4.8984-7.3008-9.3008-7.3008h-10.199c-1.6992 0-3.1016 1.3984-3.1016 3.1016 0 1.6992 1.3984 3.1016 3.1016 3.1016h10.199c1.5 0 2.8008 1 3.1992 2.5l12.199 48.602c1.1016 4.3008 4.8984 7.3008 9.3008 7.3008h39.898c4.3984 0 8.3008-3 9.3008-7.3008l7.5-30.801c0.69922-2.8047 0.10156-5.8047-1.8008-8.1055zm-4.2969 6.6992-7.5 30.801c-0.39844 1.5-1.6992 2.5-3.1992 2.5h-39.902c-1.5 0-2.8008-1-3.1992-2.5l-8.6992-34.898h59.301c1 0 2 0.5 2.6016 1.3008 0.59766 0.79688 0.89453 1.7969 0.59766 2.7969z"
                  />
                  <path
                    d="m42.602 73.898c-5.6992 0-10.398 4.6992-10.398 10.398s4.6992 10.398 10.398 10.398c5.6992 0.003907 10.398-4.6953 10.398-10.395s-4.6992-10.402-10.398-10.402zm0 14.5c-2.3008 0-4.1016-1.8008-4.1016-4.1016s1.8008-4.1016 4.1016-4.1016c2.3008 0 4.1016 1.8008 4.1016 4.1016-0.003906 2.2031-1.9023 4.1016-4.1016 4.1016z"
                  />
                  <path
                    d="m77 73.898c-5.6992 0-10.398 4.6992-10.398 10.398s4.6992 10.398 10.398 10.398 10.398-4.6992 10.398-10.398c-0.097657-5.6953-4.6992-10.398-10.398-10.398zm0 14.5c-2.3008 0-4.1016-1.8008-4.1016-4.1016s1.8008-4.1016 4.1016-4.1016 4.1016 1.8008 4.1016 4.1016c0 2.2031-1.9023 4.1016-4.1016 4.1016z"
                  />
                </g>
              </svg>
            </a>
            <a href="#">
              <svg
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Profile</title>
                <path
                  d="m65.57 52.5c6.9336-4.5078 11.574-11.797 12.723-19.988 1.1484-8.1875-1.3047-16.473-6.7344-22.715-5.4258-6.2422-13.289-9.8242-21.559-9.8242s-16.133 3.582-21.559 9.8242c-5.4297 6.2422-7.8828 14.527-6.7344 22.715 1.1484 8.1914 5.7891 15.48 12.723 19.988-10.012 3.2812-18.73 9.6406-24.914 18.172-6.1836 8.5273-9.5117 18.793-9.5156 29.328h7.1445c0-15.312 8.168-29.461 21.426-37.117 13.262-7.6523 29.598-7.6523 42.859 0 13.258 7.6562 21.426 21.805 21.426 37.117h7.1445c-0.003906-10.535-3.332-20.801-9.5156-29.328-6.1836-8.5312-14.902-14.891-24.914-18.172zm-37-23.93c0-5.6836 2.2578-11.133 6.2773-15.152 4.0195-4.0156 9.4688-6.2734 15.152-6.2734s11.133 2.2578 15.152 6.2734c4.0195 4.0195 6.2773 9.4688 6.2773 15.152 0 5.6836-2.2578 11.137-6.2773 15.152-4.0195 4.0195-9.4688 6.2773-15.152 6.2773s-11.133-2.2578-15.152-6.2773c-4.0195-4.0156-6.2773-9.4688-6.2773-15.152z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
`,
    css:`
.brand {
  font-weight: bold;
  font-size: 27px; }

.site-header__top {
  background-color: #def7ff; }
  .site-header__top ul {
    display: flex; }
  .site-header__top li:not(:last-child) {
    margin-right: 1.5rem; }
  .site-header__top .site-header__start {
    display: none; }

.site-header__bottom {

  background-color: #c7f2ff; }
  @media (max-width: 939px) {
    .site-header__bottom .site-header__end {
      order: -1; } }
.site-header__wrapper {
  display: flex;
  justify-content: space-between; }

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem; }
  @media (min-width: 940px) {
    .site-header__wrapper {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem; } }
.site-header__end {
  display: flex;
  align-items: center; }

.site-header__end.top > * + * {
  margin-left: 1.5rem; }

@media (min-width: 940px) {
  .site-header__end.bottom > *:not(:last-child) {
    margin-right: 1.5rem; } }

@media (max-width: 939px) {
  .site-header__end.bottom .cart {
    margin-right: 1.5rem; } }

@media (max-width: 939px) {
  .site-header__end.bottom .search {
    margin-left: 0; } }

.site-header__end.bottom svg {
  width: 22px;
  height: 22px; }

@media (min-width: 940px) {
  .nav__wrapper {
    display: flex; } }

@media (max-width: 939px) {
  .nav__wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out; }
    .nav__wrapper.active {
      visibility: visible;
      opacity: 1;
      transform: translateY(0); } }

.nav__item:not(:last-child) {
  margin-right: 1.5rem; }

.nav__item a {
  display: block;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem; }
  @media (max-width: 939px) {
    .nav__item a {
      padding: 1rem; } }
.nav__item svg {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin-right: 1rem; }
  @media (min-width: 940px) {
    .nav__item svg {
      display: block;
      margin: 0 auto 0.5rem; } }
.nav__item.active a {
  border-left-color: #222; }
  @media (min-width: 800px) {
    .nav__item.active a {
      border-bottom-color: #222; } }
.nav__toggle {
  position: absolute;
  right: 1rem;
  top: 1rem; }
  @media (min-width: 940px) {
    .nav__toggle {
      display: none; } }
.search {
  display: flex; }

.search__toggle {
  appearance: none;
  order: 1;
  font-size: 0;
  width: 34px;
  height: 34px;
  background: url('https://cdn-icons-png.flaticon.com/512/54/54481.png') center/22px no-repeat;
  border: 0; }
  @media (max-width: 939px) {
    .search__toggle {
      position: absolute;
      right: 5.5rem;
      top: 0.65rem; } }
  .search__toggle.active {
    background: url('https://cdn-icons-png.flaticon.com/512/54/54481.png') center/22px no-repeat; }

.search__form {
  display: none; }
  .search__form.active {
    display: block; }
  @media (max-width: 799px) {
    .search__form {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      background-color: red; }
      .search__form input {
        width: 100%; } }
  .search__form input {
    min-width: 200px;
    appearance: none;
    border: 0;
    background-color: #fff;
    border-radius: 0;
    font-size: 16px;
    padding: 0.5rem; }
    @media (max-width: 799px) {
      .search__form input {
        border-bottom: 1px solid #979797; } }
`,
    js:`let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");
  } else {
    navWrapper.classList.add("active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
    searchForm.classList.remove("active");
    searchToggle.classList.remove("active");
  }
});

let searchToggle = document.querySelector(".search__toggle");
let searchForm = document.querySelector(".search__form");

searchToggle.addEventListener("click", showSearch);

function showSearch() {
  searchForm.classList.toggle("active");
  searchToggle.classList.toggle("active");

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "menu");
  navWrapper.classList.remove("active");

  if (searchToggle.classList.contains("active")) {
    searchToggle.setAttribute("aria-label", "Close search");
  } else {
    searchToggle.setAttribute("aria-label", "Open search");
  }
}
`
  },
  
  
];
