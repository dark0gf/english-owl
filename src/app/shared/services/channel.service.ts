import axios from 'app/shared/services/axios';
import { IChannelResponse } from 'app/shared/common.interfaces';

export const getChannelById = async (channelId: string): Promise<IChannelResponse | null> => {
  return await axios.get(`/channel/ids/${channelId}`).then((response) => {
    if (response.data && response.data.length) {
      return response.data.pop();
    }
    return null;
  });
};
