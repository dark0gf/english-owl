export interface IChannelResponse {
  id: string,
  image: string,
  title: string,
  description: string
}

export interface IVideoResponse {
  videoId: string;
  startFrom: number;
  textData: [{s: number, e: number, t: string, rt: string}?];
  image: string,
  title: string,
  description: string
}
