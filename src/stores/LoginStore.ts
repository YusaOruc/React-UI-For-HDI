import { useQuery, useMutation, useQueryClient } from "react-query";
import useGetUserInfoFromSession from "../hooks/useGetTokenFromSession";

const API_BASE_URL = "https://localhost:7178/api/authModule/Auth";



interface LoginData {
  username: string;
  password: string;
}

export const useLoginUser = () => {
  return useMutation(async (d: LoginData) => {
    const response = await fetch(`${API_BASE_URL}/login?username=${d.username}&password=${d.password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  });
};
export const useLogout = () => {
  const {token} = useGetUserInfoFromSession()
  return useMutation(async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    sessionStorage.removeItem("token");
    return response.json();
  });
};

export const useTest = () => {
  const {token} = useGetUserInfoFromSession()
  
  return useMutation(async () => {
    const response = await fetch(`${API_BASE_URL}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  });
};
export const useGetProductList = () => {
  const {token} = useGetUserInfoFromSession()
  return useQuery("products", async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ürün listesi alınamadı.");
    }

    return response.json();
  });
};

export const useAddProduct = () => {
  const {token} = useGetUserInfoFromSession()
  const queryClient = useQueryClient();

  return useMutation(async (newProduct: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Ürün eklenemedi.");
    }

    // Yeni ürün eklendikten sonra 'products' sorgusunu tekrar çağır
    queryClient.invalidateQueries("products");

    return response.json();
  });
};
