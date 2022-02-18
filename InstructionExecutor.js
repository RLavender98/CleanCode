export class InstructionExecutor {
    constructor(instructions, instructionReader) {
        this.instructions = instructions;
        this.instructionReader = instructionReader;
    }

    executeInstruction = (input, runParameters) => {
        const opcode = this.instructionReader.readOpcode(input[runParameters.currentPosition]);
        const instructionCode = [opcode, this.instructionReader.readParameterModes(input[runParameters.currentPosition], this.instructions[opcode - 1])]
        return this.instructions[instructionCode[0] - 1].execute(input, runParameters, instructionCode[1]);
    }
}