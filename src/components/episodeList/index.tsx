import styles from "./styles.module.scss";
import { CourseType, EpisodeType } from "../../services/courseService";
import { useRouter } from "next/router";

interface props {
  episode: EpisodeType;
  course: CourseType;
}

const EpisodeList = function ({ episode, course }: props) {
  const router = useRouter();

  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    function toString(num: number) {
      return num.toString().padStart(2, "0");
    }

    const result = `${toString(minutes)}:${toString(seconds)}`;

    return result;
  };

  const handleEpisodePlayer = () => {
    router.push(
      `/course/episode/${episode.order - 1}?courseid=${course.id}&episodeid=${
        episode.id
      }`
    );
  };

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
          <p className={styles.episodeTime}>
            {handleSecondsToMin(episode.secondsLong)}
          </p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            doloribus non aspernatur, delectus alias minus debitis magni
            sapiente velit dolores eligendi officiis quaerat tempore est
            recusandae eum reprehenderit molestias modi. Tenetur dolore velit
            deleniti ea ab excepturi dicta, consequuntur reprehenderit quasi
            cumque impedit alias officiis aspernatur, minus dignissimos hic
            fugiat?
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
            nisi.
          </p>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
