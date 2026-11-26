import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Flex, Text } from "@chakra-ui/react";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="lg">{speaker.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  direction="column"
                  gap="0.5"
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text fontSize="sm" color="var(--text-muted)">
                    {session.startTime}
                  </Text>
                  <Text fontSize="sm">{session.title}</Text>
                </Flex>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
