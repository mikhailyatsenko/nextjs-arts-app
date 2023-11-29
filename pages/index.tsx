import Layout from './layout';

import { fetchAllArts, artsApi } from '@/services/ArtService';
import { wrapper } from '@/store';
import { TransformedArtsListResponse } from '@/services/ArtService';

export default function Home(props: TransformedArtsListResponse) {
  return <Layout {...props} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log('context', context.query);
    const { page = '1', limit = '5', search = '' } = context.query;
    const data = await store.dispatch(
      fetchAllArts.initiate(`${search}&limit=${limit}&page=${page}`)
    );

    await Promise.all(store.dispatch(artsApi.util.getRunningQueriesThunk()));
    return { props: { ...data.data } };
  }
);
