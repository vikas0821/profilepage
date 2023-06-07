
import {Link} from 'react-router-dom';
import {useEffect, useRef, useState } from "react";
import CloseButton from "./CloseButton";
import { useNavigate } from "react-router-dom";


function SignupPage() {
  let fname =  useRef();
  let lname =  useRef();
  let email =  useRef();
  let password =  useRef();
  let phone =  useRef();
  let navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("userdetails")!==null){
      navigate("/home")
    }
  },[])

  const [formData, setFormData] = useState({
    id:'',
    fname: '',
    lname:'',
    phoneNumber: '',
    email: '',
    password: ''
  });
  const[hide, setHide]=useState(true);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    let totaldata;
    e.preventDefault();
    //for counting the data present inn database
    fetch("http://localhost:4000/users")
    .then((res)=>{return res.json()})
    .then((data)=>{
      totaldata=data.length;
      console.log(totaldata);
    })
    //------------------------------------------

   
    if (validateForm()) {
       // create an obj of new user to send 
        let newUser = {
            id:totaldata+1,
            fname: fname.current.value,
           lname: lname.current.value ,
            email: email.current.value,
            password: password.current.value,
            phoneNumber:phone.current.value,
     
        }

        // post the obj to the db collection
        fetch("http://localhost:4000/users" , {
                                                method : "POST",
                                                headers : {"Content-Type" : "application/json"},
                                                body : JSON.stringify(newUser)
                                            } )
        .then(()=>{
            alert("Account has been created successfully");
            navigate("/login");
        })
        //----------------------------------------

    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Name validation
    if (!formData.fname) {
      formIsValid = false;
      newErrors.name = 'Please enter first name';
    }
    if (!formData.lname) {
      formIsValid = false;
      newErrors.name = 'Please enter last name';
    }
    

    // Phone number validation
    const phonePattern = /^\d{10}$/;
    if (!formData.phoneNumber.match(phonePattern)) {
      formIsValid = false;
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailPattern)) {
      formIsValid = false;
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password.length < 6) {
      formIsValid = false;
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  return (
    <>
    {
      hide && <div id="formBox" className="w-screen h-screen absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black opacity-80 "></div>  
      }
    <div className={`SignupPage w-2/5 h-auto   rounded-2xl  m-auto absolute left-1/2 top-1/2 -translate-x-1/2  ${hide?"block":"hidden" } -translate-y-1/2 p-5 bg-slate-900 text-white `}>
    <Link to="/"><CloseButton onClick={()=>{setHide(false)}} /> </Link>
      <h1  className='text-white text-center bg-slate-900 font-bold text-4xl m-2' id='signup '>SIGN UP </h1>
    <form onSubmit={handleSubmit} action="">
      
      <div className="w-full border-2 border-white my-5"></div>
      
        <input className='h-auto mt-6 w-full p-2 rounded-xl text-black  text-xl'  ref={fname} type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First name" />
        {errors.name && <div className="error ml-1 text-sm">{errors.name}</div>}

        <input className='h-auto mt-6 w-full p-2 rounded-xl text-black  text-xl'  ref={lname} type="text" name="lname" value={formData.lname}   onChange={handleChange} placeholder="Last name" />
        {errors.name && <div className="error ml-1 text-sm">{errors.name}</div>}
      
        <input className='h-auto mt-6 w-full p-2 rounded-xl text-black  text-xl'   ref={phone} type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone No" />
        {errors.phoneNumber && <div className="error ml-1 text-sm">{errors.phoneNumber}</div>}
      
        <input className='h-auto mt-6 w-full p-2 rounded-xl text-black text-xl'   ref={email} type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id" />
        {errors.email && <div className="error ml-1 text-sm">{errors.email}</div>}
      
   

       
        <input className='h-auto mt-6 w-full p-2 rounded-xl text-black text-xl'   ref={password} type="password" name="password"  value={formData.password} onChange={handleChange} placeholder="Password..."/>
        {errors.password && <div className="error ml-1 text-sm">{errors.password}</div>}
      
        

      
         {/* <input className='h-auto mt-6 w-full p-2 rounded-xl text-black'  id='cpass' type="password" name=" password"  value={formData.password} onChange={handleChange} placeholder="Confirm Password..." />
         {errors.password && <div className="error ml-1 text-sm">{errors.password}</div>} */}
        

      <button className='h-10 w-32 hover:text-gray-950 hover:font-bold  m-2 hover:bg-white border-2 border-white rounded-xl text-white my-5 text-xl'  onclick="">Submit</button><br />
      {/* <Link to="/Login"><p className='hover:underline'>Already have account?</p></Link> */}
    </form>
  </div>  
    </>
  )
}

export default SignupPage
