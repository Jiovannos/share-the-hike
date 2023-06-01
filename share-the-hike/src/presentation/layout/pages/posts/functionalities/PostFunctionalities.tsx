import css from "./PostFunctionalities.module.css";
import { toggleFiltersModal } from "presentation/redux/visibilitySlice";
import { updateSorting } from "presentation/redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "presentation/redux/postSlice";
import FiltersModal from "presentation/components/postfilter/FiltersModal";

const PostFunctionalities: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.post.filters);
  const sortOptions = [
    { value: "title_asc", label: "Title (Asc)" },
    { value: "title_desc", label: "Title (Desc)" },
    { value: "userName_asc", label: "User Name (Asc)" },
    { value: "userName_desc", label: "User Name (Desc)" },
    { value: "createdAt_asc", label: "Date (Asc)" },
    { value: "createdAt_desc", label: "Date (Desc)" },
  ];
  function toggleFilterOpen() {
    dispatch(toggleFiltersModal(true));
  }
  // Update the sorting in the redux store
  function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortField = event.target.value.split("_")[0];
    const sortOrder = event.target.value.split("_")[1];
    dispatch(updateSorting({ sortField, sortOrder }));
  }
  // Check if the filters object has any non-empty properties
  function hasNonEmptyProperties(obj: any) {
    for (let key in obj) {
      if (obj[key]) {
        return true;
      }
    }
    return false;
  }
  const hasFilters = hasNonEmptyProperties(filters);

  return (
    <div className={css.postFunctionalities}>
      <div className={css.filterMenu}>
        <button onClick={toggleFilterOpen}>Filters</button>
        {hasFilters && (
          <p
            className={css.clear}
            onClick={() =>
              dispatch(updateFilters({ title: "", body: "", user: "" }))
            }
          >
            Clear Filters
          </p>
        )}
      </div>

      <div className={css.sortMenu}>
        <select onChange={handleSort}>
          <option value="">Sort by...</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <FiltersModal />
    </div>
  );
};

export default PostFunctionalities;
