import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import baseURL from "./render";

export default function Homepage() {
  const navigate = useNavigate();

  // Move buttonNames outside so it's accessible in Navbar
  const buttonNames = ["Inspiration(8)", "Vacation(6)", "Home(6)", "Travel(6)", "Style(5)", "Wellness(5)", "Health(5)"];

  const [healthBlogs, setHealthBlogs] = useState([]);
  const [fashionBlogs, setFashionBlogs] = useState([]);
  const [travelBlogs, setTravelBlogs] = useState([]);

  useEffect(() => {
    const getHealthBlogs = async() =>{
      try{
      const {data: res} =  await axios.get(`${baseURL}/api/blogs/category/Health & Wellness`)
      
      if(res.success === true){
        setHealthBlogs(res.sortedBlogs.reverse().slice(0, 4))
      }
    }catch(err){
      console.error("Error fetching health blogs:", error);
    }
    }
    const getFashionBlogs = async() =>{
      try{
      const {data: res} =  await axios.get(`${baseURL}/api/blogs/category/Fashion & Beauty`)
      
      if(res.success === true){
        setFashionBlogs(res.sortedBlogs.reverse().slice(0, 4))
      }
    }catch(err){
      console.error("Error fetching health blogs:", error);
    }
    }
    const getTravelBlogs = async() =>{
      try{
      const {data: res} =  await axios.get(`${baseURL}/api/blogs/category/Travel`)
      
      if(res.success === true){
        setTravelBlogs(res.sortedBlogs.reverse().slice(0, 4))
      }
    }catch(err){
      console.error("Error fetching health blogs:", error);
    }
    }

    getHealthBlogs();
    getFashionBlogs();
    getTravelBlogs();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`${baseURL}/api/blogs/getBlogs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
           
            if (response.ok) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchBlogs();
}, []);

// useEffect(() => {
//   const fetchLatestBlog = async () => {
//       try {
//           const { data } = await axios.get(`${baseURL}/api/blogs/getBlogs`);
          
//           if (data.success) {
//               const sortedBlogs = data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
//               setLatestBlog(sortedBlogs[0]); // Get the newest blog
//           }
//       } catch (error) {
//           console.error("Error fetching latest blog:", error);
//       }
//   };

//   fetchLatestBlog();
// }, []);

// useEffect(() => {
//     const fetchLatestBlog = async () => {
//         try {
//             const response = await axios.get(`${baseURL}/api/blogs/getBlogs`);
//             if (response.data.success && response.data.blogs.length > 0) {
//                 console.log("Fetched Blogs:", response.data.blogs); // Debugging

//                 // Sort blogs by date (newest first)
//                 const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
//                 setLatestBlog(sortedBlogs[0]); // Store the latest blog

//                 console.log("Latest Blog:", sortedBlogs[0]); // Debugging
//             }
//         } catch (error) {
//             console.error("Error fetching latest blog:", error);
//         }
//     };

//     fetchLatestBlog();
// }, []); 


  return (
    <div className="px-15">

      <div className="px-8 border-b-2 border-gray-200">
        <div className="flex justify-between items-center py-8">
          <div className="text-7xl">These are a few of my favorite things.</div>
          <div className="text-2xl hover:underline cursor-pointer flex gap-2 items-center" onClick={()=>navigate("/allposts")}>Read It All<GoArrowRight /></div>
        </div>
      </div>

      <div className="flex pt-8 relative">
      <div className="relative w-[70%] px-8 group">
  <img 
    src="https://static.wixstatic.com/media/11062b_36515e2fb712494d822e6d6bd1b1dc54~mv2.jpg/v1/fill/w_1804,h_1352,fp_0.50_0.50,q_90,enc_auto/11062b_36515e2fb712494d822e6d6bd1b1dc54~mv2.jpg" 
    alt="beach" 
    className="w-full transition-all duration-300 group-hover:brightness-50 cursor-pointer" onClick={()=>navigate("/blogdetails/67aaed4bab31244d22a6e8ab")}
  />

  {/* Date */}
  <div className="absolute text-white text-sm top-[4rem] left-[4rem] cursor-pointer" onClick={()=>navigate("/blogdetails/67aaed4bab31244d22a6e8ab")}>
    Aug 14, 2024 . 2 min read
  </div>

  {/* Bottom content */}
  <div className="absolute left-[4rem] bottom-8">
    <button className="bg-gray-200 text-sm p-[0.2rem] rounded-sm px-[0.4rem] mb-2 cursor-pointer" onClick={()=>navigate("/blogdetails/67aaed4bab31244d22a6e8ab")}>
      Travel
    </button>
    <div className="text-5xl text-white cursor-pointer" onClick={()=>navigate("/blogdetails/67aaed4bab31244d22a6e8ab")}>
      Best Weekend Getaways Near You
    </div>
  </div>
</div>


        <div className="w-[30%]">
          <div className="h-[17rem]">
            <img src="https://static.wixstatic.com/media/c837a6_9c28e451f9c94718ad1ac867fdce751d~mv2.jpg/v1/crop/x_1308,y_435,w_1856,h_1264/fill/w_556,h_379,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-1450349810.jpg" alt="lady" />
          </div>

          <div className="text-xl pt-8">Here's me 👋 🥐</div>
          <div className="text-sm font-semibold">
            This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.
          </div>

          <div className="border-gray-200 border-t-2 mt-8">
            <div className="font-semibold">Popular Tags</div>
            <div className="flex flex-wrap gap-2 pt-4">
              {buttonNames.map((name, index) => (
                <button
                  key={index}
                  className="px-2 py-2 border-2 rounded-md border-gray-200"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 ml-8 flex">
        <div className="bg-yellow-100 w-[30%]">
        <div className="w-[30%]  pt-8 pb-8 pl-8 sticky top-0 h-fit">
              <div className="pb-4 hover:underline cursor-pointer" onClick={()=>navigate("/category/health")}>Read It All</div>
              <div className="text-5xl">Health & <br /> Wellness</div>
        </div>
        </div>

        <div className="w-[70%]">
        <div className="grid grid-cols-2 gap-8 pl-10">
        {healthBlogs.map((item, index) => (
                 <Link to={`/blogdetails/${item._id}`} key={index}>
                                      <div key={item?._id} className="h-full" >
                                          <img src={item?.image} alt={item?.title} className="w-full object-cover mb-4"/>
                                          <div className="px-4 py-8 grid gap-4 relative">
                                              
                                              <div className="text-xs">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {item.readingTime} min read </div>
                                              <button className="mt-3 px-3 py-1 bg-yellow-100 rounded-md text-sm w-fit">{item.category}</button>
                                              <h2 className="text-2xl font-my relative">{item.title}</h2>
                                          </div>
                                      </div>
                                      </Link>
      ))}
    </div>
        </div>
      </div>

      <div className="my-8 ml-8 flex">
      <div className="bg-red-300 w-[30%]">
        <div className="w-[30%] bg-red-300 pt-8 pb-8 pl-8 sticky top-0 h-fit">
              <div className="pb-4">Read It All</div>
              <div className="text-5xl">Fashion & <br /> Beauty</div>
        </div>
        </div>

        <div className="w-[70%]">
        <div className="grid grid-cols-2 gap-8 pl-10">
        {fashionBlogs.map((item, index) => (
       <Link to={`/blogdetails/${item._id}`} key={index}>
       <div key={item?._id} className="h-full" >
           <img src={item?.image} alt={item?.title} className="w-full object-cover mb-4"/>
           <div className="px-4 py-8 grid gap-4 relative">
               
               <div className="text-xs">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {item.readingTime} min read </div>
               <button className="mt-3 px-3 py-1 bg-red-300 rounded-md text-sm w-fit">{item.category}</button>
               <h2 className="text-2xl font-my relative">{item.title}</h2>
           </div>
       </div>
       </Link>
      ))}
    </div>
        </div>
      </div>

      <div className="my-8 ml-8 flex">
      <div className="bg-blue-100 w-[30%]">
        <div className="w-[30%] bg-blue-100 pt-8 pb-8 pl-8 sticky top-0 h-fit">
              <div className="pb-4">Read It All</div>
              <div className="text-5xl">Travel</div>
        </div>
        </div>

        <div className="w-[70%]">
        <div className="grid grid-cols-2 gap-8 pl-10">
        {travelBlogs.map((item, index) => (
          <Link to={`/blogdetails/${item._id}`} key={index}>
                                      <div key={item?._id} className="h-full" >
                                          <img src={item?.image} alt={item?.title} className="w-full object-cover mb-4"/>
                                          <div className="px-4 py-8 grid gap-4 relative">
                                              
                                              <div className="text-xs">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {item.readingTime} min read </div>
                                              <button className="mt-3 px-3 py-1 bg-blue-100 rounded-md text-sm w-fit">{item.category}</button>
                                              <h2 className="text-2xl font-my relative">{item.title}</h2>
                                          </div>
                                      </div>
                                      </Link>
      ))}
    </div>
        </div>
      </div>

      <div className="py-[5rem]">
        <div className="text-center text-3xl">Follow me on #Favoritethings</div>
        <div>
          
        </div>
      </div>

      
    </div>
  );
}
