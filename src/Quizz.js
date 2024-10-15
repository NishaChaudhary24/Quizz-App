import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Quizz.css';

const Quizz = ({ nav }) => {
    const [username] = useState(localStorage.getItem('username'));
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const questions = [
        { id: 1, question: "What is addition of 2+2?", option: [4, 6, 5, 8], answer: 4 },
        { id: 2, question: "What is subtraction of 6-4?", option: [5, 3, 2, 1], answer: 2 },
        { id: 3, question: "What is division of 10/2?", option: [5, 3, 6, 4], answer: 5 },
        { id: 4, question: "What is multiplication of 3*3?", option: [6, 7, 8, 9], answer: 9 },
        { id: 5, question: "What is square of 11?", option: [221, 121, 112, 212], answer: 121 },
    ];

    const calculateScore = () => {
        let calculatedScore = 0;
        questions.forEach((question) => {
            if (parseInt(selectedAnswers[question.id]) === question.answer) {
                calculatedScore++;
            }
        });
        setScore(calculatedScore);
    };

    const handleChange = (e, questionId) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length !== questions.length) {
            alert('Please answer all the questions.');
        } else {
            calculateScore();
        }
    };

    const handleDownload = () => {
        if (Object.keys(selectedAnswers).length !== questions.length) {
            alert('Please answer all the questions.');
        } else {
            const doc = new jsPDF();
            doc.text('Quizz Result', 10, 10);
            doc.text(`Successfully completed by ${username}`, 10, 20);
            doc.text(`Your Score: ${score}`, 10, 30);
            doc.save("quiz_result.pdf");
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <>
            <header className="quiz-header">
                <h1>Quizz App</h1>
            </header>
            <div className="quiz-container">
                {questions.map((item) => (
                    <div className="question-block" key={item.id}>
                        <h4>{`${item.id})`}</h4>
                        <h5>{item.question}</h5>
                        {item.option.map((option, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`question-${item.id}`}
                                    value={option}
                                    id={`flexRadioDisabled-${item.id}-${index}`}
                                    onChange={(e) => handleChange(e, item.id)} 
                                />
                                <label className="form-check-label" htmlFor={`flexRadioDisabled-${item.id}-${index}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}

                <button onClick={handleSubmit}>Submit</button>
                <br /><br />
                <div><button>Your Score: {score}</button></div>
                <br />
                
                <button onClick={handleDownload} className='Dbutton'>Download PDF</button>
                <br />
                <button onClick={handleLogout} className='Lbutton'>Log Out</button>
            </div>

            <footer className="quiz-footer">
                <p>&copy; 2024 Quizz App. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                    <a href="https://telegram.me/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTelegram} size="2x" />
                    </a>
                    <a href="https://instagram.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                </div>
            </footer>
        </>
    );
};

export default Quizz;
