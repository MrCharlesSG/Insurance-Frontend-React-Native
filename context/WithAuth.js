import { Redirect } from "expo-router";
import { useGlobalContext } from "./GlobalProvider";


export const withAuth = (WrappedComponent) => (props) => {
    const { loading, isLogged } = useGlobalContext();

    if (loading) return null; // Puedes mostrar un spinner aquí si lo prefieres

    if (!isLogged) {
        return <Redirect href="/sign-in" />;
    }

    return <WrappedComponent {...props} />
}