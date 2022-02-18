export class InstructionReader {
    readOpcode = (instructionCode) => {
        return instructionCode % 100;
    }

    readParameterModes = (instructionCode, instruction) => {
        const parameterModes = [];
        let parameterInstructionCode = this.removeOpcodeFromInstructionCode(instructionCode);
        for (let i = 0; i < instruction.numberOfParameters; i++) {
            parameterModes.push(this.readParameterMode(parameterInstructionCode));
            parameterInstructionCode = this.removeFinalParameterFromParameterInstructionCode(parameterInstructionCode);
        }
        return parameterModes;
    }

    readParameterMode = (parameterInstructionCode) => {
        return parameterInstructionCode % 10;
    }

    removeOpcodeFromInstructionCode = (instructionCode) => {
        return (instructionCode - instructionCode % 100) / 100;
    }

    removeFinalParameterFromParameterInstructionCode = (parameterInstructionCode) => {
        return (parameterInstructionCode - parameterInstructionCode % 10) / 10;
    }
}