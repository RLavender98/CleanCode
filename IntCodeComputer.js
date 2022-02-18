export class IntCodeComputer {
    constructor(instructionExecutor, phaseSetting, program) {
        this.instructionExecutor = instructionExecutor;
        this.runParameters = {
            currentPosition: 0,
            output: null,
            operationInputs: [phaseSetting]
        }
        this.program = program;
    }

    runProgram = () => {
        while(this.program[this.runParameters.currentPosition] !== 99 && this.runParameters.output === null) {
            this.execute();
        }
        return [this.program[this.runParameters.currentPosition] === 99, this.runParameters.output];
    }

    execute = () => {
        this.instructionExecutor.executeInstruction(this.program, this.runParameters);
    }

    addAdditionalOperationInput = (input) => {
        this.runParameters.operationInputs.push(input);
    }

    resetOutput = () => {
        this.runParameters.output = null;
    }
}