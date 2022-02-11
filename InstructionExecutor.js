export class InstructionExecutor {
    constructor(instructionRunners, instructionReader) {
        this.instructionRunners = instructionRunners;
        this.instructionReader = instructionReader;
    }

    executeInstruction = (input, currentPosition, operationInput) => {
        const opcode = this.instructionReader.readOpcode(input[currentPosition]);
        const instruction = [opcode, this.instructionReader.readParameterModes(input[currentPosition], this.instructionRunners[opcode - 1])]
        return this.instructionRunners[instruction[0] - 1].runInstruction(input, currentPosition, instruction[1], operationInput);
    }
}