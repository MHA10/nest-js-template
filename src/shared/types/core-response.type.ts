export interface ICoreResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}
