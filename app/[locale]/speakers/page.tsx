import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Keeps the page static: the layout sets this too, but renders in parallel.
  setRequestLocale(locale);

  const t = await getTranslations("SpeakersPage");
  const speakers = groupSessionsBySpeaker(await fetchSessions());

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("intro")}</PageHeading>

      {speakers.length === 0 ? (
        <Text color="var(--text-secondary)">{t("empty")}</Text>
      ) : (
        <Grid
          as="ul"
          gap="4"
          padding="0"
          listStyleType="none"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        >
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}
