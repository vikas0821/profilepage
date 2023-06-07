import { Link } from "react-router-dom";


const Home = () => {

    return ( 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-20">
        <h1 className="text-4xl font-bold text-gray-900">Home Page</h1>
        <p className="mt-4 text-lg text-gray-700">Welcome to the home page!</p>
       
        <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-900">
               <Link to="/profile"> Profile</Link>
        </button>
      </div>
    </div>
     );
}
 
export default Home; 