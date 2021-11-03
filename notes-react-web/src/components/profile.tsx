import { FC, useContext, useEffect,  useState, } from "react";
import UserContext from "../context/user";
import { logout } from "../services/auth";
import { useClickOutside } from 'react-click-outside-hook'
import Icon from "./icon";



const Profile: FC = () => {
    const [show, setShow] = useState(false);
    const userContext = useContext(UserContext);
    const [ref, hasClickedOutside] = useClickOutside();
    useEffect(()=> {
       if(hasClickedOutside && show){
            setShow(false);
       }
    }, [hasClickedOutside, show])
    return (
        <div className="flex items-center mt-3" ref={ref} >
            <button type="button" className="text-xl text-black inline-flex" onClick={() => setShow(!show)}>
                <Icon name="account" className="w-6 mr-1" />
                <span className="hidden lg:block">
                {userContext.state.name}
                </span>
             </button>

            {show && <div className="absolute right-2 mt-20 w-36 -top-7 bg-white rounded-md overflow-hidden shadow-xl z-20 ">
                <button type="button" onClick={logout} className="w-full text-sm text-gray-700 px-5 py-2  hover:bg-gray-200">Exit</button>
            </div>}
        </div>
    )
}


export default Profile;