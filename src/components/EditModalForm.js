import { update } from "features/user";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Modal() {
    const dispatch = useDispatch();
    const {user} = useSelector(state=> state.user)
    const [showModal, setShowModal] = useState(false);
    const [profile_picture, setProfilePicture] = useState(null);

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture,
        profile: {
            height: user.profile.height,
            weight: user.profile.weight,
            body_fat: user.profile.body_fat,
            age: user.profile.age,
            phone: user.profile.phone,
        },
    });

    const { first_name, last_name, email, password } = formData;
    const {height, weight, body_fat, age, phone} = formData.profile


    const onChange = (e) => {
        if (e.target.name.startsWith("profile.")) {
            // Update nested property inside profile
            const profileKey = e.target.name.split(".")[1];
            setFormData({
            ...formData,
            profile: {
                ...formData.profile,
                [profileKey]: e.target.value,
            },
            });
        } else {
            // Update top-level property
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        const formdata = new FormData();

        
        formdata.append("id", user.id);
        formdata.append("first_name", first_name);
        formdata.append("last_name", last_name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("profile_picture", profile_picture);
        
        const profileData = formData.profile;
        formdata.append("height", profileData.height);
        formdata.append("weight", profileData.weight);
        formdata.append("body_fat", profileData.body_fat);
        formdata.append("age", profileData.age);
        formdata.append("phone", profileData.phone);
        
        console.log("before dispatching : ",formdata)
        setShowModal(false);

        dispatch(update(formdata));
    };


    return (
    <>
    <button
        className="bg-blue-400 text-white active:bg-blue-400 hover:text-[#111] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-white hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:-translate-y-0.5"
        type="button"
        onClick={() => setShowModal(true)}
    >
        update profile
    </button>
    {showModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Update Profile</h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="p-8  rounded border border-gray-200">
                {" "}
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    {" "}
                    <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    {" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="first_name"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        First Name
                        </label>{" "}
                        <input
                        type="text"
                        name="first_name"
                        onChange={onChange}
                        value={first_name}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Enter your first_name"
                        />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="last_name"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Last Name
                        </label>{" "}
                        <input
                        type="text"
                        name="last_name"
                        onChange={onChange}
                        value={last_name}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Enter your last_name"
                        />{" "}
                    </div>{" "}
                    {/* <div>
                        {" "}
                        <label
                        htmlFor="email"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Email Address
                        </label>{" "}
                        <input
                        type="text"
                        name="email"
                        onChange={onChange}
                        value={email}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="yourmail@provider.com"
                        />{" "}
                    </div>{" "} */}
                    <div>
                        {" "}
                        <label
                        htmlFor="profile-picture"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Profile Picture
                        </label>{" "}
                        <input
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        type="file"
                        onChange={(e) =>
                            setProfilePicture(e.target.files[0])
                        }
                        name="profile_picture"
                        
                        />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="weight"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Weight
                        </label>{" "}
                        <input
                        type="text"
                        name="profile.weight"
                        onChange={onChange}
                        value={weight}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Your weight in Kg"
                        />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="height"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Height
                        </label>{" "}
                        <input
                        type="text"
                        name="profile.height"
                        onChange={onChange}
                        value={height}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Your height in cm"
                        />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="age"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Age
                        </label>{" "}
                        <input
                        type="text"
                        name="profile.age"
                        onChange={onChange}
                        value={age}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Your weight in Kg"
                        />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="body_fat"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Body Fat
                        </label>{" "}
                        <input
                        type="text"
                        name="profile.body_fat"
                        onChange={onChange}
                        value={body_fat}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Your body fat in %"
                        />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <label
                        htmlFor="phone"
                        className="text-sm text-gray-700 block mb-1 font-medium"
                        >
                        Phone
                        </label>{" "}
                        <input
                        type="text"
                        name="profile.phone"
                        onChange={onChange}
                        value={phone}
                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                        placeholder="Your Phone number"
                        />{" "}
                    </div>{" "}
                    {/* <div>
                    {" "}
                    <label
                    for="brithday"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                    Birthday
                    </label>{" "}
                    <input
                    type="text"
                    name="brithday"
                    id="brithday"
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="(01/01/1993)"
                    />{" "}
                </div>{" "} */}
                    </div>{" "}
                    <div className="space-x-4 mt-8"> </div> {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={onSubmit}
                    >
                        Save Changes
                    </button>
                    </div>
                </form>{" "}
                </div>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
    </>
);
}
