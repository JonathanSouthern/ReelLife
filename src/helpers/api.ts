import axios, { AxiosRequestConfig, isAxiosError } from "axios";

type GeneralResponse = {
  success: boolean;
  statusCode: number;
};

type SuccessfullResponse<Data> = GeneralResponse & {
  success: true;
  data: Data;
};

type ErrorResponse = GeneralResponse & {
  success: false;
  message: string;
};

export type StandardResponse<Data> = SuccessfullResponse<Data> | ErrorResponse;

export default async function s(
  url: string,
  params: AxiosRequestConfig
): Promise<StandardResponse<any>> {
  try {
    const response = await axios(url, params);
    return { success: true, statusCode: response.status, data: response.data };
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.message,
        statusCode: err.status ?? 500,
      };
    }

    return {
      success: false,
      message: `Internal Server Error: ${err}`,
      statusCode: 500,
    };
  }
}
