import { IEnglishTextBlock, IPlayerFactoryResult, IVideoData, YouTubePlayer } from './interfaces';
import PlayerFactory from 'youtube-player';

export const YTPlayerState = {
  UNSTARTED: '-1',
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};

export const playerServiceFactory: (videoData: IVideoData) => IPlayerFactoryResult = (videoData: IVideoData) => {
  const play = () => player.playVideo();
  const pause = () => player.pauseVideo();

  const playPause = async () => {
    const state = await player.getPlayerState();
    if (state == YTPlayerState.PLAYING) {
      pause();
    } else {
      play();
    }
  };

  const seekToLeftText = async () => {
    let index = await searchForClosestPlayedIndexText();
    if (index < 0) {
      return;
    }
    if (index > 0) {
      index--;
    }

    const tData = videoData.textData[index];
    player.seekTo(tData.s, true);
  };

  const seekToRightText = async () => {
    const textDataLength = videoData.textData.length;
    let index = await searchForClosestPlayedIndexText();
    index++;
    if (index >= textDataLength) {
      return;
    }

    const tData = videoData.textData[index];
    player.seekTo(tData.s, true);
  };

  const destroy = () => {
    player.destroy();
  };

  const searchForClosestPlayedIndexText = async (): Promise<number> => {
    const time = await player.getCurrentTime();
    let index = -1;
    videoData.textData.forEach((tData, i) => {
      if (tData.s <= time) {
        index = i;
      }
    });

    return index;
  };

  const getCurrentText = async (): Promise<Array<IEnglishTextBlock>> => {
    const time = await player.getCurrentTime();
    for (const tData of videoData.textData) {
      if (tData.s <= time && time <= tData.e) {
        return tData.englishTextBlocks;
      }
    }

    return [];
  };

  videoData.textData.sort((a, b) => (a.s - b.s));

  const p = (PlayerFactory('yt-player') as any);
  const player: YouTubePlayer = (p as YouTubePlayer);
  player.loadVideoById(videoData.videoId, videoData.startFrom);
  play();

  return {play, pause, playPause, seekToLeftText, seekToRightText, getCurrentText, destroy};
};
