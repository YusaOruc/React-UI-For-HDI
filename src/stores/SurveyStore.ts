import { useQuery, useMutation, useQueryClient } from "react-query";
import useGetUserInfoFromSession from "../hooks/useGetTokenFromSession";

const API_BASE_URL = "https://localhost:7178/api/surveyModule/Survey";

type SurveyResultReturn = { [k: string]: any };

export const useGetSurveyResult = (surveyId: number,userId?:number) => {
  
  const { token } = useGetUserInfoFromSession();
  const query = useQuery("surveyResults", async () => {
     // userId null veya undefined değilse URL'e ekleyin
     const url = userId !== null && userId !== undefined
     ? `${API_BASE_URL}/results?surveyId=${surveyId}&userId=${userId}`
     : `${API_BASE_URL}/results?surveyId=${surveyId}`;
    const response = await fetch(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Anket listesi alınamadı.");
    }
    return response.json();
  });

  const data: SurveyResultReturn = {};
  const { data: answers } = query;
  if(answers){
    data.surveyId = surveyId;
    answers.forEach((t: any) => {
      data[`q-${t.surveyQuestionId}`] = `${t.surveyQuestionOptionId}`;
      data[`${t.surveyQuestionId}-correctQuestionIndex`] =t.correctQuestionIndex;
      data[`${t.surveyQuestionId}-isCorrect`] = t.isCorrect;
    });
  }
 
 
  return data;
};

export const useAddSurveyResult = (surveyId:number) => {
  const { token } = useGetUserInfoFromSession();
  const queryClient = useQueryClient();

  return useMutation(async (surveyResults: any)  => {
    const response = await fetch(`${API_BASE_URL}/surveyResultMultiple?surveyId=${surveyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(surveyResults),
    });

    if (!response.ok) {
      throw new Error("Anket eklenemedi.");
    }

    // Yeni Anket eklendikten sonra 'surveys' sorgusunu tekrar çağır
    queryClient.invalidateQueries("surveyResults");

  });
};

export const useGetSurveyNameList = (parentId?: number | null, isParent?: boolean ) => {
  const { token } = useGetUserInfoFromSession();
  return useQuery("surveyNames", async () => {

     // parentId null veya undefined değilse URL'e ekleyin
     const url = parentId !== null && parentId !== undefined
     ? `${API_BASE_URL}/surveyNames?parentId=${parentId}&isParent=${isParent}`
     : `${API_BASE_URL}/surveyNames?isParent=${isParent}`;

    const response = await fetch(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Anket İsmi listesi alınamadı.");
    }

    return response.json();
  });
};

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

  return useMutation(async (survey: any) => {
    const response = await fetch(`${API_BASE_URL}/postSurvey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(survey),
    });

    if (!response.ok) {
      throw new Error("Anket eklenemedi.");
    }

    // Yeni Anket eklendikten sonra 'surveys' sorgusunu tekrar çağır
    queryClient.invalidateQueries("surveys");
    queryClient.invalidateQueries("surveyNames");
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
        queryClient.invalidateQueries("surveyNames");
        queryClient.invalidateQueries(["survey", surveyId]);
      } catch (error: any) {
        // Handle any errors that occurred during the mutation
        throw new Error(`Anket güncelleme hatası: ${error.message}`);
      }
    }
  );
};
