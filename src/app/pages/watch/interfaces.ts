import PlayerState from 'youtube-player/dist/constants/PlayerStates';
import { EventType } from 'youtube-player/dist/eventNames';

export interface IVideoData {
  /**
   * youtube player will start playing from that time
   * seconds
   */
  startFrom: number,
  /**
   * english subtitles that can be clicked and translated
   * s and e - start and end seconds when to show subtitle
   * t - text of subtitle
   * NOTE: array should be sorted by "s" property
   *
   **/
  textData: Array<{s: number, e: number, t: string}>
}

export interface IData {
  ready: boolean,
  englishText: string
}

export interface IPage {
  data: IData,
  loading: boolean,
}

/**
 * Need this one for YouTubePlayer because types from package have not good typings
 * (ex: getCurrentTime() - returns Promise<number>, but in types it appears as number)
 */
export interface YouTubePlayer {
  addEventListener(event: string, listener: (event: CustomEvent) => void): void;
  destroy(): void;
  getAvailablePlaybackRates(): ReadonlyArray<number>;
  getAvailableQualityLevels(): ReadonlyArray<string>;
  getCurrentTime(): Promise<number>;
  getDuration(): number;
  getIframe(): HTMLIFrameElement;
  getOption(module: string, option: string): any;
  getOptions(): string[];
  getOptions(module: string): object;
  setOption(module: string, option: string, value: any): void;
  setOptions(): void;
  cuePlaylist(
    playlist: string | ReadonlyArray<string>,
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string,
  ): void;
  cuePlaylist(playlist: {
    listType: string,
    list?: string,
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string,
  }): void;
  loadPlaylist(
    playlist: string | ReadonlyArray<string>,
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string,
  ): void;
  loadPlaylist(playlist: {
    listType: string,
    list?: string,
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string,
  }): void;
  getPlaylist(): ReadonlyArray<string>;
  getPlaylistIndex(): number;
  getPlaybackQuality(): string;
  getPlaybackRate(): number;
  getPlayerState(): PlayerState;
  getVideoEmbedCode(): string;
  getVideoLoadedFraction(): number;
  getVideoUrl(): string;
  getVolume(): number;
  cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void;
  cueVideoById(video: {
    videoId: string,
    startSeconds?: number,
    endSeconds?: number,
    suggestedQuality?: string,
  }): void;
  cueVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: string): void;
  cueVideoByUrl(video: {
    mediaContentUrl: string,
    startSeconds?: number,
    endSeconds?: number,
    suggestedQuality?: string,
  }): void;
  loadVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: string): void;
  loadVideoByUrl(video: {
    mediaContentUrl: string,
    startSeconds?: number,
    endSeconds?: number,
    suggestedQuality?: string,
  }): void;
  loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void;
  loadVideoById(video: {
    videoId: string,
    startSeconds?: number,
    endSeconds?: number,
    suggestedQuality?: string,
  }): void;
  isMuted(): boolean;
  mute(): void;
  nextVideo(): void;
  pauseVideo(): void;
  playVideo(): void;
  playVideoAt(index: number): void;
  previousVideo(): void;
  removeEventListener(event: string, listener: (event: CustomEvent) => void): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setLoop(loopPlaylists: boolean): void;
  setPlaybackQuality(suggestedQuality: string): void;
  setPlaybackRate(suggestedRate: number): void;
  setShuffle(shufflePlaylist: boolean): void;
  setSize(width: number, height: number): object;
  setVolume(volume: number): void;
  stopVideo(): void;
  unMute(): void;
  on(eventType: 'stateChange', listener: (event: CustomEvent & {data: number}) => void): void;
  on(eventType: EventType, listener: (event: CustomEvent) => void): void;
}
