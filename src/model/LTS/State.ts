import {StateType} from '../../enums/StateType';
import {StateTransition} from './StateTransition';
import {LTSTransition} from './LTSTransition';

/**
 * This class represents the node of a Labeled Transition System as is needed in the first step of the Rodrigues
 * Method
 */
export class State {
    id: number;
    type: StateType;
    stateTransitionsIn: StateTransition[];
    stateTransitionsOut: StateTransition[];
    ltsTransitionsIn: LTSTransition[];
    ltsTransitionsOut: LTSTransition[];
    componentIDX: number;
    graphID: string;


    /**
     * Creates an instance of State
     * @param id a number that is unique in the Labeled Transition System
     * @param type an enum
     * @param componentIDX the index of the component as given by the clams model
     * @param graphID the graphID as in clams model
     */
    constructor(id: number, type: StateType, componentIDX: number, graphID: string) {
        this.componentIDX = componentIDX;
        this.graphID = graphID;
        this.id = id;
        this.type = type;
        this.stateTransitionsIn = [];
        this.stateTransitionsOut = [];
        this.ltsTransitionsIn = [];
        this.ltsTransitionsOut = [];
    }
}
