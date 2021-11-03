import React, { createContext, FC, useState } from "react";

type User = {
    name: string
    email: string
}
interface PropsUserContext {
    state: User,
    setState: React.Dispatch<React.SetStateAction<User>>
}
const DEFAULT_VALUE = {
    state: {
        name: "",
        email: ""
    },
    setState: () => { }
}
const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE)

const UserContextProvider: FC = ({ children }) => {

    const [state, setState] = useState(DEFAULT_VALUE.state)

    return (
        <UserContext.Provider
            value={{
                state,
                setState
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider }
export default UserContext;