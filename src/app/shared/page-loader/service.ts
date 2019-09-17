import { StoreSlicer } from 'app/slicer';

export interface ILoader {
  loading: boolean
}

const slicer = new StoreSlicer<ILoader>('shared.loader', {loading: false});
slicer.resetState();

export const getState = slicer.getState;

export const show = () => {
  slicer.dispatch(() => ({loading: true}));
};

export const hide = () => {
  slicer.dispatch(() => ({loading: false}));
};
