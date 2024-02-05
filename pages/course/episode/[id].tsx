import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";

import HeaderGeneric from "@/src/components/common/headerGeneric";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";

import courseService, { CourseType } from "@/src/services/courseService";
import PageSpinner from "@/src/components/common/spinner";
import ReactPlayer from "react-player";
import watchEpisodeService from "@/src/services/episodeService";

const EpisodePlayer = function () {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const episodeId = parseFloat(router.query.episodeid?.toString() || "");

  const courseId = router.query.courseid?.toString() || "";

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);

  const handleGetEpisodeTime = async () => {
    const res = await watchEpisodeService.getWatchTime(episodeId);
    // alteracao 01 inicio
    console.log("Episode ID:", episodeId);
    console.log("Response:", res);
    //alteracao 01 fim

    console.log(res);

    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const getCourse = async function () {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder - 1}?courseid=${
        course?.id
      }&episodeid=${episodeId}`
    );
  };

  const handleNextEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${
        episodeId + 1
      }`
    );
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes == undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={"Voltar para o curso"}
          btnUrl={`/course/${courseId}`}
        />

        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>
            {course.episodes[episodeOrder].name}
          </p>
          {typeof window == "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0 ? true : false}
              onClick={handleLastEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="setaEsquerda"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={
                episodeOrder + 1 === course.episodes.length ? true : false
              }
              onClick={handleNextEpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="setaDireita"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center pb-4">
            {course.episodes[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
