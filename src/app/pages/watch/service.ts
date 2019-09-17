import * as pageLoaderService from 'app/shared/page-loader/service';
import { StoreSlicer } from 'app/slicer';

interface IData {
  count: number,
  ready: boolean
}

export interface IPage {
  data: IData,
  loading: boolean,
}

const slicer = new StoreSlicer<IData>('pages.watch', {count: 0, ready: false});
slicer.resetState();

export const init = () => {
  pageLoaderService.show();
  setTimeout(() => {
    pageLoaderService.hide();
    slicer.dispatch((state) => {
      return {...state, ready: true};
    })
  }, 700);

  return slicer.resetState;
};

export const getState = (state: any): IPage => {
  return {
    data: slicer.getState(state),
    loading: pageLoaderService.getState(state).loading
  };
};
