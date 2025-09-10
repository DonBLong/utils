import { match } from "@donb/utils/arrays/match";

const inputs = [{ inputProp: "abbbc" }, { inputProp: "baaac" }];
const candidates = [{ candidateProp: "a" }, { candidateProp: "b" }];

console.log(
  match({
    iterable: inputs,
    callback: (input) => input.inputProp,
  }, {
    iterable: candidates,
    callback: (candidate) => candidate.candidateProp,
  }),
);
//   Map(2) {
//     { inputProp: "abbbc" } => { candidateProp: "b" },
//     { inputProp: "baaac" } => { candidateProp: "a" }
//   }
