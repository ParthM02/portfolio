import React, { useState, useEffect, useRef } from "react";

const SEQUENCES = [
  {
    prompt: "$ whoami",
    output: "parth.mehta@utexas.edu — CS @ UT Austin, SWE Intern @ Ally Financial",
    delay: 1200,
  },
  {
    prompt: "$ cat stack.txt",
    output: "Python · React · AWS · TypeScript · SQL · Terraform · Snowflake",
    delay: 1400,
  },
  {
    prompt: "$ ./deploy --target ally-telemetry-pipeline",
    output: "✓ Kong gateway live  ✓ EventBridge routing  ✓ Snowflake ingesting 3.5k evt/min",
    delay: 1400,
  },
];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [seqIndex, setSeqIndex] = useState(0);
  const [phase, setPhase] = useState("typing-prompt");
  const [charIndex, setCharIndex] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    const seq = SEQUENCES[seqIndex % SEQUENCES.length];
    let timer;

    if (phase === "typing-prompt") {
      if (charIndex < seq.prompt.length) {
        timer = setTimeout(() => {
          setCurrentLine(seq.prompt.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 45 + Math.random() * 30);
      } else {
        timer = setTimeout(() => {
          setCurrentLine("");
          setCharIndex(0);
          setPhase("typing-output");
        }, 300);
      }
    } else if (phase === "typing-output") {
      if (charIndex < seq.output.length) {
        timer = setTimeout(() => {
          setCurrentLine(seq.output.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 18 + Math.random() * 15);
      } else {
        timer = setTimeout(() => {
          setLines((prev) => {
            const next = [
              ...prev,
              { type: "prompt", text: seq.prompt },
              { type: "output", text: seq.output },
            ];
            return next.slice(-8);
          });
          setCurrentLine("");
          setCharIndex(0);
          setSeqIndex((i) => i + 1);
          setPhase("typing-prompt");
        }, seq.delay);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, charIndex, seqIndex]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">parth@quant-terminal ~ zsh</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        <div className={`terminal-line ${phase}`}>
          {phase === "typing-prompt" ? (
            <>
              <span className="terminal-prompt-char">$ </span>
              {currentLine.startsWith("$ ") ? currentLine.slice(2) : currentLine}
            </>
          ) : (
            <span className="terminal-output-text">{currentLine}</span>
          )}
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}
