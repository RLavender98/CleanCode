import { IntCodeComputer } from "./IntCodeComputer.js";
import { InstructionReader } from "./InstructionReader.js";
import { InstructionExecutor } from "./InstructionExecutor.js";
import {
    InstructionOne,
    InstructionTwo,
    InstructionThree,
    InstructionFour,
    InstructionFive,
    InstructionSix,
    InstructionSeven,
    InstructionEight
} from "./Instruction.js";

const amplify = (input, operationInputs) => {
    const instructions = [
        new InstructionOne(),
        new InstructionTwo(),
        new InstructionThree(),
        new InstructionFour(),
        new InstructionFive(),
        new InstructionSix(),
        new InstructionSeven(),
        new InstructionEight()
    ];
    const intCodeComputer = new IntCodeComputer(new InstructionExecutor(instructions, new InstructionReader()));
    let runConditionalParameters = {
        currentPosition: 0,
        output: null,
        operationInputs: operationInputs
    }
    while(input[runConditionalParameters.currentPosition] !== 99 || runConditionalParameters.output === null) {
        runConditionalParameters = intCodeComputer.instructionExecutor.executeInstruction(input, runConditionalParameters);
    }
    return runConditionalParameters.output;
}

const amplifyFiveTimes = (puzzleInput, phaseSettings) => {
    let amplificationOutput = 0;
    for (let i = 0; i < 5; i++) {
        const input = [...puzzleInput];
        const operationInputs = [phaseSettings[i], amplificationOutput];
        amplificationOutput = amplify(input, operationInputs);
    }
    return amplificationOutput;
}

const bruteForce = () => {
    let largestOutput = 0;
    for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
            for (let c = 0; c < 5; c++) {
                for (let d = 0; d < 5; d++) {
                    for (let e = 0; e < 5; e++) {
                        if( a !== b && a !== c && a !== d && a !== e && b !== c && b !== d && b !== e && c !== d && c !== e && d !== e) {
                            const phaseSettings = [a,b,c,d,e];
                            const output = amplifyFiveTimes(
                                [3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,
                                    9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,
                                    3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,
                                    102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,
                                    9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,
                                    9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,
                                    9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,
                                    4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,
                                    9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,
                                    9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,
                                    101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99],
                                phaseSettings
                            );
                            if (output > largestOutput) {
                                largestOutput = output;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(largestOutput);
}

bruteForce();
