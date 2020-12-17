import { StoreSlicer } from 'app/slicer';
import axios from 'app/shared/services/axios';

export interface IPage {
  data: string
  count: number
}

const slicer = new StoreSlicer<IPage>('pages.index', {data: 'foo', count: 0});
slicer.resetState();

export const getState = slicer.getState;

export const getAllCategories = async () => {
  return await axios.get('/channel/all').then(response => response.data);

};
