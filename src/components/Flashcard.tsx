import React from 'react';
import './Flashcard.css';

interface FlashcardProps {
    sideA: string;
    sideB: string;
    isFlipped: boolean;
    onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ sideA, sideB, isFlipped, onFlip }) => {
    return (
        <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
            <div className="flashcard">
                <div className="side side-a">
                    <div className="content">{sideA}</div>
                </div>
                <div className="side side-b">
                    <div className="content">{sideB}</div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
