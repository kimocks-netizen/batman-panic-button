import api from './index';

interface PanicResponse {
  status: 'success' | 'error';
  message: string;
  data: any;
}

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
/*export const cancelPanic = async (panicId: number): Promise<PanicResponse> => {
  const response = await api.post<PanicResponse>('/panic/cancel', {
    panic_id: panicId
  });
  return response.data;
};*/
export const cancelPanic = async (panicId: number) => {
  const response = await api.post('/panic/cancel', { panic_id: panicId });
  return response.data;
};

export const getPanicHistory = async (statusId?: number): Promise<PanicResponse> => {
  const params = statusId ? { status_id: statusId } : {};
  const response = await api.get<PanicResponse>('/panic/history', { params });
  return response.data;
};