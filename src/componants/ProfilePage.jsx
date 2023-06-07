import React from 'react';
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const ProfilePage = () => {
  let [userdetails , setUserDetails] = useState(null);
  let navigate=useNavigate();
    useEffect(()=>{
        let userdetails = JSON.parse(localStorage.getItem("userdetails"));
        setUserDetails(userdetails)
    },[])


  const handleLogout = () => {
   
    localStorage.removeItem("userdetails");
    alert("logout successfull");
    navigate("/login")
  };

  const handleDeleteAccount = () => {
    //make the confirmmation from the user to delete
     let pwd= prompt("Are you sure to delete, if yes enter the password again..");
    
    if(pwd!==userdetails.password){
      alert("invalid password")
      return; //when return function will be executed entire function get out from the callstack
    }

//delete the same user object {} from the users collection (DB)
   
    // Handle delete account logic
      fetch("http://localhost:4000/users/"+userdetails.id,{
                                                                method:"DELETE",
                                                                headers: {
                                                                  'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                                                 }
                                                              })
      .then(() => {
        localStorage.removeItem("userdetails")
        alert("Account has been deleted successfully!!!")
         //navigate to Signup page
        navigate("/signup")
      }).catch(err => {
        console.error(err)
      });
  };

  return (
  <>
   
    {userdetails && 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-20">
        <h1 className="text-4xl font-bold text-gray-900">Profile Page</h1>
        <div className="mt-8">
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">
              Name:
            </label>
            <p id="username" className="text-xl text-gray-900">
            {userdetails.fname+" "+userdetails.lname}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
              Phone:
            </label>
            <p id="phone" className="text-xl text-gray-900">
            {userdetails.phoneNumber}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-lg font-medium text-gray-700">
              Date of Birth:
            </label>
            <p id="dob" className="text-xl text-gray-900">
              January 1, 1990
            </p>
          </div>
          <div className="mt-8 flex">
            <button
              onClick={handleLogout}
              className="mr-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gray-900"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
    }
     </>
  );
};

export default ProfilePage;
