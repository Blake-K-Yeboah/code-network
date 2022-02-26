// Helmet
import { Helmet } from "react-helmet";

// Redux hooks
import { useDispatch } from "react-redux";
import { setUsers } from "../slices/usersSlice";
import { setPosts } from "../slices/postsSlice";

// Components
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";

// useEffect hook
import { useEffect, useState } from "react";

// axios
import axios from "axios";

// Router Hooks
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const dispatch = useDispatch();

    const [profileUser, setProfileUser] = useState(null);

    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch Users And Posts
        const fetchUsersAndPosts = async () => {
            try {
                const usersRes = await axios.get("/api/users-get");
                dispatch(setUsers(usersRes.data.result));

                const postsRes = await axios.get("/api/posts-get");
                dispatch(setPosts(postsRes.data.result.reverse()));
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsersAndPosts();
        // eslint-disable-next-line
    }, [username]);

    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        if (users !== null) {
            let filteredUsers = users.filter(
                (user) => user.username === username
            );
            if (filteredUsers.length > 0) {
                setProfileUser(filteredUsers[0]);
            } else {
                navigate("/");
            }
        }
    }, [users]);

    return (
        <>
            <Helmet>
                <title>
                    Code Network -{" "}
                    {profileUser ? profileUser.name : "Loading..."}
                </title>
            </Helmet>
            <Navbar />
            <Feed type="profile" user={profileUser} />
        </>
    );
};

export default ProfilePage;
