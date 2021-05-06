import {State} from './State';
import {LabelledTransitionSystem} from './LabelledTransitionSystem';

/**
 * This class represents a tau transition as in the Rodgrigues model
 */
export class LTSTransition {
    componentIDX: number;
    probability: number;
    sourceState: State;
    destinationState: State;
    sourceLTS: LabelledTransitionSystem;
    destinationLTS: LabelledTransitionSystem;


    /**
     * Creates an instance of LTSTransition
     * @param componentIDX the index of the component in the clams model
     * @param probability the probability value of the transition
     * @param sourceState the source state of the edge
     * @param destinationState the destination state of the edge
     * @param sourceLTS the source LTS of the edge (the LTS the sourceState is part of)
     * @param destinationLTS the target LTS of the edge (the LTS of the targetState is part of)
     */
    constructor(componentIDX: number, probability: number, sourceState: State, destinationState: State, sourceLTS: LabelledTransitionSystem,
                destinationLTS: LabelledTransitionSystem) {
        this.componentIDX = componentIDX;
        this.probability = probability;
        this.sourceState = sourceState;
        this.destinationState = destinationState;
        this.sourceLTS = sourceLTS;
        this.destinationLTS = destinationLTS;
    }
}
