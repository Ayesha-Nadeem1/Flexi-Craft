import React, { useState } from "react";
import WithLayout_User from "../shared/Layout";
import { dashboardMainItems } from "../../constants";

function Dashboard() {
  return (
    <div className="">
      <div className="flex-1 p-8 mt-[50px] ml-[180px]">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardMainItems.map((item, index) => (
            <div key={index} className="bg-neutral-800 p-6 shadow-lg rounded-lg hover:shadow-neutral-600 transition duration-300">
              <div className="flex items-center space-x-4 mb-4">
                {item.icon}
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                  {item.heading}
                </h2>
              </div>
              <p>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WithLayout_User(Dashboard);
//export default Dashboard
