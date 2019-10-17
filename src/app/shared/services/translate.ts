import axios from './axios';

export const translateWord = (word: string) => {
  return axios.get(`/translate/word/${word.toLocaleLowerCase()}`);
};
