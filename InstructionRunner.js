class InstructionRunner {
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

    skipToNextInstruction(currentPosition) {
        return currentPosition + this.numberOfParameters + 1;
    }
}

export class InstructionOneRunner extends InstructionRunner {
    constructor() {
        super(1,3);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        input[input[currentPosition + 3]] = this.getValue(input, currentPosition + 1, parameterModes[0])
            + this.getValue(input, currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(currentPosition);
    }
}

export class InstructionTwoRunner extends InstructionRunner {
    constructor() {
        super(2,3);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        input[input[currentPosition + 3]] = this.getValue(input, currentPosition + 1, parameterModes[0])
            * this.getValue(input, currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(currentPosition);
    }
}

export class InstructionThreeRunner extends InstructionRunner {
    constructor() {
        super(3,1);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        input[input[currentPosition + 1]] = operationInput;
        return this.skipToNextInstruction(currentPosition);
    }
}

export class InstructionFourRunner extends InstructionRunner {
    constructor() {
        super(4,1);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        console.log(this.getValue(input, currentPosition + 1, parameterModes[0]));
        return this.skipToNextInstruction(currentPosition);
    }
}

export class InstructionFiveRunner extends InstructionRunner {
    constructor() {
        super(5,2);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        if(this.getValue(input, currentPosition + 1, parameterModes[0]) !== 0) {
            return this.getValue(input, currentPosition + 2, parameterModes[1]);
        } else {
            return this.skipToNextInstruction(currentPosition);
        }
    }
}

export class InstructionSixRunner extends InstructionRunner {
    constructor() {
        super(6,2);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        if(this.getValue(input, currentPosition + 1, parameterModes[0]) === 0) {
            return this.getValue(input, currentPosition + 2, parameterModes[1]);
        } else {
            return this.skipToNextInstruction(currentPosition);
        }
    }
}

export class InstructionSevenRunner extends InstructionRunner {
    constructor() {
        super(7,3);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        if(this.getValue(input, currentPosition + 1, parameterModes[0]) < this.getValue(input, currentPosition + 2, parameterModes[1])) {
            input[input[currentPosition + 3]] = 1;
        } else {
            input[input[currentPosition + 3]] = 0;
        }
        return this.skipToNextInstruction(currentPosition);
    }
}

export class InstructionEightRunner extends InstructionRunner {
    constructor() {
        super(8,3);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        if(this.getValue(input, currentPosition + 1, parameterModes[0]) === this.getValue(input, currentPosition + 2, parameterModes[1])) {
            input[input[currentPosition + 3]] = 1;
        } else {
            input[input[currentPosition + 3]] = 0;
        }
        return this.skipToNextInstruction(currentPosition);
    }
}