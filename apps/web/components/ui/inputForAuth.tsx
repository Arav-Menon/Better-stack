import { cn } from "@/lib/utils";

interface CustomInput {
  type: string;
  placeholder: string;
  variant: string;
  className?: string;
  autoComplete?: string;
  required?: boolean;
  name?: string;
  onChange: (e: any) => void;
}

export default function CustomInput({
  type,
  placeholder,
  variant = "default",
  className,
  onChange,
  name,
  autoComplete,
  required,
}: CustomInput): React.JSX.Element {
  const variants = {
    default:
      "w-full px-4 py-3 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-transparent transition-all duration-200",
  };

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          variants[variant as keyof typeof variants] ?? variants.default,
          className
        )}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
      />
    </>
  );
}
