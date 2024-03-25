import Navbar from 'components/Navbar';
import { Helmet } from 'react-helmet';
import Navbar2 from './Navbar2';
import Navbar3 from './Navbar3';


const Layout = ({title, content, children}) =>(
    <>
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={content}/>
    </Helmet>
        {/* <Navbar/> */}
        <Navbar3/>
        <div className=" scrollbar-hide">
            {children}
        </div>
    </>
)

export default Layout