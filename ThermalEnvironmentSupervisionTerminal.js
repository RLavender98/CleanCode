class IntCodeComputer {
    constructor(instructionExecutor) {
        this.instructionExecutor = instructionExecutor;
    }
}

class InstructionReader {
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

class InstructionExecutor {
    constructor(instructionRunners) {
        this.instructionRunners = instructionRunners;
        this.instructionReader = new InstructionReader();
    }

    executeInstruction = (input, currentPosition, operationInput) => {
        const opcode = this.instructionReader.readOpcode(input[currentPosition]);
        const instruction = [opcode, this.instructionReader.readParameterModes(input[currentPosition], this.instructionRunners[opcode - 1])]
        return this.instructionRunners[instruction[0] - 1].runInstruction(input, currentPosition, instruction[1], operationInput);
    }
}

class InstructionOneRunner extends InstructionRunner {
    constructor() {
        super(1,3);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        input[input[currentPosition + 3]] = this.getValue(input, currentPosition + 1, parameterModes[0])
            + this.getValue(input, currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(currentPosition);
    }
}

class InstructionTwoRunner extends InstructionRunner {
    constructor() {
        super(2,3);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        input[input[currentPosition + 3]] = this.getValue(input, currentPosition + 1, parameterModes[0])
            * this.getValue(input, currentPosition + 2, parameterModes[1]) ;
        return this.skipToNextInstruction(currentPosition);
    }
}

class InstructionThreeRunner extends InstructionRunner {
    constructor() {
        super(3,1);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        input[input[currentPosition + 1]] = operationInput;
        return this.skipToNextInstruction(currentPosition);
    }
}

class InstructionFourRunner extends InstructionRunner {
    constructor() {
        super(4,1);
    }

    runInstruction = (input, currentPosition, parameterModes, operationInput) => {
        console.log(this.getValue(input, currentPosition + 1, parameterModes[0]));
        return this.skipToNextInstruction(currentPosition);
    }
}

class InstructionFiveRunner extends InstructionRunner {
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

class InstructionSixRunner extends InstructionRunner {
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

class InstructionSevenRunner extends InstructionRunner {
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

class InstructionEightRunner extends InstructionRunner {
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

const ThermalEnvironmentSupervisionTerminal = (input, operationInput) => {
    const instructionRunners = [
        new InstructionOneRunner(),
        new InstructionTwoRunner(),
        new InstructionThreeRunner(),
        new InstructionFourRunner(),
        new InstructionFiveRunner(),
        new InstructionSixRunner(),
        new InstructionSevenRunner(),
        new InstructionEightRunner()
    ];
    const intCodeComputer = new IntCodeComputer(new InstructionExecutor(instructionRunners));
    let currentPosition = 0;
    while(input[currentPosition] !== 99) {
        currentPosition = intCodeComputer.instructionExecutor.executeInstruction(input, currentPosition, operationInput);
    }
    return input[0];
}

ThermalEnvironmentSupervisionTerminal([3,225,1,225,6,6,1100,1,238,225,104,0,1102,91,92,225,1102,85,13,225,1,47,17,224,101,-176,224,224,4,224,1002,223,8,223,1001,224,7,224,1,223,
    224,223,1102,79,43,225,1102,91,79,225,1101,94,61,225,1002,99,42,224,1001,224,-1890,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,102,77,52,224,1001,224,-4697,224,4,224,102,
    8,223,223,1001,224,7,224,1,224,223,223,1101,45,47,225,1001,43,93,224,1001,224,-172,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1102,53,88,225,1101,64,75,225,2,14,129,224,101,-5888,
    224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,101,60,126,224,101,-148,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1102,82,56,224,1001,224,-4592,224,4,224,1002,223,8,223,
    101,4,224,224,1,224,223,223,1101,22,82,224,1001,224,-104,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,
    1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,
    1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,8,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,344,101,1,223,223,108,
    226,226,224,1002,223,2,223,1006,224,359,1001,223,1,223,107,226,677,224,102,2,223,223,1006,224,374,101,1,223,223,8,677,677,224,102,2,223,223,1006,224,389,1001,223,1,223,1008,226,677,224,1002,223,
    2,223,1006,224,404,101,1,223,223,7,677,677,224,1002,223,2,223,1005,224,419,101,1,223,223,1108,226,677,224,1002,223,2,223,1005,224,434,101,1,223,223,1108,226,226,224,102,2,223,223,1005,224,449,
    1001,223,1,223,107,226,226,224,102,2,223,223,1005,224,464,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,479,101,1,223,223,1007,226,677,224,102,2,223,223,1005,224,494,1001,223,1,223,1008,
    226,226,224,1002,223,2,223,1005,224,509,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,524,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,539,101,1,223,223,108,226,677,224,1002,223,
    2,223,1005,224,554,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,569,1001,223,1,223,1107,677,677,224,102,2,223,223,1005,224,584,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,599,1001,
    223,1,223,8,677,226,224,1002,223,2,223,1005,224,614,1001,223,1,223,7,226,677,224,1002,223,2,223,1006,224,629,101,1,223,223,1107,677,226,224,1002,223,2,223,1005,224,644,1001,223,1,223,1107,226,677,
    224,102,2,223,223,1006,224,659,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226], 5);

console.log('should be equal to 9386583');