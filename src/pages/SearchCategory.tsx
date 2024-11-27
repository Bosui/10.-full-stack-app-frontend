import BusinessList from "@/components/business/BusinessList";
import VerticalCategoryList from "@/components/category/VerticalCategoryList";
import { useParams } from "react-router-dom";
import styles from "./SearchCategory.module.scss";

const SearchCategory = () => {
  const { category } = useParams<{ category: string }>(); // Aiškiai nurodomas tipas

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <VerticalCategoryList />
      </div>
      <div className={styles.categoryContainer}>
        <h2 className={styles.title}>{category}</h2>
        <BusinessList categoryName={category} className={styles.businessList} />
      </div>
    </div>
  );
};

export default SearchCategory;
