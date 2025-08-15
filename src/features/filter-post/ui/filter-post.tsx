import { ChevronDown, ChevronUp } from "lucide-react";

import React, { useState } from "react";

import {
  useFilterPost,
  useSetFilterPost,
} from "../../../entities/user/model/store/user-store";
import type { FilterPost as FilterPostType } from "../../../entities/user/model/types/types";
import { filterPostItems } from "../model/constants";
import styles from "./filter-post.module.css";

export const FilterPost = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filterPost = useFilterPost();
  const setFilterPost = useSetFilterPost();

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const onClickItem = (value: FilterPostType) => {
    setFilterPost(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterPost} onClick={toggleOpen}>
        Filter by: {filterPost}{" "}
        {isOpen ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
      </div>
      {isOpen && (
        <ul className={styles.overlay}>
          {filterPostItems.map(item => (
            <li onClick={() => onClickItem(item)} className={styles.filterItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
