import Layout from "components/Layout";
import React from "react";
import { useSelector } from "react-redux";
import ProfileHeroSection from "components/ProfileHeroSection";
import Loader2 from "components/Loader2";


const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <Layout title="Get-Fit | Pofile" content="Profile page">
      {loading || user === null ? (
        <Loader2 />
      ) : (
        <>
          
          <ProfileHeroSection user={user} />
        </>
      )}
    </Layout>
  );
};

export default UserProfile;

