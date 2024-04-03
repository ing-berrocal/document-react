import AutenticacionContext from "../Hooks/AutenticacionContext"


export const TramitesProvider = ({children}) =>{
    return (
        <>
        <AutenticacionContext>
            {children}
        </AutenticacionContext>
        </>        
    );
}