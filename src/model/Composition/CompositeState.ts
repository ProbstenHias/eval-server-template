import {CompositeTransition} from './CompositeTransition';
import {State} from '../LTS/State';

/**
 * This class represents a node in the composite LTS
 */
export class CompositeState {
    states: State[];
    transitionsOut: CompositeTransition[];

    /**
     * Creates an instance of CompositeState
     * @param states the states of the minimized LTS that make up this state. In case of the boiler control system,
     *        the array holds four states
     */
    constructor(states: State[]) {
        this.states = states;
        this.transitionsOut = [];
    }
}
