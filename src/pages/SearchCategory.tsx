import BusinessList from "@/components/business/BusinessList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./SearchCategory.module.scss";

interface SearchCategoryParams {
  category?: string;
}

const SearchCategory: React.FC = () => {
  const { category } = useParams<Record<string, string | undefined>>();

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <VerticalCategoryList />
      </div>
      <div className={styles.categoryContainer}>
        <h2 className={styles.title}>{category || "No Category Selected"}</h2>
        <BusinessList categoryName={category || ""} className={styles.businessList} />
      </div>
    </div>
  );
};

export default SearchCategory;
