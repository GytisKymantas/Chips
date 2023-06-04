import Box from '@mui/material/Box';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import ModalContainer from '../components/Modal';
import store from '../store/store';

const IndexPage = () => (
  <Provider store={store}>
    <Layout title='Home | Next.js + TypeScript Example'>
      <Box sx={{ fontFamily: 'Poppins' }}>
        <ModalContainer />
      </Box>
    </Layout>
  </Provider>
);

export default IndexPage;
