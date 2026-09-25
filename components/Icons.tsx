type IconProps = {
  className?: string;
};

export function HeartIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <path
        d="M12 20.5s-7.2-4.6-9.7-9.1C.7 8.1 2 4.8 5.3 4.1c2-.4 3.9.5 5 2.1a1 1 0 0 0 1.4 0c1.1-1.6 3-2.5 5-2.1 3.3.7 4.6 4 3 7.3-2.5 4.5-9.7 9.1-9.7 9.1Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FlagIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <path d="M5 21V4" strokeLinecap="round" />
      <path
        d="M5 5c2-1.3 4-1.3 6 0s4 1.3 6 0v8c-2 1.3-4 1.3-6 0s-4-1.3-6 0V5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
