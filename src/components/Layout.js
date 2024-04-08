
import { Helmet } from 'react-helmet';

import Navbar3 from './Navbar3';
import Footer from './Footer';
import Navbar2 from './Navbar2';


const Layout = ({title, content, children}) =>(
    <>
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={content}/>
    </Helmet>
        <Navbar3/>
        {/* <Navbar2/> */}
        <div className=" scrollbar-hide">
            {children}
        </div>
        <Footer/>
    </>
)

export default Layout