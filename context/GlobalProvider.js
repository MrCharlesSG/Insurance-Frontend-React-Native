import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserTokensAndName } from "../lib/sb-token";


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null)
  const [creatingReport, setCreatingReport] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserTokensAndName();

        const tokens = res.token
        const username = res.username

        setTokens(tokens)
        setIsLogged(true)
        setUser(username)

      } catch (error) {
        console.log("Error in Authentication " + error.message)
        setIsLogged(false);
        setUser(null);
        setTokens(null)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        tokens,
        setTokens,
        creatingReport,
        setCreatingReport
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
