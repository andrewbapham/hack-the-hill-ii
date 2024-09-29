import { Card, Text, Flex, ActionIcon } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

export function JournalEntry({ id, content, emotions, date }) {
  const moodEmojis = {
    anger: "😡",
    disgust: "🤢",
    fear: "😨",
    joy: "😊",
    neutral: "😐",
    sadness: "😢",
    surprise: "😮",
  };

  const axiosClient = axios.create({
    baseURL: "http://justvent-lb-516258045.us-east-2.elb.amazonaws.com/api/v1/",
    timeout: 20000,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  const handleDeleteJournal = async () => {
    await axiosClient.delete(`journals/${id}`).then((res) => {
      console.log(res);
    });
  };

  return (
    <Card key={id} shadow="sm" padding="lg" style={{ overflowY: "scroll" }}>
      <Flex justify={"flex-end"}>
        <Flex align={"center"} gap={10}>
          <Text>Moods:</Text>
          <Text>{date}</Text>
          <ActionIcon
            color="red"
            size="lg"
            radius="md"
            onClick={() => handleDeleteJournal()}
          >
            <AiOutlineDelete size={20} />
          </ActionIcon>
        </Flex>
      </Flex>
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: "white",
          height: "60vh",
        }}
      >
        <Text
          size="md"
          c="gray.7"
          px={"30px"}
          py={"10px"}
          pb={"30px"}
          style={{ overflowY: scroll, wordBreak: "break-word" }}
          maw={"75vw"}
        >
          {content}
        </Text>
      </div>
    </Card>
  );
}
