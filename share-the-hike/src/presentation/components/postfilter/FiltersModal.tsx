import css from "./FiltersModal.module.css";
import { FilterData } from "global-types/filterTypes";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFiltersModal } from "presentation/redux/visibilitySlice";
import { updateFilters } from "presentation/redux/postSlice";

const FiltersModal: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.visibility.filtersModal.open);
  const filters = useSelector((state: any) => state.post.filters);
  const [filterData, setFilterData] = useState<FilterData>(filters);

  // Reset the filterData when the filters change
  useEffect(() => {
    setFilterData(filters);
  }, [filters]);

  const closeModal = () => {
    dispatch(toggleFiltersModal(false));
  };

  // Update the filterData when the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  // Update the filters in the redux store
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateFilters(filterData));
    closeModal();
  };

  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className={css.backdrop}
      onClick={closeModal}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Filters</h2>
        <form onSubmit={handleSubmit}>
          <label className={css.label}>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Title contains..."
              onChange={handleChange}
              value={filterData.title}
            />
          </label>
          <label className={css.label}>
            Body:
            <input
              type="text"
              name="body"
              placeholder="Body contains..."
              onChange={handleChange}
              value={filterData.body}
            />
          </label>
          <label className={css.label}>
            User:
            <input
              type="text"
              name="user"
              placeholder="User contains..."
              onChange={handleChange}
              value={filterData.user}
            />
          </label>
          <button type="submit">Apply Filters</button>
        </form>
      </div>
    </div>
  );
};

export default FiltersModal;
