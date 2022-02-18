export class InstructionExecutor {
    constructor(instructions, instructionReader) {
        this.instructions = instructions;
        this.instructionReader = instructionReader;
    }

    executeInstruction = (input, runConditionalParameters) => {
        const opcode = this.instructionReader.readOpcode(input[runConditionalParameters.currentPosition]);
        const instructionCode = [opcode, this.instructionReader.readParameterModes(input[runConditionalParameters.currentPosition], this.instructions[opcode - 1])]
        return this.instructions[instructionCode[0] - 1].execute(input, runConditionalParameters, instructionCode[1]);
    }
}