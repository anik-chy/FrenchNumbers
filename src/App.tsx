import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import { numberToFrench } from './utils/frenchNumbers';

type Mode = 'num-to-word' | 'word-to-num' | 'mixed';

interface CardData {
    sideA: string;
    sideB: string;
}

function App() {
    const [mode, setMode] = useState<Mode>('num-to-word');
    const [maxRange, setMaxRange] = useState(100);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardData, setCardData] = useState<CardData>({ sideA: '', sideB: '' });

    const generateNewCard = useCallback(() => {
        const newNum = Math.floor(Math.random() * (maxRange + 1));
        const frenchWord = numberToFrench(newNum);

        let a = '';
        let b = '';

        let currentMode = mode;
        if (mode === 'mixed') {
            currentMode = Math.random() > 0.5 ? 'num-to-word' : 'word-to-num';
        }

        if (currentMode === 'num-to-word') {
            a = newNum.toLocaleString();
            b = frenchWord;
        } else {
            a = frenchWord;
            b = newNum.toLocaleString();
        }


        setCardData({ sideA: a, sideB: b });
        setIsFlipped(false);
    }, [mode, maxRange]);

    // Initial card
    useEffect(() => {
        generateNewCard();
    }, [maxRange]); // Regerate when range changes, but not necessarily when mode changes to avoid jarring flip

    return (
        <div className="app-container">
            <header>
                <h1>Apprendre les nombres</h1>
                <p className="subtitle">Master French numbers with interactive flashcards</p>
            </header>

            <main>
                <Flashcard
                    sideA={cardData.sideA}
                    sideB={cardData.sideB}
                    isFlipped={isFlipped}
                    onFlip={() => setIsFlipped(!isFlipped)}
                />

                <Controls
                    mode={mode}
                    setMode={setMode}
                    maxRange={maxRange}
                    setMaxRange={setMaxRange}
                    onNext={generateNewCard}
                />
            </main>

            <footer>
                <p>Built for language learners</p>
            </footer>
        </div>
    );
}

export default App;
