// Helmet
import { Helmet } from "react-helmet";

// Redux hooks
import { useDispatch } from "react-redux";
import { setUsers } from "../slices/usersSlice";

// Components
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";

// useEffect hook
import { useEffect } from "react";

// axios
import axios from "axios";

const TriviaPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch Users
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/api/users-get");
                dispatch(setUsers(res.data.result));
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Helmet>
                <title>Code Network - Tech Trivia</title>
            </Helmet>
            <Navbar />
            <Feed type="trivia" />
        </>
    );
};

export default TriviaPage;
