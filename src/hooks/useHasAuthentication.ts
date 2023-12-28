
function useHasAuthentication() {
   
    const hasAuthentication = sessionStorage.getItem("token");
    return  !!hasAuthentication 
}

export default useHasAuthentication
