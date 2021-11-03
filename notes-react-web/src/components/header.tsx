
import { FC } from 'react';
import Profile from './profile';
import SearchInput from './searchInput';

interface HeaderProps {
}
const Header: FC<HeaderProps> = () => {

    return (
        <div className="w-full h-16 flex items-center px-5">
            <SearchInput  />
            <div className="flex-1"></div>
            <Profile />
        </div>
    )
}

export default Header;