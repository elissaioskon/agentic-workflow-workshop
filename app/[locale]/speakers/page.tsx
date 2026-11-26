import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import type { Speaker } from "@/types/speaker";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function SpeakersPage() {
  const t = await getTranslations("SpeakersPage");

  // Wired to fetchSessions() + the grouping util in step 2c.
  const speakers: Speaker[] = [];

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("intro")}</PageHeading>

      <Grid gap="4" templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
