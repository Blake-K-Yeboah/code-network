// Styles
import styles from "./styles";

// useState hook
import { useState } from "react";

// Toast
import { toast } from "react-toastify";

// Axios
import axios from "axios";
import Question from "../Question";

const Game = () => {
    const [gameOptions, setGameOptions] = useState({
        questions: 10,
        difficulty: 1,
    });

    const difficulties = [null, "easy", "medium", "hard"];

    const [questionNum, setQuestionNum] = useState(0); // 0=game hasn't started

    const handleInputChange = (e) => {
        setGameOptions({
            ...gameOptions,
            [e.target.id]: e.target.value,
        });
    };

    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    const startGame = async () => {
        const reqUrl = `https://opentdb.com/api.php?amount=${
            gameOptions.questions
        }&category=18&difficulty=${
            difficulties[gameOptions.difficulty]
        }&type=multiple`;

        try {
            const res = await axios.get(reqUrl);
            setQuestions(res.data.results);
            setQuestionNum(1);
            setScore(0);
        } catch (err) {
            toast.error(
                "There was an error starting the game. Please try again later"
            );
        }
    };

    const nextQuestion = () => {
        if (questionNum === questions.length) {
            // Conclude Game
            setQuestionNum(50);
        } else {
            setQuestionNum(questionNum + 1);
        }
    };

    return (
        <div className={styles.gameBox}>
            {questionNum === 0 ? (
                <>
                    <h2 className={styles.welcome}>Welcome To Tech Trivia</h2>
                    <p className={styles.paragraph}>
                        Please use the sliders below to apply your desired game
                        settings and then click play!
                    </p>
                    <div className={styles.options}>
                        <p className={styles.optionName}>Number Of Questions</p>
                        <div className={styles.rangeContainer}>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={gameOptions.questions}
                                onChange={handleInputChange}
                                id="questions"
                                className={styles.rangeInput}
                            />
                            <span className={styles.optionValue}>
                                {gameOptions.questions}
                            </span>
                        </div>
                        <p className={styles.optionName}>Difficulty Level</p>
                        <div className={styles.rangeContainer}>
                            <input
                                type="range"
                                min="1"
                                max="3"
                                value={gameOptions.difficulty}
                                onChange={handleInputChange}
                                id="difficulty"
                                className={styles.rangeInput}
                            />
                            <span className={styles.optionValue}>
                                {difficulties[gameOptions.difficulty]}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={startGame}
                        className={`${styles.btn} ${styles.primaryBtn} mt-10`}
                    >
                        Play Game
                    </button>
                </>
            ) : questionNum === 50 ? (
                <>
                    <h2 className={styles.welcome}>Game Finished!</h2>
                    <p className={styles.paragraph}>
                        Congratulations! You scored {score} out of{" "}
                        {questions.length} questions.
                    </p>
                    <button
                        className={`${styles.btn} ${styles.primaryBtn} ${styles.btnMt}`}
                        onClick={() => setQuestionNum(0)}
                    >
                        Play Again
                    </button>
                </>
            ) : (
                <>
                    <h5 className={styles.score}>
                        Your Score: {score}/{questions.length}
                    </h5>
                    <Question
                        question={questions[questionNum - 1]}
                        setScore={setScore}
                        nextQuestion={nextQuestion}
                        isLast={questionNum === questions.length}
                    />
                </>
            )}
        </div>
    );
};

export default Game;
