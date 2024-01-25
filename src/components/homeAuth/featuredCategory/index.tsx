import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "../../common/slideComponent";

const FeaturedCategory = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return <p>Ocorreu um erro: {error.message}</p>;
  if (!data) return <p>Carregando...</p>;

  const featuredCourses = data.data || [];
  return (
    <>
      <>
        <p className={styles.titleCategory}>EM DESTAQUE</p>
        <SlideComponent course={featuredCourses} />
      </>
    </>
  );
};

export default FeaturedCategory;
