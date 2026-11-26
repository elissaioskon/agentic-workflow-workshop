import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Flex, Text } from "@chakra-ui/react";

/** Renders a list item — place it inside a `ul`. */
export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card as="li">
      <CardHeader>
        <CardTitle as="h2" fontSize="md">
          {speaker.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex direction="column" gap="0.5" paddingY="1">
                  <Text fontSize="sm" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                  <Text
                    fontSize="sm"
                    textDecoration="underline"
                    textUnderlineOffset="2px"
                    _hover={{ color: "var(--accent-hex)" }}
                  >
                    {session.title}
                  </Text>
                </Flex>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
