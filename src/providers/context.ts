import { createContext, useContext } from 'react';
import { Arts } from '../contatiners/ArtsLoader';

export const ArtDataContext = createContext<
  { query: string; arts: Arts } | undefined
>(undefined);

export function useArtDatarContext() {
  const ArtData = useContext(ArtDataContext);
  if (ArtData === undefined) {
    throw new Error('artData is undefined');
  }

  return ArtData;
}
