
import { FC } from 'react';
import Icon from './icon';

interface SearchInputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
    return (
        <div className="mt-5 mb-2  py-1 px-3 flex justify-between items-center rounde-md rounded-md bg-white  w-5/6 lg:w-1/3 h-10">
             <span>
                <Icon name="search" className="h-6 w-6" />
            </span>
            <input onChange={onChange} className="flex-grow outline-none text-gray-700 focus:text-black bg-transparent px-1" type="text" placeholder="search notes"  />
        </div>
    )
}

export default SearchInput;