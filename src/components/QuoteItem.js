import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import twitter from "../twitter.svg";
import microphone from "../microphone.svg";
import xcircle from "../xcircle.svg";

export default function QuoteItem({ quote, removeQuote }) {
  const readQuote = (text) => {
    if (!window?.speechSynthesis) {
      console.log("speech synthesis not supported");
    }
    let synth = window.speechSynthesis;
    if (synth.speaking) {
      return;
    }
    let newUtter = new SpeechSynthesisUtterance(text);
    synth.speak(newUtter);
  };
  return (
    <Card style={{ position: "relative" }}>
      <CardContent>
        <Typography id="text">{quote.content}</Typography>
        <Typography id="author"> - {quote.author} </Typography>
        <CardActions>
          <Tooltip title="tweet" aria-label="tweet" placement="right" arrow>
            <IconButton
              target="_blank"
              href={encodeURI(
                `http://twitter.com/intent/tweet?text=${quote.content}&hashtags=quotemachine`
              )}
            >
              <img src={twitter} alt="twitter icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="read" aria-label="read quote" placement="right" arrow>
            <IconButton onClick={() => readQuote(quote.content)}>
              <img src={microphone} alt="speak icon" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="remove"
            aria-label="remove quote"
            placement="right"
            arrow
          >
            <IconButton onClick={() => removeQuote(quote._id)}>
              <img src={xcircle} alt="speak icon" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
}
