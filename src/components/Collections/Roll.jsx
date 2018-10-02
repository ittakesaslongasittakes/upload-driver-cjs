import { div, ul } from "@cycle/dom";
import { makeCollection } from "cycle-onionify";
import xs from "xstream";
const Page = ({ DOM, onion }) => {
  return {
    DOM: xs.of(<li />)
  };
};

export const Roll = makeCollection({
  item: Page,
  itemKey: (childState, index) => {
    console.log(index);
    return String(childState, index);
  }, // or, e.g., childState.key
  itemScope: key => {
    console.log(key);
    return key;
  }, // use `key` string as the isolation scope
  collectSinks: instances => {
    return {
      DOM: instances.pickCombine("DOM").map(itemVNodes => <ul>{itemVNodes}</ul>)
    };
  }
});
