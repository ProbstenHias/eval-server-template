import {Model} from '@openclams/clams-ml';
import {ComponentLabelledTransitionSystem} from '../../model/LTS/ComponentLabelledTransitionSystem';
import {LabelledTransitionSystemsFactory} from './LabelledTransitionSystemsFactory';
import {LTSTransitionsFactory} from './LTSTransitionsFactory';
import {CLTSCollection} from '../../model/LTS/CLTSCollection';

/**
 * This method coordinates the generation of cltss
 */
export class ComponentLabelledTransitionsSystemsFactory {

    /**
     * This method generates all cltss of the given model.
     * It is the only method you have to call to generate cltss from a clams model
     * @param model the clams model
     */
    static getComponentLabelledTransitionSystems(model: Model): CLTSCollection {
        const cltss = new Array<ComponentLabelledTransitionSystem>();
        for (let i = 0; i < model.components.length; i++) {
            const newLTSs = LabelledTransitionSystemsFactory.getLabelledTransitionSystems(model, i);
            const newLTSTransitions = LTSTransitionsFactory.getLTSTransitions(model, i, newLTSs);
            cltss.push(new ComponentLabelledTransitionSystem(newLTSs, newLTSTransitions, i));
        }
        return new CLTSCollection(cltss);
    }
}
