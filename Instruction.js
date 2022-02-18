class Instruction {
    constructor(opcode, numberOfParameters) {
        this.opcode = opcode;
        this.numberOfParameters = numberOfParameters;
    }

    getValue = (input, position, parameterMode) => {
        if (parameterMode === 0) {
            return input[input[position]];
        }
        return input[position];
    }

    skipToNextInstruction(runConditionalParameters) {
        runConditionalParameters.currentPosition += this.numberOfParameters + 1;
        return runConditionalParameters;
    }

    skipToPosition(runConditionalParameters, positionToSkipTo) {
        runConditionalParameters.currentPosition = positionToSkipTo;
        return runConditionalParameters;
    }
}

export class InstructionOne extends Instruction {
    constructor() {
        super(1,3);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        input[input[runConditionalParameters.currentPosition + 3]] = this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0])
            + this.getValue(input, runConditionalParameters.currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(runConditionalParameters);
    }
}

export class InstructionTwo extends Instruction {
    constructor() {
        super(2,3);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        input[input[runConditionalParameters.currentPosition + 3]] = this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0])
            * this.getValue(input, runConditionalParameters.currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(runConditionalParameters);
    }
}

export class InstructionThree extends Instruction {
    constructor() {
        super(3,1);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        input[input[runConditionalParameters.currentPosition + 1]] = runConditionalParameters.operationInputs[0];
        runConditionalParameters.operationInputs = runConditionalParameters.operationInputs.slice(1);
        return this.skipToNextInstruction(runConditionalParameters);
    }
}

export class InstructionFour extends Instruction {
    constructor() {
        super(4,1);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        runConditionalParameters.output = this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0]);
        return this.skipToNextInstruction(runConditionalParameters);
    }
}

export class InstructionFive extends Instruction {
    constructor() {
        super(5,2);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        if(this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0]) !== 0) {
            return this.skipToPosition(runConditionalParameters, this.getValue(input, runConditionalParameters.currentPosition + 2, parameterModes[1]));
        } else {
            return this.skipToNextInstruction(runConditionalParameters);
        }
    }
}

export class InstructionSix extends Instruction {
    constructor() {
        super(6,2);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        if(this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0]) === 0) {
            return this.skipToPosition(runConditionalParameters, this.getValue(input, runConditionalParameters.currentPosition + 2, parameterModes[1]));
        } else {
            return this.skipToNextInstruction(runConditionalParameters);
        }
    }
}

export class InstructionSeven extends Instruction {
    constructor() {
        super(7,3);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        if(this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0]) < this.getValue(input, runConditionalParameters.currentPosition + 2, parameterModes[1])) {
            input[input[runConditionalParameters.currentPosition + 3]] = 1;
        } else {
            input[input[runConditionalParameters.currentPosition + 3]] = 0;
        }
        return this.skipToNextInstruction(runConditionalParameters);
    }
}

export class InstructionEight extends Instruction {
    constructor() {
        super(8,3);
    }

    execute = (input, runConditionalParameters, parameterModes) => {
        if(this.getValue(input, runConditionalParameters.currentPosition + 1, parameterModes[0]) === this.getValue(input, runConditionalParameters.currentPosition + 2, parameterModes[1])) {
            input[input[runConditionalParameters.currentPosition + 3]] = 1;
        } else {
            input[input[runConditionalParameters.currentPosition + 3]] = 0;
        }
        return this.skipToNextInstruction(runConditionalParameters);
    }
}