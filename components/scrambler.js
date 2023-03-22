import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function scrambleWord(word) {
  if (word.length < 2) {
    return word;
  }
  let chars = word.split("");
  let scrambledWord = "";
  do {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    scrambledWord = chars.join("");
  } while (scrambledWord === word);
  return scrambledWord;
}

export default function Scrambler() {
  const [sentences, setSentences] = React.useState("");
  const [output, setOutput] = React.useState([]);

  const handleChange = (event) => {
    setSentences(event.target.value);
  };

  const letterScramble = () => {
    let splitSentences = sentences.split("\n");
    let toOutput = [];

    splitSentences.forEach((sentence) => {
      let punctuation = "";

      if (sentence != "") {
        if (
          sentence.charAt(sentence.length - 1).toLowerCase() ==
          sentence.charAt(sentence.length - 1).toUpperCase()
        ) {
          punctuation = sentence.charAt(sentence.length - 1);
          sentence = sentence.substring(0, sentence.length - 1);
        }

        let words = sentence.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] = scrambleWord(words[i]);
        }

        let newSentence = "";
        words.forEach((word) => {
          newSentence += word + " ";
        });

        if (punctuation == "") {
          newSentence = newSentence.substring(0, newSentence.length - 2);
        }
        newSentence += punctuation;
        toOutput.push(newSentence);
      }
      setOutput(toOutput);
    });
  };

  const wordScramble = () => {
    //console.log(sentences);

    let splitSentences = sentences.split("\n");
    let toOutput = [];

    splitSentences.forEach((sentence) => {
      let punctuation = "";

      if (sentence != "") {
        if (
          sentence.charAt(sentence.length - 1).toLowerCase() ==
          sentence.charAt(sentence.length - 1).toUpperCase()
        ) {
          punctuation = sentence.charAt(sentence.length - 1);
          sentence = sentence.substring(0, sentence.length - 1);
        }

        let words = sentence.split(" ");
        const copy = [...words];

        // Make sure that new sentence is always scrambled
        if (copy.length > 1) {
          while (JSON.stringify(words) == JSON.stringify(copy)) {
            shuffleArray(words);
          }
        }

        let newSentence = "";
        words.forEach((word) => {
          newSentence += word + " / ";
        });

        if (punctuation == "") {
          newSentence = newSentence.substring(0, newSentence.length - 2);
        }
        newSentence += punctuation;

        toOutput.push(newSentence);
      }
      setOutput(toOutput);
    });
  };

  const handleClickCopy = () => {
    if (output != undefined && output.length != 0) {
      navigator.clipboard.writeText(output.join("\n"));
      toast.success("Text copied!");
    }
  };

  return (
    <Box flexDirection="vertical">
      <Typography align="center" variant="h2" color="green">
        Spicy Scrambler
      </Typography>
      <TextField
        multiline
        minRows={20}
        fullWidth
        value={sentences}
        onChange={handleChange}
      ></TextField>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={wordScramble} sx={{ color: "green" }}>
          World Scramble!
        </Button>

        <Button onClick={letterScramble} sx={{ color: "green" }}>
          Letter Scramble!
        </Button>

        <Button onClick={handleClickCopy}>
          <ContentCopyIcon sx={{ color: "green" }} />
        </Button>
      </Box>

      {output.map((question, index) => {
        return (
          <Typography key={index} align="left">
            {question}
          </Typography>
        );
      })}
    </Box>
  );
}
