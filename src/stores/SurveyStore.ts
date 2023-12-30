import { useQuery, useMutation, useQueryClient } from "react-query";
import useGetUserInfoFromSession from "../hooks/useGetTokenFromSession";

const API_BASE_URL = "https://localhost:7178/api/surveyModule/Survey";

export const useGetSurveyList = () => {
  const { token } = useGetUserInfoFromSession();
  return useQuery("surveys", async () => {
    const response = await fetch(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Anket listesi alınamadı.");
    }

    return response.json();
  });
};

export const useGetSurvey = (id: number, shouldFetch: boolean = true) => {
  const { token } = useGetUserInfoFromSession();
  return useQuery(["survey", id], async () => {

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
      throw new Error("Anket bilgisi alınamadı.");
    }

    return response.json();
  });
};

export const useAddSurvey = () => {
  const { token } = useGetUserInfoFromSession();
  const queryClient = useQueryClient();

  return useMutation(async (newProduct: any) => {
    const response = await fetch(`${API_BASE_URL}/postSurvey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Anket eklenemedi.");
    }

    // Yeni Anket eklendikten sonra 'surveys' sorgusunu tekrar çağır
    queryClient.invalidateQueries("surveys");
  });
};

export const useUpdateSurvey = () => {
  const { token } = useGetUserInfoFromSession();
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      surveyId,
      updatedSurvey,
    }: {
      surveyId: number;
      updatedSurvey: any;
    }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${surveyId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedSurvey),
        });

        // Throw an error if the response is not ok
        if (!response.ok) {
          throw new Error("Anket güncellenemedi.");
        }

        queryClient.invalidateQueries("surveys");
        queryClient.invalidateQueries(["survey", surveyId]);
      } catch (error: any) {
        // Handle any errors that occurred during the mutation
        throw new Error(`Anket güncelleme hatası: ${error.message}`);
      }
    }
  );
};
