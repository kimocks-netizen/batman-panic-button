import api from './index';

/** */
// src/types/panic.ts
export interface PanicStatus {
  id: number;
  name: string;
}

export interface Panic {
  id: number;
  longitude: string;
  latitude: string;
  panic_type: string;
  details: string;
  created_at: string;
  status: PanicStatus;
}

export interface PanicResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    panics?: Panic[];
    panic_id?: number;
  };
}
/***
interface PanicResponse {
  status: 'success' | 'error';
  message: string;
  data: any;
} */

interface PanicRequest {
  longitude: string;
  latitude: string;
  panic_type?: string;
  details?: string;
}

export const sendPanic = async (data: PanicRequest): Promise<PanicResponse> => {
  const response = await api.post<PanicResponse>('/panic/send', data);
  return response.data;
};

export const cancelPanic = async (panicId: number) => {
  const response = await api.post('/panic/cancel', { panic_id: panicId });
  return response.data;
};

export const getPanicHistory = async (statusId?: number): Promise<PanicResponse> => {
  const params = statusId ? { status_id: statusId } : {};
  const response = await api.get<PanicResponse>('/panic/history', { params });
  return response.data;
};