import {LabelledTransitionSystem} from './LabelledTransitionSystem';
import {LTSTransition} from './LTSTransition';

/**
 * This class represents a Component Labelled Transition System as in Rodrigues Model
 */
export class ComponentLabelledTransitionSystem {
    labelledTransitionSystems: LabelledTransitionSystem[];
    transitions: LTSTransition[];
    componentIDX: number;


    /**
     * Creates an instance of ComponentLabelledTransitionSystem
     * @param labelledTransitionSystems all LTS that are part of the clts
     * @param transitions all tau transitions in the clts
     * @param componentIDX the index of the component as in the clams model
     */
    constructor(labelledTransitionSystems: LabelledTransitionSystem[], transitions: LTSTransition[], componentIDX: number) {
        this.labelledTransitionSystems = labelledTransitionSystems;
        this.transitions = transitions;
        this.componentIDX = componentIDX;
    }

}
