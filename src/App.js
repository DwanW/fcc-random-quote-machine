import { IconButton, Tooltip, Fade } from "@material-ui/core";
import { useState } from "react";
import QuoteItem from "./components/QuoteItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import add from "./assets/add.svg";

function App() {
  const [quotes, setQuotes] = useState([]);

  const getNewQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((data) => data.json())
      .then((quote) => setQuotes([...quotes, quote]))
      .catch((err) => console.log(err));
  };

  const removeQuote = (id) => {
    setQuotes((quotes) => quotes.filter((quote) => quote._id !== id));
  };

  return (
    <div className="layout">
      <Fade in={quotes.length === 0}>
        <div className="start">
          <div>This is a quotes generator. Click the icon to get started.</div>
          <span className="start-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              viewBox="0 0 24 24"
              stroke="green"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Fade>

      <div className="container">
        <TransitionGroup className="quote-group">
          {quotes.map((quote) => (
            <CSSTransition key={quote._id} timeout={500} classNames="item">
              <div className="item">
                <QuoteItem quote={quote} removeQuote={removeQuote} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <div className="button-group">
          <Tooltip
            title="generate"
            aria-label="generate"
            placement="right"
            arrow
          >
            <IconButton onClick={getNewQuote}>
              <img src={add} alt="logo" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default App;
