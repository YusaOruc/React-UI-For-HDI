import { useQuery, useMutation, useQueryClient } from "react-query";
import useGetUserInfoFromSession from "../hooks/useGetTokenFromSession";

const API_BASE_URL = "https://localhost:7178/api/authModule/Users";



export const useGetUserList = () => {
  const { token } = useGetUserInfoFromSession();
  return useQuery("users", async () => {
    const response = await fetch(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Kullanıcı listesi alınamadı.");
    }

    return response.json();
  });
};

export const useGetUser = (id: number, shouldFetch: boolean = true) => {
  const { token } = useGetUserInfoFromSession();
  return useQuery(["user", id], async () => {
    if (!shouldFetch) {
      // Eğer shouldFetch false ise sorguyu çalıştırma
      return;
    }
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Kullanıcı bilgisi alınamadı.");
    }

    return response.json();
  });
};

export const useAddUser = () => {
  const { token } = useGetUserInfoFromSession();
  const queryClient = useQueryClient();

  return useMutation(async (user: any) => {
    const response = await fetch(`${API_BASE_URL}/postUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Kullanıcı eklenemedi.");
    }

    queryClient.invalidateQueries("users");
  });
};

