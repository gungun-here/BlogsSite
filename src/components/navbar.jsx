import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareFacebook, FaSquareXTwitter, FaSquarePinterest } from "react-icons/fa6";

export default function Navbar() {
  const location = useLocation(); // Get current route

  // Function to determine active link class
  const onLink = (path) =>
    location.pathname === path ? "font-bold" : "hover:font-bold";

  // Move buttonNames outside so it's accessible in Navbar
  const buttonNames = ["Inspiration(8)", "Vacation(6)", "Home(6)", "Travel(6)", "Style(5)", "Wellness(5)", "Health(5)"];

  const data1 = [{
    image: "https://static.wixstatic.com/media/c837a6_e04a7b4dded9421287debe11a95b9d84~mv2.jpg/v1/fill/w_1872,h_1404,fp_0.50_0.50,q_90,enc_auto/c837a6_e04a7b4dded9421287debe11a95b9d84~mv2.jpg",
    date: "Aug 8, 2024 . 2 min read",
    button: "Health & Wellness",
    title: "Tips for Better Sleep and Relaxation"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_3118705858a942109a40f6aeecaf4e4a~mv2.jpg/v1/fill/w_1868,h_1404,fp_0.50_0.50,q_90,enc_auto/c837a6_3118705858a942109a40f6aeecaf4e4a~mv2.jpg",
    date: "Aug 8, 2024 . 2 min read",
    button: "Health & Wellness",
    title: "How to Cultivate a Mindfulness Practice for Mental Well-being"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_d39daa375dfb4d53aa140f372e81fd99~mv2.jpg/v1/fill/w_1872,h_1404,fp_0.50_0.50,q_90,enc_auto/c837a6_d39daa375dfb4d53aa140f372e81fd99~mv2.jpg",
    date: "Jul 21, 2024 . 2 min read",
    button: "Health & Wellness",
    title: "Top 10 Morning Yoga Routines to Energize Your Day"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_1957c6aeed754a629bffd67d9ba4dc27~mv2.jpg/v1/fill/w_1807,h_1358,fp_0.50_0.50,q_90,enc_auto/c837a6_1957c6aeed754a629bffd67d9ba4dc27~mv2.jpg",
    date: "Jul 14, 2024 . 1 min read",
    button: "Health & Wellness",
    title: "The Ultimate Guide to Balanced Nutrition for Busy Professionals"
  }
  ];

  const data2 = [{
    image: "https://static.wixstatic.com/media/11062b_8d96b6cd87454caeaeed6533348d5d34~mv2.jpg/v1/fill/w_1872,h_1404,fp_0.50_0.50,q_90,enc_auto/11062b_8d96b6cd87454caeaeed6533348d5d34~mv2.jpg",
    date: "Aug 14, 2024 . 1 min read",
    button: "Fashion & Beauty",
    title: "Skincare Secrets: How to Get Glowing Skin Naturally"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_669e570c882847ada0b9b961e2171eef~mv2.jpg/v1/fill/w_1868,h_1404,fp_0.50_0.50,q_90,enc_auto/c837a6_669e570c882847ada0b9b961e2171eef~mv2.jpg",
    date: "Aug 13, 2024 . 2 min read",
    button: "Fashion & Beauty",
    title: "7 Essential Wardrobe Staples for Every Season"
  },
  {
    image: "https://static.wixstatic.com/media/11062b_0bbd0d57ebfe42958fc806c9a52be288~mv2.jpg/v1/fill/w_1365,h_1024,fp_0.50_0.50,q_90,enc_auto/11062b_0bbd0d57ebfe42958fc806c9a52be288~mv2.jpg",
    date: "Aug 12, 2024 . 2 min read",
    button: "Fashion & Beauty",
    title: "How to Style Outfits for Any Occasion"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_746e3d01023c43adbd9177de98c2c8b7~mv2.png/v1/fill/w_1344,h_1010,fp_0.50_0.50,q_95,enc_auto/c837a6_746e3d01023c43adbd9177de98c2c8b7~mv2.png",
    date: "Aug 2, 2024 . 1 min read",
    button: "Fashion & Beauty",
    title: "How to Achieve a Flawless Everyday Makeup Look"
  }
  ];

  const data3 = [{
    image: "https://static.wixstatic.com/media/11062b_36515e2fb712494d822e6d6bd1b1dc54~mv2.jpg/v1/fill/w_1872,h_1404,fp_0.50_0.50,q_90,enc_auto/11062b_36515e2fb712494d822e6d6bd1b1dc54~mv2.jpg",
    date: "Aug 14, 2024 . 2 min read",
    button: "Travel",
    title: "Best Weekend Getaways Near You"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_53804f9edf3f4cc8a3ab418cefd87deb~mv2.jpg/v1/fill/w_560,h_407,fp_0.50_0.50,lg_1,q_90,enc_auto/c837a6_53804f9edf3f4cc8a3ab418cefd87deb~mv2.jpg",
    date: "Aug 12, 2024 . 2 min read",
    button: "Travel",
    title: "Tips for Planning a Family Vacation"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_5c66e57eaf1e4e25abf7fb5941e54c06~mv2.jpg/v1/fill/w_1872,h_1404,fp_0.50_0.50,q_90,enc_auto/c837a6_5c66e57eaf1e4e25abf7fb5941e54c06~mv2.jpg",
    date: "Aug 12, 2024 . 2 min read",
    button: "Travel",
    title: "How to Style Outfits for Any Occasion"
  },
  {
    image: "https://static.wixstatic.com/media/c837a6_f09fb75b29cd4562b00743898958829e~mv2.jpg/v1/fill/w_1868,h_1404,fp_0.50_0.50,q_90,enc_auto/c837a6_f09fb75b29cd4562b00743898958829e~mv2.jpg",
    date: "Aug 11, 2024 . 2 min read",
    button: "Travel",
    title: "How to Achieve a Flawless Everyday Makeup Look"
  }
  ];

  return (
    <div className="px-15  bg-gradient-to-t from-[rgb(235,234,230)] via-transparent to-transparent">
      <div className="px-10 border-b-2 flex justify-between items-center py-4 border-gray-200">
        <div><Link to="/" className="text-xl">Out & About</Link></div>
        <div className="flex gap-12">
          <Link to="/login" className={onLink("/login")}>Login</Link>
          <Link to="/allposts" className={onLink("/allposts")}>All Posts</Link>
          <div className="flex gap-4 justify-between items-center">
            <Link to="/"><AiFillInstagram className="h-6 w-6 rounded-full" /></Link>
            <Link to="/"><FaSquareFacebook className="h-6 w-6 rounded-full" /></Link>
            <Link to="/"><FaSquareXTwitter className="h-6 w-6 rounded-full" /></Link>
            <Link to="/"><FaSquarePinterest className="h-6 w-6 rounded-full" /></Link>
          </div>
        </div>
      </div>

      <div className="px-8 border-b-2 border-gray-200">
        <div className="flex justify-between items-center py-8">
          <div className="text-7xl">These are a few of my favorite things.</div>
          <div className="text-2xl hover:underline cursor-pointer">Read It All</div>
        </div>
      </div>

      <div className="flex pt-8 relative">
        <div className="w-[70%] px-8">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D" alt="beach" />

          <div className="absolute text-white text-sm top-[4rem] left-[4rem]">
          Aug 14, 2024 . 2 min read
          </div>

          <div className="absolute left-[4rem] bottom-8">
            <button className="bg-gray-200 text-sm p-[0.2rem] rounded-sm px-[0.4rem] mb-2">Travel</button>
               <div className="text-5xl text-white">
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
        <div className="w-[30%] bg-yellow-100 pt-8 pl-8">
              <div className="pb-4">Read It All</div>
              <div className="text-5xl">Health & <br /> Wellness</div>
        </div>

        <div className="w-[70%]">
        <div className="grid grid-cols-2 gap-8 pl-10">
      {data1.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.title} className="w-full object-cover" />
          <div className="p-4">
            <span className="text-sm text-gray-500">{item.date}</span><br/>
            <button className="mt-3 px-3 py-1 bg-yellow-100 rounded-md text-sm">
              {item.button}
            </button>
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>

      <div className="my-8 ml-8 flex">
        <div className="w-[30%] bg-red-300 pt-8 pl-8">
              <div className="pb-4">Read It All</div>
              <div className="text-5xl">Fashion & <br /> Beauty</div>
        </div>

        <div className="w-[70%]">
        <div className="grid grid-cols-2 gap-8 pl-10">
      {data2.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.title} className="w-full object-cover" />
          <div className="p-4">
            <span className="text-sm text-gray-500">{item.date}</span><br/>
            <button className="mt-3 px-3 py-1 bg-red-300 rounded-md text-sm">
              {item.button}
            </button>
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>

      <div className="my-8 ml-8 flex">
        <div className="w-[30%] bg-blue-100 pt-8 pl-8">
              <div className="pb-4">Read It All</div>
              <div className="text-5xl">Travel</div>
        </div>

        <div className="w-[70%]">
        <div className="grid grid-cols-2 gap-8 pl-10">
      {data3.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.title} className="w-full object-cover h-[21rem]" />
          <div className="p-4">
            <span className="text-sm text-gray-500">{item.date}</span><br/>
            <button className="mt-3 px-3 py-1 bg-blue-100 rounded-md text-sm">
              {item.button}
            </button>
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>

      <div className="py-[5rem]">
        <div className="text-center text-3xl">Follow me on #Favoritethings</div>
        <div>
          
        </div>
      </div>

      <div className="flex gap-[15rem] ml-8 pb-20">
        <div className="text-3xl">Out & About</div>
        <div><span>Menu</span>
          <ul className="font-semibold mt-4 text-sm grid gap-2">
            <li>All posts</li>
            <li>Accessability Statement</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="grid gap-4">
          <span>Stay in the know</span>
          <label htmlFor="email">Email*</label>
          <input className="border rounded h-[2.5rem] w-[35rem]" type="email" />
          <div className="flex gap-4"><input type="checkbox"/><label htmlFor="checkbox">Yes, subscribe me to your newsletter.</label></div>
          <button type="submit" className="bg-black text-white h-[3rem] w-[8rem]">Submit</button>
        </div>
      </div>

      <div className="py-4 border-t-2 border-gray-200">
      <span className="text-sm">© 2035 by Out & About. Built on Wix Studio</span>
      </div>
    </div>
  );
}
