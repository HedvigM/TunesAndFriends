"use client";
import abcjs from "abcjs";
import { useEffect, useState, useRef } from "react";
import { Button } from "styles/Button";


type TunePlayerProps = {
  abcNotes: string;
};

export const TunePlayer = (props: TunePlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const synthRef = useRef<any>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

   /*  let lineBreak = (string: string) => {
      return string.replaceAll("!", "\n");
    }; */

    useEffect(() => {
      const abcjsInit = async () => {
        const myContext = new AudioContext();
        audioContextRef.current = myContext;
        const visualObj = abcjs.renderAbc("paper", props.abcNotes, {
          responsive: "resize",
          /* staffwidth: 500, */
      /*     wrap: {
            minSpacing: 1.8,
            maxSpacing: 2.7,
            preferredMeasuresPerLine: 6
          } */
        });
        const synth = new abcjs.synth.CreateSynth();
        synthRef.current = synth;

        try {
          await synth.init({
            audioContext: myContext,
            visualObj: visualObj[0],
            options: {
              /* pan: [-0.3, 0.3] */
            }
          });
          await synth.prime();
        } catch (error) {
          console.error("Error initializing synth:", error);
        }
      };
      abcjsInit();

      return () => {
        // Cleanup
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
    }, [props.abcNotes]);

    const handlePlay = async () => {
      if (audioContextRef.current && synthRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        if (!isPlaying) {
          synthRef.current.start();
          setIsPlaying(true);
        } else {
          synthRef.current.stop();
          setIsPlaying(false);
        }
      }
    };

    return (
      <div style={{maxWidth: "900px", width: "100%"}}>
        <div id="paper" /* style={{width: "100%", overflow: "hidden"}} */></div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "end"}}>
        <Button active={isPlaying} onClick={handlePlay} disabled={isPlaying}>
          {isPlaying ? "Playing..." : "Play Music"}
        </Button>
        <Button active={!isPlaying} onClick={handlePlay} disabled={!isPlaying}>Stop</Button>
        </div>
      </div>
    );
  };
