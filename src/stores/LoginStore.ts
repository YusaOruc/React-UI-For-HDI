import { useQuery, useMutation, useQueryClient } from "react-query";

const API_BASE_URL = "https://localhost:7178/api/authModule/Auth";

const getAuthToken = () => {};
interface LoginData {
  username: string;
  password: string;
}

export const useLoginUser = () => {
  return useMutation(async (d: LoginData) => {
    const response = await fetch(`${API_BASE_URL}/login?username=Anketor&password=Anketor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //   body: JSON.stringify({
    //     username: d.username,
    //     password: d.password,
    //   }),
    });
    console.log(response,"response")
    if (!response.ok) {
      throw new Error("Giriş yapılamadı.");
    }

    return response.json();
  });
};

export const useGetProductList = () => {
  const authToken = getAuthToken();

  return useQuery("products", async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ürün listesi alınamadı.");
    }

    return response.json();
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const authToken = getAuthToken();

  return useMutation(async (newProduct: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
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
