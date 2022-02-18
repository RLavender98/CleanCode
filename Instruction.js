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

    skipToNextInstruction(runParameters) {
        runParameters.currentPosition += this.numberOfParameters + 1;
        return runParameters;
    }

    skipToPosition(runParameters, positionToSkipTo) {
        runParameters.currentPosition = positionToSkipTo;
        return runParameters;
    }
}

export class InstructionOne extends Instruction {
    constructor() {
        super(1,3);
    }

    execute = (input, runParameters, parameterModes) => {
        input[input[runParameters.currentPosition + 3]] = this.getValue(input, runParameters.currentPosition + 1, parameterModes[0])
            + this.getValue(input, runParameters.currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(runParameters);
    }
}

export class InstructionTwo extends Instruction {
    constructor() {
        super(2,3);
    }

    execute = (input, runParameters, parameterModes) => {
        input[input[runParameters.currentPosition + 3]] = this.getValue(input, runParameters.currentPosition + 1, parameterModes[0])
            * this.getValue(input, runParameters.currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(runParameters);
    }
}

export class InstructionThree extends Instruction {
    constructor() {
        super(3,1);
    }

    execute = (input, runParameters, parameterModes) => {
        input[input[runParameters.currentPosition + 1]] = runParameters.operationInputs[0];
        runParameters.operationInputs = runParameters.operationInputs.slice(1);
        return this.skipToNextInstruction(runParameters);
    }
}

export class InstructionFour extends Instruction {
    constructor() {
        super(4,1);
    }

    execute = (input, runParameters, parameterModes) => {
        runParameters.output = this.getValue(input, runParameters.currentPosition + 1, parameterModes[0]);
        return this.skipToNextInstruction(runParameters);
    }
}

export class InstructionFive extends Instruction {
    constructor() {
        super(5,2);
    }

    execute = (input, runParameters, parameterModes) => {
        if(this.getValue(input, runParameters.currentPosition + 1, parameterModes[0]) !== 0) {
            return this.skipToPosition(runParameters, this.getValue(input, runParameters.currentPosition + 2, parameterModes[1]));
        } else {
            return this.skipToNextInstruction(runParameters);
        }
    }
}

export class InstructionSix extends Instruction {
    constructor() {
        super(6,2);
    }

    execute = (input, runParameters, parameterModes) => {
        if(this.getValue(input, runParameters.currentPosition + 1, parameterModes[0]) === 0) {
            return this.skipToPosition(runParameters, this.getValue(input, runParameters.currentPosition + 2, parameterModes[1]));
        } else {
            return this.skipToNextInstruction(runParameters);
        }
    }
}

export class InstructionSeven extends Instruction {
    constructor() {
        super(7,3);
    }

    execute = (input, runParameters, parameterModes) => {
        if(this.getValue(input, runParameters.currentPosition + 1, parameterModes[0]) < this.getValue(input, runParameters.currentPosition + 2, parameterModes[1])) {
            input[input[runParameters.currentPosition + 3]] = 1;
        } else {
            input[input[runParameters.currentPosition + 3]] = 0;
        }
        return this.skipToNextInstruction(runParameters);
    }
}

export class InstructionEight extends Instruction {
    constructor() {
        super(8,3);
    }

    execute = (input, runParameters, parameterModes) => {
        if(this.getValue(input, runParameters.currentPosition + 1, parameterModes[0]) === this.getValue(input, runParameters.currentPosition + 2, parameterModes[1])) {
            input[input[runParameters.currentPosition + 3]] = 1;
        } else {
            input[input[runParameters.currentPosition + 3]] = 0;
        }
        return this.skipToNextInstruction(runParameters);
    }
}