import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const localDb = JSON.parse(localStorage.getItem("user"));

  return isAuthenticated ? (
    <div>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
    </div>
  ) : (
    <div>
      <h4>{localDb.username}</h4>
      <p>{localDb.email}</p>
    </div>
  );
};

export default Profile;
