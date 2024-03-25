import Layout from "components/Layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "features/user";

const EditProfile = () => {
    const dispatch = useDispatch();
    const { registered, loading } = useSelector((state) => state.user);
    const [profile_picture, setProfilePicture] = useState(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const { first_name, last_name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData();

        formdata.append("first_name", first_name);
        formdata.append("last_name", last_name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("profile_picture", profile_picture);

        dispatch(register(formdata));
    };

    return (
        <Layout title="Auth Site | Register" content="Register page">
        <div className="mt-10" >

        
        </div>
        </Layout>
    );
};

export default EditProfile;

// <h1>Update Your Profile</h1>
//       <form className="mt-5" onSubmit={onSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label className="form-label" htmlFor="first_name">
//             First Name
//           </label>
//           <input
//             className="form-control"
//             type="text"
//             name="first_name"
//             onChange={onChange}
//             value={first_name}
//             required
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label className="form-label" htmlFor="last_name">
//             Last Name
//           </label>
//           <input
//             className="form-control"
//             type="text"
//             name="last_name"
//             onChange={onChange}
//             value={last_name}
//             required
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label className="form-label" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="form-control"
//             type="email"
//             name="email"
//             onChange={onChange}
//             value={email}
//             required
//           />
//         </div>
//         <div className="form-group mt-3 mb-3">
//           <label className="form-label" htmlFor="password">
//             Password
//           </label>
//           <input
//             className="form-control"
//             type="password"
//             name="password"
//             onChange={onChange}
//             value={password}
//             required
//           />
//         </div>
//         <div className="upload-section">
//           <label for="profile-picture" className="file-label">
//             Upload Profile Image &nbsp;
//           </label>
//           <input
//             id="profile-picture"
//             className="upload-input"
//             type="file"
//             onChange={(e) => setProfilePicture(e.target.files[0])}
//             name="profile_picture"
//             required
//           />
//         </div>
//         {loading ? (
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         ) : (
//           <button className="btn btn-primary mt-4">update</button>
//         )}
//       </form>


//bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded