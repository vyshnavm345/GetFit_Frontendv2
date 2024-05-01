
import { Helmet } from 'react-helmet';

import Navbar3 from './Navbar3';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';


const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <ScrollToTop />
    <Navbar3 />
    <div className=" scrollbar-hide">{children}</div>
    <Footer />
  </>
);

export default Layout