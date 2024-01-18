import { CourseType } from "../headerNoAuth/services/courseService";
import { Container, Button } from "reactstrap";
import Link from "next/link";
import styles from "./styles.module.scss";
import SlideComponent from "../../common/slideComponent";

interface props {
  newestCourses: CourseType[];
}
const SlideSection = function ({ newestCourses }: props) {
  return (
    <>
      <Container fluid>
        <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
        <SlideComponent course={newestCourses} />
        <Link href="/register">
          <Button outline color="light" className={styles.slideSectionBtn}>
            Se cadastre para acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default SlideSection;