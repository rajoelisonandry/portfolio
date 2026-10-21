interface TagListProps {
  tags: readonly string[];
  label: string;
}

export function TagList({ tags, label }: TagListProps) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label={label}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-accent-soft px-3 py-1 text-xs leading-5 font-medium text-accent"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
