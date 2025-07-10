import { useState } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
interface AxiosConfig extends Omit<AxiosRequestConfig, "url" | "method" | "data"> {
  skipInterceptor?: boolean;
  url?: string;
}

const useAxios = (baseUrl: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = async (
    method: "get" | "post" | "put" | "delete" | "patch" = "get",
    requestData: any = {},
    config: AxiosConfig = {},
    customUrl?: string
  ) => {
    setLoading(true);
    setData(null);
    setError(null);

    const { skipInterceptor, ...axiosConfig } = config;

    try {
      let axiosInstance: AxiosInstance = axios;

      if (!skipInterceptor) {
        axiosInstance = axios.create();

        // Додаємо інтерсептор відповіді
        axiosInstance.interceptors.response.use(
          (response: AxiosResponse) => {
            const newToken = response.headers["new-access-token"];
            if (newToken) {
              localStorage.setItem("token", newToken);
              axiosInstance.defaults.headers["Authorization"] = `Bearer ${newToken}`;
            }
            return response;
          },
          async (error) => {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  localStorage.removeItem("token");
                  // Перенаправлення на сторінку входу
                  window.location.href = "/login";
                  break;
                case 403:
                  // Обробка помилки доступу до проекту
                  console.error("Project access denied:", error.response.data.error);
                  // Можливо, перенаправлення на сторінку вибору проекту
                  break;
                case 404:
                  // Обробка помилки "Проект не знайдено"
                  console.error("Project not found:", error.response.data.error);
                  break;
              }
            }
            return Promise.reject(error);
          }
        );

        // Додаємо інтерсептор запиту
        axiosInstance.interceptors.request.use(
          (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("token");
            if (token) {
              // Переконуємося, що config.headers - це AxiosHeaders
              if (!(config.headers instanceof AxiosHeaders)) {
                config.headers = new AxiosHeaders(config.headers);
              }
              config.headers.set("Authorization", `Bearer ${token}`);
            }
            return config;
          },
          (error: any) => Promise.reject(error)
        );
      }
      // Модифікуємо конфігурацію запиту в залежності від методу
      const requestConfig = {
        url: customUrl || baseUrl,
        method,
        ...axiosConfig,
        // Для GET-запиту передаємо параметри через params
        ...(method.toLowerCase() === "get" ? { params: requestData } : { data: requestData }),
      };

      const response = await axiosInstance(requestConfig);
      /*  const response = await axiosInstance({
        url: customUrl || baseUrl,
        method,
        data: requestData,
        ...axiosConfig,
      });
 */
      if (response.status === 204 && method === "delete") {
        setData("delete");
      } else {
        setData(response.data);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/";
        localStorage.removeItem("token");
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, data, loading, error };
};

export default useAxios;
