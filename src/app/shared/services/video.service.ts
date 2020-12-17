import axios from 'app/shared/services/axios';
import { IVideoResponse } from 'app/shared/common.interfaces';

export const getVideosByCategory = async (channelId: string): Promise<IVideoResponse[]> => {
  return await axios.get(`/video/channel/${channelId}`).then(response => response.data);
};
