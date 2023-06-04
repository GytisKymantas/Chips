import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import ModalContainer from '../components/Modal';
import store from '../store/store';

const IndexPage = () => (
  <Provider store={store}>
    <Layout title='Home | Next.js + TypeScript Example'>
      <ModalContainer />
    </Layout>
  </Provider>
);

export default IndexPage;
