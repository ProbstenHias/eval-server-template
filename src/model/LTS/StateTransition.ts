import {State} from './State';

/**
 * This class represents the edge of a Labeled Transition System as is needed in the first step of the Rodrigues
 * Method
 */
export class StateTransition {


    id: number;
    probability: number;
    source: State;
    destination: State;
    sourceComponentIDX: number;
    targetComponentIDX: number;
    graphID: String;
    componentIDX: number;

    /**
     * Creates an instance of StateTransition
     * @param id represents how many times a transaction from the same component to the same other component happened before this.
     *        in the boiler example all ids should be 0 since in no scenario a components sends a double message to the same other component
     * @param probability the probability value of the edge
     * @param source the source state of the edge
     * @param destination the target state of the edge
     * @param graphID the id of the graph as in the model given by clams
     * @param componentIDX the index of the component as seen in the model given by clams
     * @param sourceComponentIDX the source states componentIDX
     * @param targetComponentIDX the target states componentIDX
     */
    constructor(id: number, probability: number, source: State, destination: State, graphID: String, componentIDX: number, sourceComponentIDX: number, targetComponentIDX: number) {
        this.id = id;
        this.probability = probability;
        this.source = source;
        this.destination = destination;
        this.graphID = graphID;
        this.componentIDX = componentIDX;
        this.sourceComponentIDX = sourceComponentIDX;
        this.targetComponentIDX = targetComponentIDX;
    }
}
