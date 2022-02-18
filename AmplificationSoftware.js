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

const amplifyWithFeedback = (puzzleInput, phaseSettings) => {
    const amplifiers = setUpFiveAmplifiers([...puzzleInput], phaseSettings);
    let shouldStop = false;
    let currentAmplifier = 0;
    let finalAmplifiersLatestOutput = 0;
    let previousAmplificationOutput = 0
    while(!shouldStop) {
        amplifiers[currentAmplifier].resetOutput();
        amplifiers[currentAmplifier].addAdditionalOperationInput(previousAmplificationOutput);
        const programOutput = amplifiers[currentAmplifier].runProgram();
        if (currentAmplifier === 4) {
            finalAmplifiersLatestOutput = programOutput[1];
        }
        shouldStop = programOutput[0];
        previousAmplificationOutput = programOutput[1] ? programOutput[1] : previousAmplificationOutput;
        if (currentAmplifier === 4) {
            currentAmplifier = 0;
        } else {
            currentAmplifier += 1;
        }
    }
    return finalAmplifiersLatestOutput;
}

const setUpFiveAmplifiers = (puzzleInput, phaseSettings) => {
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
    const amplifiers = [];
    const instructionExecutor = new InstructionExecutor(instructions, new InstructionReader());
    for (let i = 0; i < 5; i++) {
        amplifiers.push(new IntCodeComputer(instructionExecutor, phaseSettings[i], [...puzzleInput]));
    }
    return amplifiers;
}

console.log(amplifyWithFeedback([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
    27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5],[9,8,7,6,5]));

console.log(amplifyWithFeedback([3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
    -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
    53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10],[9,7,8,5,6]));

const bruteForce = () => {
    let largestOutput = 0;
    for (let a = 5; a < 10; a++) {
        for (let b = 5; b < 10; b++) {
            for (let c = 5; c < 10; c++) {
                for (let d = 5; d < 10; d++) {
                    for (let e = 5; e < 10; e++) {
                        if( a !== b && a !== c && a !== d && a !== e && b !== c && b !== d && b !== e && c !== d && c !== e && d !== e) {
                            const phaseSettings = [a,b,c,d,e];
                            const output = amplifyWithFeedback(
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
