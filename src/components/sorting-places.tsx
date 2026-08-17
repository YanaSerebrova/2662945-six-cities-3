import { SortType } from '../const';

interface PlacesSortingProps {
  activeSort: SortType;
  isOpen: boolean;
  onToggle: () => void;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS = Object.values(SortType);

export function PlacesSorting({
  activeSort,
  isOpen,
  onToggle,
  onSortChange,
}: PlacesSortingProps) {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onToggle}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use href="#icon-arrow-select" />
        </svg>
      </span>

      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className={`places__option ${
                activeSort === option ? 'places__option--active' : ''
              }`}
              tabIndex={0}
              onClick={() => onSortChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
