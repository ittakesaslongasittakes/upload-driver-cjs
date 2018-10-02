import xs from "xstream";
import isolate from "@cycle/isolate";
import { Roll } from "./components/Collections/Roll";

export const App = sources => {
  const { DOM, onion } = sources;
  const $ = onion.state$.debug();
  const roll = isolate(Roll, "pages")({ DOM, onion });
  return {
    DOM: xs.combine($, roll.DOM).map(([s, roll]) => {
      return <div>{roll}</div>;
    }),
    onion: xs.of(() => ({ pages: ["auth", "main", "cards"] }))
  };
};
