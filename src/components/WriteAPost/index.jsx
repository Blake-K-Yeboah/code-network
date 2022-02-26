// Styles
import styles from "./styles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../slices/postsSlice";

// Icons
import { BsEmojiSmile } from "react-icons/bs";

// useState hook
import { useState } from "react";

// Toast
import { toast } from "react-toastify";

// Axios
import axios from "axios";

const WriteAPost = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const [userInput, setUserInput] = useState({
        title: "",
        body: "",
    });

    const handleInputChange = (e) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Make Request
        try {
            const res = await axios.post("/api/posts-create", userInput, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            dispatch(addPost(res.data));
            toast.success("Posted successfully!", { theme: "colored" });
            setUserInput({
                title: "",
                body: "",
            });
        } catch (err) {
            toast.error(err.response.data.msg, { theme: "colored" });
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.shareContainer}>
                <img
                    src={`/img/profilePics/${user.profilePic}`}
                    alt=""
                    className={styles.profilePic}
                />
                <span className={styles.shareText}>
                    Write a Post <BsEmojiSmile className={styles.icon} />
                </span>
            </div>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="title">
                        Title:
                    </label>
                    <input
                        className={styles.input}
                        id="title"
                        onChange={handleInputChange}
                        value={userInput.title}
                        placeholder="Give your post a title"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="title">
                        Body:
                    </label>
                    <textarea
                        className={styles.input}
                        id="body"
                        onChange={handleInputChange}
                        value={userInput.body}
                        placeholder="Whats on your mind?"
                    />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitBtn}>
                        Post Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WriteAPost;
