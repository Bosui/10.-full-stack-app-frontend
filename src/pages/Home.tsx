// src/pages/Home.tsx

import BusinessList from "@/components/business/BusinessList";
import CategoryList from "@/components/category/CategoryList";
import Hero from "@/components/common/Hero";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <Hero /> {/* Hero sekcija */}
      <CategoryList /> {/* Kategorijų sąrašas */}
      <h2 className={styles.title}>Popular businesses</h2> {/* Populiarių verslų antraštė */}
      <BusinessList /> {/* Verslų sąrašas */}
    </>
  );
};

export default Home;
