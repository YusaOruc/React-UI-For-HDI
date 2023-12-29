
function useGetUserInfoFromSession() {
   
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    return  {token,role}
}

export default useGetUserInfoFromSession
