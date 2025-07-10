import { useEffect, useState } from "react";

export const useTimer = (initialTime: number, onComplete?: () => void) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [timeLeft, onComplete]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    const resetTimer = () => setTimeLeft(initialTime);

    return { timeLeft, formatTime, resetTimer };
};