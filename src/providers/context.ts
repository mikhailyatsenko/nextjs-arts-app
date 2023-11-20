import { createContext, useContext } from 'react';
import { Arts } from '../contatiners/ArtsLoader';
import { DetailArt } from '../contatiners/ArtsLoader';

export const ArtDataContext = createContext<
  | {
      arts: Arts;
      detailArt: DetailArt;
      totalPages: number;
      currentPage: string;
    }
  | undefined
>(undefined);

export function useArtDatarContext() {
  const ArtData = useContext(ArtDataContext);
  if (ArtData === undefined) {
    throw new Error('artData is undefined');
  }

  return ArtData;
}
