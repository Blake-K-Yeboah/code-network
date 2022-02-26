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
import { useEffect } from "react";

// axios
import axios from "axios";

const PostsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch Users And Posts
        const fetchUsersAndPosts = async () => {
            try {
                const usersRes = await axios.get("/api/users-get");
                dispatch(setUsers(usersRes.data.result.reverse()));

                const postsRes = await axios.get("/api/posts-get");
                dispatch(setPosts(postsRes.data.result.reverse()));
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsersAndPosts();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Helmet>
                <title>Code Network - Posts</title>
            </Helmet>
            <Navbar />
            <Feed type="posts" />
        </>
    );
};

export default PostsPage;
