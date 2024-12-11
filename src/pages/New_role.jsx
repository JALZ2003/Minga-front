import newRole from "/img/Bg_newRole.png";
import logo from "/img/LogoDosP.png";
import select from "/img/Select.png";
import authorRole from "/img/authorRole.png";
import companyRole from "/img/companyRole.png"
import { useNavigate } from "react-router-dom";

export default function New_role() {
  const navigate = useNavigate()
  const author = () => {
    setTimeout(() => navigate("/author-form"), 1000)
  }
  const company = () => {
    setTimeout(() => navigate("/cia-form"), 1000)
  }

  return (
    <main className="w-full min-h-screen flex justify-center bg-white pb-[30px]">
      <div className="w-1/2 flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[#FF5722] text-[20px]">Change role to</p>
          <img src={logo} alt="" className="mt-2" />
        </div>
        <form action="" className="mt-5 flex flex-col w-full items-center justify-center">
        
          <label
            onClick={author}
            htmlFor=""
            className="group flex justify-center items-center w-[80%] rounded-lg hover:cursor-pointer hover:bg-gradient-to-r from-[#FF5722] to-[#F97316] p-1 border-2"
          >
            <input type="radio" name="author" id="" className="hidden" />
            <div className="bg-white flex p-2 w-full justify-between">
              <div className="flex w-full">
                <img src={authorRole} alt="" className="w-[103px] h-[45px]" />
                <div className="flex flex-col ms-[4%] ">
                  <p className="font-bold text-[20] text-[#FF5722]">Join as an Author!</p>
                  <p className="text-[#FF5722]">I'm a reader writting a manga</p>
                </div>
              </div>

              <div className="flex items-center justify-center border-2 group-hover:bg-[#FF5722] rounded-full h-[25px] w-[25px]">
                <img src={select} className="w-[15px] h-[11px]" alt="" />
              </div>
            </div>
          </label>
          
      
          <label
            onClick={company}
            htmlFor=""
            className="group flex mt-5 justify-center items-center w-[80%] rounded-lg hover:cursor-pointer hover:bg-gradient-to-r from-[#FF5722] to-[#F97316] p-1 border-2"
          >
            <input type="radio" name="author" id="" className="hidden" />
            <div className="bg-white flex p-2 w-full justify-between">
              <div className="flex w-full">
                <img src={companyRole} alt="" className="w-[103px] h-[45px]" />
                <div className="flex flex-col ms-[4%] ">
                  <p className="font-bold text-[20] text-[#FF5722]">Join as a Company!</p>
                  <p className="text-[#FF5722]">I'm a company and I want to publish my comics</p>
                </div>
              </div>

              <div className="flex items-center justify-center border-2 group-hover:bg-[#FF5722] rounded-full h-[25px] w-[25px]">
                <img src={select} className="w-[15px] h-[11px]" alt="" />
              </div>
            </div>
          </label>

        </form>
      </div>

      <img
        className="hidden lg:block min-h-[640px] max-h-screen w-1/2 object-cover "
        src={newRole}
        alt="newRole"
      />
    </main>
  );
}
