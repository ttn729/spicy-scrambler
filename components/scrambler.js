import { Button, TextField, Typography, Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Scrambler() {
  const [sentences, setSentences] = React.useState("");
  const [output, setOutput] = React.useState([]);

  const handleChange = (event) => {
    setSentences(event.target.value);
  };

  const submitSentences = () => {
    //console.log(sentences);

    let splitSentences = sentences.split("\n");
    let toOutput = [];

    splitSentences.forEach((sentence) => {
      if (sentence != "") {
        const punctuation = sentence.charAt(sentence.length - 1);
        sentence = sentence.substring(0, sentence.length - 1);

        let words = sentence.split(" ");

        shuffleArray(words);

        let newSentence = "";
        words.forEach((word) => {
          newSentence += word + " / ";
        });

        newSentence += punctuation;

        toOutput.push(newSentence);
      }
      setOutput(toOutput);
    });
  };

  return (
    <Box flexDirection="vertical">
      <Typography align="center" variant="h2">
        Spicy Scrambler
      </Typography>
      <TextField
        multiline
        minRows={20}
        fullWidth
        value={sentences}
        onChange={handleChange}
      ></TextField>
      <Button onClick={submitSentences}>Scramble!</Button>

      {output.map((question, index) => {
        return <Typography key={Index} align="left">{question}</Typography>;
      })}
    </Box>
  );
}
