'use client';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export function Switch({ checked, onChange, disabled = false, id }: SwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      type="button"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        group relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center
        rounded-full border-2 border-transparent transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-40
        ${checked ? 'bg-primary' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white
          shadow-[0_1px_3px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)]
          ring-0 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${checked ? 'translate-x-[20px]' : 'translate-x-[1px]'}
        `}
      />
    </button>
  );
}
