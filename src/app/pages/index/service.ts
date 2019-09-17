import * as pageLoaderService from 'app/shared/page-loader/service';
import { StoreSlicer } from 'app/slicer';

export interface IPage {
  data: string
  count: number
}

const slicer = new StoreSlicer<IPage>('pages.index', {data: 'foo', count: 0});
slicer.resetState();

export const getState = slicer.getState;

export const somefunc = () => {
  pageLoaderService.show();
  setTimeout(() => {
    pageLoaderService.hide();
  }, 1000);
};



