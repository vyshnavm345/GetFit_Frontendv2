
import { Helmet } from 'react-helmet';

import Navbar3 from './Navbar3';
import Footer from './Footer';


const Layout = ({title, content, children}) =>(
    <>
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={content}/>
    </Helmet>
        <Navbar3/>
        <div className=" scrollbar-hide">
            {children}
        </div>
        <Footer/>
    </>
)

export default Layout