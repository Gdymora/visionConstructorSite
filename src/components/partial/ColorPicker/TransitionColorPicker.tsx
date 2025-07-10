import './TransitionColorPicker.css'; // Ensure your CSS styles are included

import { ChromePicker, SketchPicker } from 'react-color';
import { useState, useRef, useEffect, useCallback } from 'react';

// https://casesandberg.github.io/react-color/

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const ColorElement = ({ initialColor, onCopy }) => {
    const root = useRef(null);

    useEffect(() => {
        if (root.current) {
            root.current.style.setProperty('--color', initialColor);
        }
    }, [initialColor]);

    const handleCopy = () => {
        navigator.clipboard.writeText(initialColor).then(() => {
            onCopy(initialColor); // Pass color to the parent component
        });
    };

    return (
        <div className="transition-color-picker__color" ref={root} onClick={handleCopy}>
            <div className="transition-color-picker__icon transition-color-picker__copy-icon">
                <svg viewBox="0 0 32 32">
                    <path
                        d="m25 2h-14a3 3 0 0 0 -3 3v1h-1a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3v-18a3 3 0 0 0 -3-3zm-3 25a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1-1v-18a1 1 0 0 1 1-1h1v15a3 3 0 0 0 3 3h11zm4-4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1-1v-18a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"
                        fill="currentColor"
                    />
                </svg>
                <svg viewBox="0 -65 512 512" style={{ opacity: 0 }}>
                    <path
                        d="m444.175781 0-260.871093 242.011719-110.324219-117.734375-72.980469 68.386718 178.234375 190.207032 333.765625-309.351563zm0 0"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>
    );
};

const ColorElementInput = ({ initialColor, onChange, className }) => {
    const [color, setColor] = useState(initialColor);
    const rootRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    const handleColorChange = (color) => {
        //const newColor = color.target.value;
        const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
        setColor(newColor);
        onChange(newColor);
    };

    const handleShowPicker = () => {
        setShowPicker(!showPicker);
    };

    useEffect(() => {
        if (rootRef.current) {
            rootRef.current.style.setProperty('--color', color);
        }
    }, [color]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target) && !rootRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={rootRef} className={`transition-color-picker__color ${className}`}>
            {/* <input type="color" className="transition-color-picker__input" value={color} onChange={handleColorChange} /> */}

            {showPicker && (
                <div ref={pickerRef} className="color-picker-popup">
                    <SketchPicker className={''} color={color} onChange={handleColorChange} />
                    {/* <ChromePicker className={''} color={color} onChange={handleColorChange} /> */}
                </div>
            )}
            <div className="transition-color-picker__icon" onClick={handleShowPicker}>
                <svg viewBox="0 0 24 24">
                    <path
                        d="m21.251 3.827a4.263 4.263 0 0 0 -6.5-.59 4.292 4.292 0 0 0 -.97 1.52 6.24 6.24 0 0 1 -1.39 2.37l-.26-.26a1 1 0 0 0 -1.41 0 1.008 1.008 0 0 0 0 1.42l.26.26-7.538 7.532a4.925 4.925 0 0 0 -1.19 5.041 1.035 1.035 0 0 0 .63.63 5.048 5.048 0 0 0 1.57.25 4.9 4.9 0 0 0 3.47-1.44l7.539-7.541.26.26a.97.97 0 0 0 .7.3 1.005 1.005 0 0 0 .71-1.71l-.26-.26.22-.22a4.754 4.754 0 0 1 1.97-1.1 4.232 4.232 0 0 0 2.18-1.61 4.28 4.28 0 0 0 .009-4.852zm-14.751 15.322a2.86 2.86 0 0 1 -2.47.82 2.891 2.891 0 0 1 .82-2.47l7.539-7.541 1.65 1.65z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>
    );
};

