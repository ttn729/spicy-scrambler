import React from "react";
import { Button, TextField, Typography, Box, Checkbox, MenuItem, InputLabel, Select, FormControl, FormGroup, FormControlLabel } from "@mui/material";
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

  const [outputType, setOutputType] = React.useState('None');


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
      if (outputType === "None") {
        navigator.clipboard.writeText(output.join("\n"));
        toast.success("Text copied!");
      }
      else if (outputType === "Numbers") {
        const outputNumbers = output.map((question, index) => {
          return `${index + 1}) ${question}`;
        });
        navigator.clipboard.writeText(outputNumbers.join("\n"));
      }
      else if (outputType === "Letters") {
        const outputLetters = output.map((question, index) => {
          const letter = String.fromCharCode(97 + index);
          return `${letter}) ${question}`;
        });
        navigator.clipboard.writeText(outputLetters.join("\n"));
      }
    
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

      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Output Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={outputType}
          label="Age"
          onChange={(e) => setOutputType(e.target.value)}
        >
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Letters"}>Letters</MenuItem>
          <MenuItem value={"Numbers"}>Numbers</MenuItem>
        </Select>
      </FormControl>

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

      {(outputType == "None") && output.map((question, index) => {
        return (
          <Typography key={index} align="left">
            {question}
          </Typography>
        );
      })}


      {(outputType == "Letters") && output.map((question, index) => {
        // Calculate the corresponding letter using ASCII values
        const letter = String.fromCharCode(97 + index);

        return (
          <Typography key={index} align="left">
            {`${letter}) ${question}`}
          </Typography>
        );
      })}

      {(outputType == "Numbers") && output.map((question, index) => {
        return (
          <Typography key={index} align="left">
            {`${index + 1}) ${question}`}
          </Typography>
        );
      })}

    </Box>
  );
}
