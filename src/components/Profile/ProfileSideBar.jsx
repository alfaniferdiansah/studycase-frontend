import React from 'react'
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/userSelector';
import { setAuth } from '../../redux/actions/userAction';
import { RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { AiOutlineCreditCard, AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ButtonLogout({ action }) {
    return (
    <Nav.Link onClick={action}>
      Log out
    </Nav.Link>
    )
}

const ProfileSideBar = ({ setActive, active }) => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const logOut = () => {
        dispatch(setAuth(false))
        navigate("/")
        window.location.reload(true)
        toast.success("Log out success!!");
    }
     
     return (
       <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
         <div
           className="flex items-center cursor-pointer w-full mb-8"
           onClick={() => setActive(1)}
         >
           <RxPerson size={20} color={active === 1 ? "red" : ""} />
           <span
             className={`pl-3 ${
               active === 1 ? "text-[red]" : ""
             } 800px:block hidden`}
           >
             Profile
           </span>
         </div>
         <div
           className="flex items-center cursor-pointer w-full mb-8"
           onClick={() => setActive(2)}
         >
           <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
           <span
             className={`pl-3 ${
               active === 2 ? "text-[red]" : ""
             } 800px:block hidden`}
           >
             Orders
           </span>
         </div>
         <div
           className="flex items-center cursor-pointer w-full mb-8"
           onClick={() => setActive(3)}
         >
           <MdOutlineTrackChanges size={20} color={active === 3 ? "red" : ""} />
           <span
             className={`pl-3 ${
               active === 3 ? "text-[red]" : ""
             } 800px:block hidden`}
           >
             Track Order
           </span>
         </div>
   
         <div
           className="flex items-center cursor-pointer w-full mb-8"
           onClick={() => setActive(4)}
         >
           <TbAddressBook size={20} color={active === 4 ? "red" : ""} />
           <span
             className={`pl-3 ${
               active === 4 ? "text-[red]" : ""
             } 800px:block hidden`}
           >
             Address
           </span>
         </div>
   
         <div
           className="single_item flex items-center cursor-pointer w-full mb-8"
         >
           <AiOutlineLogin size={20} color={active === 5 ? "red" : ""} />
           <span
             className={`pl-3 ${
               active === 5 ? "text-[red]" : ""
             } 800px:block hidden`}
           >
             { auth && <ButtonLogout action={logOut}/> }
           </span>
         </div>
       </div>
     );
   };

export default ProfileSideBar
