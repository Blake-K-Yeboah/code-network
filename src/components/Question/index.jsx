// Styles
import styles from "./styles";

// Prop Types
import PropTypes from "prop-types";

// React hook
import { useEffect, useState } from "react";

// toast
import { toast } from "react-toastify";

const Question = ({ question, setScore, nextQuestion, isLast }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    // Shuffle Answers Function
    useEffect(() => {
        setSelectedAnswer(null);

        let notRandomAnswers = [
            question.correct_answer,
            ...question.incorrect_answers,
        ];

        let newArray = [];

        while (notRandomAnswers.length > 0) {
            let randomIndex = Math.floor(
                Math.random() * notRandomAnswers.length
            );
            const entry = notRandomAnswers.splice(randomIndex, 1);
            newArray.push(entry);
        }

        setAnswers(newArray);

        // eslint-disable-next-line
    }, [question]);

    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            toast.error("Please select an answer", { theme: "colored" });
        } else {
            // Check If Correct Answer
            if (selectedAnswer[0] === question.correct_answer) {
                setScore((score) => score + 1);
                if (window.innerWidth < 1024) {
                    alert("Correct Answer");
                } else {
                    toast.success("Correct! Good Job!", { theme: "colored" });
                }
            } else {
                if (window.innerWidth < 1024) {
                    alert("Wrong Answer");
                } else {
                    toast.error("Wrong Answer! Bad Luck!", {
                        theme: "colored",
                    });
                }
            }

            // Move To Next Question
            nextQuestion();
        }
    };

    return (
        <>
            <div className={styles.questionContainer}>
                <h3
                    className={styles.question}
                    dangerouslySetInnerHTML={{ __html: question.question }}
                />
                {answers.map((ans) => {
                    return (
                        <p
                            className={`${styles.answer} ${
                                selectedAnswer === ans
                                    ? styles.selectedAnswer
                                    : styles.notSelectedAnswer
                            }`}
                            onClick={() => setSelectedAnswer(ans)}
                            dangerouslySetInnerHTML={{ __html: ans }}
                            key={ans}
                        />
                    );
                })}
            </div>
            <button
                className={`${styles.btn} ${styles.primaryBtn}`}
                onClick={handleNextQuestion}
            >
                {!isLast ? "Next Question" : "Finish Game"}
            </button>
        </>
    );
};

Question.propTypes = {
    question: PropTypes.object.isRequired,
    setScore: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    isLast: PropTypes.bool,
};

export default Question;
