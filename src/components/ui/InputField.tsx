import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[16px] font-medium text-[#111416] font-['Plus_Jakarta_Sans']">
          {label}
        </label>
      )}
      <div className="h-[48px] border border-solid border-[#dde0e2] rounded-[12px] flex items-center px-4">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full h-full outline-none text-[16px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] bg-transparent ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;