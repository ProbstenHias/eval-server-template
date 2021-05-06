import {Model} from '@openclams/clams-ml';
import {GraphType} from '../../enums/GraphType';
import {LabelledTransitionSystem} from '../../model/LTS/LabelledTransitionSystem';
import {StatesFactory} from './StatesFactory';
import {StateTransitionsFactory} from './StateTransitionsFactory';
import {StateType} from '../../enums/StateType';

/**
 * This class represent the process of translating a bmsc into an lts
 */
export class LabelledTransitionSystemsFactory {

    /**
     * this method generates all LTSs for a component by generating the states and then the state transitions
     * @param model the clams model
     * @param componentIDX the index of the component
     */
    static getLabelledTransitionSystems(model: Model, componentIDX: number): Array<LabelledTransitionSystem> {
        return model.graphs.filter((graph) => {
            return graph.getType() === GraphType.SequenceDiagram;
        }).map((graph) => {
            const states = StatesFactory.getStates(model, componentIDX, graph);
            const transitions = StateTransitionsFactory.getTransitions(model, componentIDX, graph, states);
            const initialState = states.find(s => {
                return s.type === StateType.Initial;
            });
            const finalState = states.find(s => {
                return states.length < 2 || s.type === StateType.End;
            });
            const errorState = states.find(s => {
                return s.type === StateType.Error;
            });
            return new LabelledTransitionSystem(states, transitions, componentIDX, graph.id, initialState, finalState, errorState);
        });
    }

}
