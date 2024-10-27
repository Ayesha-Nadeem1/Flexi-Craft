// import { Menu, X } from "lucide-react";
// import { useRef, useState,useContext } from "react";
// import sclogo from "../assets/scLogo.png";
// import { navItems } from "../constants";
// import { list } from "postcss";
// import { useAuth0 } from "@auth0/auth0-react";
// import { RefContext } from './RefContext';
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { featuresRef, workflowRef, pricingRef, testimonialsRef } = useContext(RefContext);
//   // const handleScrollToSection = (ref) => {
//   //   // console.log(ref)
//   //   // console.log(ref.current)
//   //   if (ref && ref.current) {
//   //     ref.current.scrollIntoView({ behavior: 'smooth' });
//   //   }
//   // };
//   const navigate = useNavigate();

//   const handleScrollToSection = (ref) => {
//     setTimeout(() => {
//       if (ref?.current) {
//         ref.current.scrollIntoView({ behavior: 'smooth' });
//       } else {
//         console.error('Ref is not set:', ref);
//       }
//     }, 0);
//   };

//   const getRefByLabel = (label) => {
//     switch (label) {
//       case 'Features':
//         return featuresRef;
//       case 'Workflow':
//         return workflowRef;
//       case 'Pricing':
//         return pricingRef;
//       case 'Testimonials':
//         return testimonialsRef;
//       default:
//         return null;
//     }
//   };

//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };
//   const { loginWithRedirect,isAuthenticated } = useAuth0();

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-slate-700">
//       <div className="container mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-10 w-10 " src={sclogo} alt="Logo" />
//             <span className="text-xl tracking-tight font-semibold">SiteCrafter<span className="text-5xl tracking-tight bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">.</span></span>
//           </div>
//           <ul className="hidden lg:flex ml-14 space-x-10">
//             {navItems.map((item,index)=>(
//               <li key={index}>
//                 <button onClick={()=>handleScrollToSection(getRefByLabel(item.label))}>{item.label}</button>
//               </li>
//             ))}
//           </ul>
//           <div className="hidden lg:flex justify-center space-x-12 items-center">
//             <button onClick={() => loginWithRedirect()} className="py-2 px-3 border rounded-md">
//               Sign In
//             </button>
//             <button
//               onClick={() => loginWithRedirect()}
//               className="bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 rounded-md"
//             >
//               Create an account
//             </button>
//             {isAuthenticated ?  navigate('/dashboard') :((''))

//             }
//           </div>
//           <div className="lg:hidden md:flex flex-col justify-end">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//             <ul>
//               {navItems.map((item,index)=>(
//                 <li key={index}>
//                   <button onClick={()=>handleScrollToSection(getRefByLabel(item.label))}>{item.label}</button>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-6">
//               <button className="py-2 px-3 border rounded-md">
//                 Sign In
//               </button>
//               <button
//                 className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-800"
//               >
//                 Create an account
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Menu, X } from "lucide-react";
import { useState } from "react";
import sclogo from "../assets/scLogo.png";
import { navItems } from "../constants";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-slate-700">
      <div className="container mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 " src={sclogo} alt="Logo" />
            <span className="text-xl tracking-tight font-semibold">FlexiCraft<span className="text-5xl tracking-tight bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">.</span></span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <button>{item.label}</button>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <button onClick={() => navigate('/login')} className="py-2 px-3 border rounded-md">
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 rounded-md"
            >
              Create an account
            </button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <button>{item.label}</button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <button onClick={() => navigate('/login')} className="py-2 px-3 border rounded-md">
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-800"
              >
                Create an account
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
