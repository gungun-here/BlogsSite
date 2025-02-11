

export default function Footer(){

    return(
        <div>
              <div className="flex gap-[15rem] ml-8 pb-20 mt-8">
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
          <button type="submit" className="bg-black text-white h-[3rem] w-[8rem] cursor-pointer">Submit</button>
        </div>
      </div>

      <div className="py-4 pl-4 border-t-2 border-gray-200">
      <span className="text-sm">© 2035 by Out & About. Built on Wix Studio</span>
      </div>
        </div>
    )
}