const TransitionColorPicker = ({ fromColor, toColor, initialTransitionLength, onColorCopied }) => {
    const [numberOfTransitionColors, setNumberOfTransitionColors] = useState(initialTransitionLength || 0);
    const [transitionColors, setTransitionColors] = useState([]);
    const containerRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [_fromColor, setFromColor] = useState(fromColor);
    const [_toColor, setToColor] = useState(toColor);

    const handleDrag = useCallback(
        (e) => {
            if (!dragging) return;
            const offsetX = e.clientX - containerRef.current.getBoundingClientRect().left;
            const numberOfColorsToAdd = Math.floor(offsetX / 20); // Adjust 20 to your desired color size
            setNumberOfTransitionColors(numberOfColorsToAdd);
        },
        [dragging]
    );

    useEffect(() => {
        document.addEventListener('pointermove', handleDrag);
        document.addEventListener('pointerup', () => setDragging(false));
        return () => {
            document.removeEventListener('pointermove', handleDrag);
            document.removeEventListener('pointerup', () => setDragging(false));
        };
    }, [handleDrag]);

    useEffect(() => {
        const newColors = [];
        for (let i = 1; i <= numberOfTransitionColors; i++) {
            const ratio = i / (numberOfTransitionColors + 1);
            try {
                newColors.push(getColorAt(ratio));
            } catch (e) {
                console.error(e);
            }
        }
        setTransitionColors(newColors);
    }, [numberOfTransitionColors, _fromColor, _toColor]);

    const rgbaToComponents = (rgba) => {
        const match = rgba.match(/rgba?\((\d+), (\d+), (\d+), ([0-9.]+)\)/);
        if (!match) {
            throw new Error('Invalid RGBA format');
        }
        return {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: parseFloat(match[4]),
        };
    };
    const getColorAt = (ratio) => {
        const fromComponents = rgbaToComponents(_fromColor);
        const toComponents = rgbaToComponents(_toColor);

        const r = clamp(Math.ceil(fromComponents.r * (1 - ratio) + toComponents.r * ratio), 0, 255);
        const g = clamp(Math.ceil(fromComponents.g * (1 - ratio) + toComponents.g * ratio), 0, 255);
        const b = clamp(Math.ceil(fromComponents.b * (1 - ratio) + toComponents.b * ratio), 0, 255);
        const a = clamp(fromComponents.a * (1 - ratio) + toComponents.a * ratio, 0, 1);

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const getColorAtHex = (ratio) => {
        const r = clamp(
            Math.ceil(parseInt(_fromColor.substring(1, 3), 16) * (1 - ratio) + parseInt(_toColor.substring(1, 3), 16) * ratio),
            0,
            255
        );
        const g = clamp(
            Math.ceil(parseInt(_fromColor.substring(3, 5), 16) * (1 - ratio) + parseInt(_toColor.substring(3, 5), 16) * ratio),
            0,
            255
        );
        const b = clamp(
            Math.ceil(parseInt(_fromColor.substring(5, 7), 16) * (1 - ratio) + parseInt(_toColor.substring(5, 7), 16) * ratio),
            0,
            255
        );

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    const handleColorChange = () => {
        setNumberOfTransitionColors(Math.floor(numberOfTransitionColors));
    };

    return (
        <div className="transition-color-picker" ref={containerRef}>
            <ColorElementInput
                initialColor={_fromColor}
                className="transition-color-picker__from-color"
                onChange={(color) => {
                    setFromColor(color);
                    handleColorChange();
                }}
            />
            <div className="transition-color-picker__container">
                {transitionColors.map((color, index) => (
                    <ColorElement
                        key={index}
                        initialColor={color}
                        onCopy={onColorCopied} // Pass the color copied function
                    />
                ))}
            </div>
            <ColorElementInput
                initialColor={_toColor}
                className="transition-color-picker__to-color"
                onChange={(color) => {
                    setToColor(color);
                    handleColorChange();
                }}
            />
            <div className="transition-color-picker__shadow" onMouseDown={() => setDragging(true)}></div>
            <div className="transition-color-picker__back-color"></div>
        </div>
    );
};

export default TransitionColorPicker;

/* 
https://codepen.io/tahazsh/pen/zYMwEXp
const ParentComponent = () => {
    const [copiedColor, setCopiedColor] = useState('');

    const handleColorCopied = (color) => {
        setCopiedColor(color);
    };

    return (
        <div>
            <h1>Copied Color: {copiedColor}</h1>
            <TransitionColorPicker
                fromColor="#ff0000"
                toColor="#00ff00"
                initialTransitionLength={10}
                onColorCopied={handleColorCopied}
            />
        </div>
    );
};

*/
