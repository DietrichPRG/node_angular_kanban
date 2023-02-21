import { ErrorHandler, Injectable } from '@angular/core';
import axios from "axios";
import { AxiosInstance } from "axios";

const baseUrl = 'http://127.0.0.1:5000';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private getToken = () => localStorage.getItem('token') ?? '';

  private axiosClient: AxiosInstance;

  private headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  constructor(private errorHandler: ErrorHandler) {
    this.axiosClient = axios.create({
      timeout: 3000
    });


    this.axiosClient.interceptors.request.use(req => {
      if (this.getToken() === '' && req.url?.includes('/login') === false) {
        this.errorHandler.handleError(new Error('Token não encontrado'));
      }

      if (this.getToken() !== '') {
        req.headers.Authorization = 'Bearer ' + this.getToken();
      }

      return req;

    }, error => {
      if (error.response.status === 401) {
        this.errorHandler.handleError(error);
      }
      return Promise.reject(error);
    });

  }

  public async get<T>(url: string): Promise<T> {

    try {
      return this.axiosClient.get<T, any>(baseUrl + url, {
        headers: this.headers
      }).then((response) => response.data as T);

    } catch (error) { return Promise.reject(error); }

  }

  public async post<T>(url: string, obj: object): Promise<T> {

    try {

      return this.axiosClient.post<T, any>(baseUrl + url, obj, {
        headers: this.headers
      }).then((response) => response.data as T);

    } catch (error) { return Promise.reject(error); }

  }

  // generete put method
  public async put<T>(url: string, id: string, obj: object): Promise<T> {

    try {

      return this.axiosClient.put<T, any>(baseUrl + url + '/' + id, obj, {
        headers: this.headers
      }).then((response) => response.data as T);

    } catch (error) { return Promise.reject(error); }

  }

  // generete delete method
  public async delete<T>(url: string, id: string): Promise<T> {

    try {

      return this.axiosClient.delete<T, any>(baseUrl + url + '/' + id, {
        headers: this.headers
      }).then((response) => response.data as T);

    } catch (error) { return Promise.reject(error); }

  }
}
