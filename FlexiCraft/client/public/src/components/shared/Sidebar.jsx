import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { LogOut,Settings,HelpCircle,LayoutDashboard,Briefcase, BookA,BarChartBig,Package,Layout } from 'lucide-react';
import scLogo from "../../assets/scLogo.png"

export default function Sidebar() {
  const navigate = useNavigate()
  const handleClick= (path)=>{
    navigate(path);
  }
	const {logout} = useAuth0()
	return (
		<div className="fixed z-10 bg-neutral-900 text-neutral-100 p-3 flex flex-col flex-shrink-0 min-h-screen">
			<div className="flex items-center flex-shrink-0">
        <img className="size-8" src={scLogo} alt="Logo" />
        <span className="text-xl tracking-tight font-semibold">FlexiCraft<span className="text-5xl tracking-tight bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">.</span></span>
      </div>
			<div className="py-8 flex flex-1 flex-col gap-4">
        <ul>
          <li><button onClick={() => handleClick('/dashboard')} className='flex flex-row lg:text-sm sm:text-md'><span><LayoutDashboard className='size-5 mr-2 mb-2'/></span>Dashboard</button></li>
          <li><button onClick={() => handleClick('/projects')} className='flex flex-row lg:text-sm sm:text-md'><span><Briefcase className='size-5 mr-2 mb-2'/></span>Projects</button></li>  
          <li><button onClick={() => handleClick('/documentations')} className='flex flex-row lg:text-sm sm:text-md'><span><BookA className='size-5 mr-2 mb-2'/></span>Documentations</button></li>
          <li><button onClick={() => handleClick('/analytics')} className='flex flex-row lg:text-sm sm:text-md'><span><BarChartBig className='size-5 mr-2 mb-2'/></span>Analytics</button></li>   
          <li><button onClick={() => handleClick('/assetlibrary')} className='flex flex-row lg:text-sm sm:text-md'><span><Package className='size-5 mr-2 mb-2'/></span>Assest Library</button></li>
          <li><button onClick={() => handleClick('/componentslibrary')} className='flex flex-row lg:text-sm sm:text-md'><span><Layout className='size-5 mr-2 mb-2'/></span>Components Library</button></li>      
        </ul>
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        <ul>
          <li><button onClick={() => handleClick('/settings')} className='flex flex-row lg:text-lg sm:text-md'><span><Settings className='size-6 mr-2 mb-2'/></span>Settings</button></li>
          <li><button onClick={() => handleClick('/helpandsupport')} className='flex flex-row lg:text-lg sm:text-md'><span><HelpCircle className='size-6 mr-2 mb-2'/></span>Help & Support</button></li>       
          <li>
            <button 
              onClick={()=>logout({returnTo:window.location.origin})}
              className='flex flex-row text-lg'
            >
              <span className="lg:text-lg sm:text-md">
                <LogOut className='size-6 mr-2 mb-2'/>
              </span>
              Logout
            </button>
          </li>
        </ul>
			</div>
		</div>
	)
}

