import React, { useEffect, useRef, useState } from 'react';

interface TextAreaProps {
    placeholder?: string;
    children?: string;
    onChange?: (value: string) => void;
}

export default function TextArea({ placeholder = '', children = '', onChange }: TextAreaProps) {
  const [value, setValue] = useState(children);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
        const textarea = textAreaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
  }, [children]);
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);

    if(onChange) {
        onChange(event.target.value);
    }

    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  return (
    <textarea
      ref={textAreaRef}
      className="resize-none bg-transparent outline-none p-2 w-full overflow-hidden placeholder:text-black"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      autoFocus={true}
    />
  );
};
