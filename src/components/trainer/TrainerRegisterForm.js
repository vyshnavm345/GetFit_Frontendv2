import React from 'react'
import { useState } from 'react';
import countries from "../resources.js";
import { specialized } from "../resources.js";
import { useDispatch, useSelector } from 'react-redux';
import { addTrainer } from 'features/trainer.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const TrainerRegisterForm = () => {
    const { user } = useSelector((state) => state.user);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [profile_picture, setProfilePicture] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
      specalized: "",
      phone: "",
      certifications: "",
      experience_years: 0,
      country: "",
      about: "",
      profile_picture: user.profile_picture,
    });

    const {
      specalized,
      certifications,
      experience_years,
      country,
      about,
    } = formData;

     const onChange = (e) => {
        if (e.target.name === "phone"){
            const value = e.target.value;
            setPhoneNumber(value);
            const phoneRegex = /^\d{10}$/;
            setIsValidPhone(phoneRegex.test(value));
        }
        else{

            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
     };

     const onSubmit = (e) => {
       e.preventDefault();
        if (isValidPhone){
            // setFormData({ ...formData, ['phone']: phoneNumber });
            dispatch(
              addTrainer({
                specalized,
                phone: phoneNumber,
                certifications,
                experience_years,
                country,
                about,
                profile_picture,
              })
            );
            navigate("/userProfile");
        } else {
            toast.error("invalid credentials");
        }
     };

  return (
    <div className="mx-1  md:mx-20 py-20 bg-black/85 text-white">
      <form
        onSubmit={onSubmit}
        className="px-5 py-5"
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 ">
            <h2 className="  leading-7 font-blackops-one text-3xl mb-2">
              Trainer Registration Form
            </h2>
            <p className="mt-1 text-sm font-semibold leading-6 ">
              Fill the form to register as a trainer.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className=" text-3xl  font-bold leading-7 ">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Experience
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="experience_years"
                    placeholder="In years"
                    onChange={onChange}
                    value={experience_years}
                    required
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div >
                <label
                  htmlFor="profile-picture"
                  className="text-sm text-gray-700 block mb-1 font-medium "
                >
                  Profile Picture
                </label>
                {profile_picture instanceof File && (
                  <img
                    className="h-28 ml-10"
                    src={URL.createObjectURL(profile_picture)}
                    alt="img"
                  />
                )}
                <input
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  name="profile_picture"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Certifications
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="certifications"
                    id="certifications"
                    placeholder="Certifications if any"
                    onChange={onChange}
                    value={certifications}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 ">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={onChange}
                    value={phoneNumber}
                    placeholder="Enter 10 digit Phone Number"
                    required
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {!isValidPhone && (
                    <p className="mt-1 text-red-500 text-sm">
                      Please enter a valid phone number.
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Specalized In
                </label>
                <div className="mt-2">
                  <select
                    id="Specalized"
                    name="specalized"
                    onChange={onChange}
                    value={specalized}
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>--none--</option>
                    {specialized.map((specality, index) => (
                      <option key={index} value={specality}>
                        {specality}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    onChange={onChange}
                    value={country}
                    required
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>--none--</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 ">
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    onChange={onChange}
                    value={about}
                    className="pl-3 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p className="text-white opacity-40 mt-2">
                  Say Something about yourself
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="text-sm font-semibold leading-6 "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainerRegisterForm