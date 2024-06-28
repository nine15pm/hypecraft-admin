import React from "react";

interface InputGroupProps {
  customClasses?: string;
  name: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  icon_svg?: any;
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  name,
  label,
  type,
  value,
  placeholder,
  required,
  icon_svg,
}) => {
  return (
    <>
      <div className={customClasses}>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
        </label>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
         {icon_svg}
        </span>
      </div>
    </>
  );
};

export default InputGroup;
