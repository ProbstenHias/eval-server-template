import {State} from './State';

/**
 * This calls represents a minimal LTS
 */
export class MinimalLTS {
    componentIDX: number;
    states: State[];
    initialState: State;
    finalState: State;

    /**
     * Creates an instance of MinimalLTS
     * @param componentIDX the index of the component in the clams model
     * @param states the nodes of the LTS
     * @param initialState the initial state of the system
     * @param finalState the final state of the system
     */
    constructor(componentIDX: number, states: State[], initialState: State, finalState: State) {
        this.componentIDX = componentIDX;
        this.states = states;
        this.initialState = initialState;
        this.finalState = finalState;
    }
}
