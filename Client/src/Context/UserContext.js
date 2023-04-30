import { createContext, useEffect, useState } from "react";

const UserContext = createContext("");

const UserState = (props) => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    let existingData = localStorage.getItem("User");
    if (existingData) setUserData(JSON.parse(existingData));
  }, []);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserState };
