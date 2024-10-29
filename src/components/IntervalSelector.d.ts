import React from 'react';
interface IntervalSelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}
declare const IntervalSelector: React.FC<IntervalSelectorProps>;
export default IntervalSelector;
