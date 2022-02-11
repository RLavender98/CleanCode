export class InstructionReader {
    readOpcode = (instruction) => {
        return instruction % 100;
    }

    readParameterModes = (instruction, instructionRunner) => {
        const parameterModes = [];
        let parameterInstruction = (instruction - instructionRunner.opcode) / 100;
        for (let i = 0; i < instructionRunner.numberOfParameters; i++) {
            let currentMode = parameterInstruction % 10;
            parameterModes.push(currentMode);
            parameterInstruction = (parameterInstruction - currentMode) / 10;
        }
        return parameterModes;
    }
}