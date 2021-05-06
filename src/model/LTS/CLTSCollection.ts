import {ComponentLabelledTransitionSystem} from './ComponentLabelledTransitionSystem';

/**
 * This class gathers all cltss of the sytem
 */
export class CLTSCollection{
    componentLabelledTransitionSystems: ComponentLabelledTransitionSystem[]

    /**
     * Creates an instance of ComponentLabelledTransitionSystem
     * @param componentLabelledTransitionSystems an array with all cltss of the system
     */
    constructor(componentLabelledTransitionSystems: ComponentLabelledTransitionSystem[]) {
        this.componentLabelledTransitionSystems = componentLabelledTransitionSystems;
    }
}
