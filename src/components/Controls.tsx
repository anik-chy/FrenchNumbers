import React from 'react';
import './Controls.css';

type Mode = 'num-to-word' | 'word-to-num' | 'mixed';

interface ControlsProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
    maxRange: number;
    setMaxRange: (range: number) => void;
    onNext: () => void;
}

const Controls: React.FC<ControlsProps> = ({ mode, setMode, maxRange, setMaxRange, onNext }) => {
    const ranges = [10, 100, 1000, 10000, 100000, 1000000];

    return (
        <div className="controls">
            <div className="control-group">
                <label>Mode</label>
                <div className="button-group">
                    <button
                        className={mode === 'num-to-word' ? 'active' : ''}
                        onClick={() => setMode('num-to-word')}
                    >
                        123 → ABC
                    </button>
                    <button
                        className={mode === 'word-to-num' ? 'active' : ''}
                        onClick={() => setMode('word-to-num')}
                    >
                        ABC → 123
                    </button>
                    <button
                        className={mode === 'mixed' ? 'active' : ''}
                        onClick={() => setMode('mixed')}
                    >
                        🔀 Mixed
                    </button>
                </div>
            </div>

            <div className="control-group">
                <label>Max Number: {maxRange.toLocaleString()}</label>
                <div className="range-presets">
                    {ranges.map(r => (
                        <button
                            key={r}
                            className={maxRange === r ? 'active' : ''}
                            onClick={() => setMaxRange(r)}
                        >
                            {r.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>

            <button className="next-btn" onClick={onNext}>
                Next Number
            </button>
        </div>
    );
};

export default Controls;
