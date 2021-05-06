import {CompositeState} from './CompositeState';

/**
 * This class represents an edge in a Composite LTS
 */
export class CompositeTransition {
    source: CompositeState;
    target: CompositeState;
    probability: number;
    isErrorTransition: boolean;

    /**
     * Creates an instance of CompositeTransition
     * @param source the source node
     * @param target the target node
     * @param probability the probability value of the transition
     * @param isErrorTransition a boolean that indicates if this is an error transition
     */
    constructor(source: CompositeState, target: CompositeState, probability: number, isErrorTransition: boolean = false) {
        this.source = source;
        this.target = target;
        this.probability = probability;
        this.isErrorTransition = isErrorTransition;
    }
}
