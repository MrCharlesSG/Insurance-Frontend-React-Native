export const setNewSession = (user, tokens, context) => {
    const {setUser, setTokens, setIsLogged} = context
    setUser(user)
    setTokens(tokens)
    setIsLogged(true)
}

export const setNewTokens = (context) => {
    const { setTokens} = context
    setTokens(tokens)
}

export const getTokens = (context) => {

    const { tokens } =  context
    console.log("Tengo los tokens " + tokens)
    return tokens
}

export const getUsername = (context) => {
    const {user} = context
    return user
}
