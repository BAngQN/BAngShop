import "./CategoryFilter.css";

interface CategoryFilterProps {
    categories: string[];
    activeCategory?: string;
    onCategoryChange?: (category: string) => void;
}

function CategoryFilter({
    categories,
    activeCategory = "",
    onCategoryChange,
}: CategoryFilterProps) {
    console.log("activeCategory", activeCategory);
    return (
        <aside className="category-filter">
            <h3 className="category-filter__title">Categories</h3>
            <ul className="category-filter__list">
                <li className="category-filter__item">
                    <button
                        className={`category-filter__btn ${
                            activeCategory === "all"
                                ? "category-filter__btn--active"
                                : ""
                        }`}
                        onClick={() => onCategoryChange?.("all")}
                        type="button"
                    >
                        All
                    </button>
                </li>
                {categories.map((cat) => (
                    <li key={cat} className="category-filter__item">
                        <button
                            className={`category-filter__btn ${
                                activeCategory === cat
                                    ? "category-filter__btn--active"
                                    : ""
                            }`}
                            onClick={() => onCategoryChange?.(cat)}
                            type="button"
                        >
                            {cat}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default CategoryFilter;
