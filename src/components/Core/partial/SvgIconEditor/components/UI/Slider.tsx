interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  valueLabel?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// І компонент
export const Slider: React.FC<SliderProps> = ({
  label,
  valueLabel,
  value,
  onChange,
  ...props
}) => (
  <div className="space-y-1">
    {label && (
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500">
          {value}
          {valueLabel}
        </span>
      </div>
    )}
    <input
      type="range"
      value={value}
      onChange={onChange}
      className="w-full"
      {...props}
    />
  </div>
);