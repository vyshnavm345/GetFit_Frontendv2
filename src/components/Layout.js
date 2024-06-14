
import { Helmet } from 'react-helmet';

import Navbar3 from './Navbar3';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import NotificationComponent from './layouts/NotificationComponent';
import { ToastContainer } from 'react-toastify';
import HomeFooter from './HomeFooter';
// import NotificationComponent from './layouts/notificationComponent';


const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <ScrollToTop />
    <Navbar3 />
    {/* <ToastContainer /> */}
    {/* <NotificationComponent> */}
    <div className=" scrollbar-hide">{children}</div>
    {/* </NotificationComponent> */}
    <HomeFooter />
    {/* <Footer /> */}
  </>
);

export default Layout

