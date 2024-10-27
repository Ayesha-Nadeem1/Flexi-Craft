import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from '../../components/pages/Dashboard'

const WithLayout_User = (ComponentsToBeWrapped)=>{
	return(props)=> (
		<div className="bg-neutral-100 w-screen flex flex-row overflow-hidden h-screen">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
          			<ComponentsToBeWrapped {...props}/>
				</div>
			</div>
		</div>
	)
}

export default WithLayout_User

// className="flex-1 p-4 min-h-0"