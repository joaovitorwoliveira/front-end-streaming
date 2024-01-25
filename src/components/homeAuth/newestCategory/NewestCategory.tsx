import useSWR from "swr";

export const NewestCategory = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCouses);

  if (error) return error;
  if (!data) return <></>;
};
