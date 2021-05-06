import {MinimalLTSCollection} from '../model/LTS/MinimalLTSCollection';
import {CompositeState} from '../model/Composition/CompositeState';
import {State} from '../model/LTS/State';
import {StateTransition} from '../model/LTS/StateTransition';
import {CompositeTransition} from '../model/Composition/CompositeTransition';
import {StateType} from '../enums/StateType';

/**
 * This method represents the composition step that generates a parallel composition of the minimized LTSs
 */
export class Composer {

    /**
     * The main method of the class that performs the composition process
     * @param mins the collection of all minimized LTSs of the system
     */
    public static compose(mins: MinimalLTSCollection) {
        const frontier = [];
        const compStates: CompositeState[] = [];
        const initStaes = mins.MinimalLTSs.map(m => m.initialState);
        frontier.push(new CompositeState(initStaes));
        while (frontier.length > 0) {
            const node = frontier.shift();
            compStates.push(node);
            if (Composer.isFinalCompState(node)) continue;
            this.getNextCompStates(mins, node).forEach(t => {
                node.transitionsOut.push(t);
                if (t.isErrorTransition) return;
                const existingState = this.isAlreadyExplored(compStates, t.target);
                if (existingState === undefined) {
                    frontier.push(t.target);
                    return;
                }
                t.target = existingState;
            });
        }
        const finalState = compStates.find(c => c.states[0].type === StateType.Final);

        Composer.normalize(compStates);

        // since there might be duplicate states that lead to the end-action state we combine them, since there can only
        // be one
        this.eliminateDuplicateStates(compStates, finalState);

        return compStates;
    }

    /**
     * Checks if two arrays have the identical entries
     * This method is needed to check if two compstates are identical
     * @param a1 the first array
     * @param a2 the second array
     * @private
     */
    private static isEqual(a1: State[], a2: State[]) {
        for (let i = 0; i < a1.length; i++) {
            if (!a2.includes(a1[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a compstate is the final state. In other words if it has a state of type StateType.Final
     * @param compState
     * @private
     */
    private static isFinalCompState(compState: CompositeState) {
        return compState.states[0].type === StateType.Final;
    }

    /**
     * Creates the final compstate. This compstate has only states of type StateType.Final
     * @param mins
     * @private
     */
    private static createFinalState(mins: MinimalLTSCollection) {
        return new CompositeState(mins.MinimalLTSs.map(min => min.finalState));
    }

    /**
     * Normalizes all transitions in the composition to 1
     * @param states
     * @private
     */
    private static normalize(states: CompositeState[]) {
        states.forEach(s => {
            const sumProb = s.transitionsOut.map(e => e.probability).reduce((a, b) => a + b, 0);
            s.transitionsOut.forEach(x => {
                x.probability = x.probability / sumProb;
            });
        });
    }

    /**
     * generates all possible outgoing edges of a compstate. This is needed for the bfs
     * @param mins all minimized LTSs
     * @param compState the current state of the bfs
     * @private
     */
    private static getNextCompStates(mins: MinimalLTSCollection, compState: CompositeState) {
        // get all transitions from all current states
        // check if there are doubles
        // these are possible
        let allTrans = ([] as StateTransition[]).concat(...compState.states.map(s => s.stateTransitionsOut));
        const compTrans: CompositeTransition[] = [];
        //uncomment next line for boiler, this is due to an error in Rodrigues's paper
        if (allTrans.find(t => t.destination.type === StateType.Final && t.probability === 1.0)) {
            // uncomment next line for non boiler stuff
            // if (allTrans.filter(t => t.destination.type === StateType.Final).length === compState.states.length) {
            const newState = Composer.createFinalState(mins);
            const newTrans = new CompositeTransition(compState, newState, 1);
            compTrans.push(newTrans);
            return compTrans;
        }
        const transPair: StateTransition[][] = [];
        const errorTrans = allTrans.filter(t => t.destination.type === StateType.Error);
        const filteredTrans = allTrans.filter(t => t.destination.type !== StateType.Error && t.destination.type !== StateType.Final);
        filteredTrans.forEach(t => {
            let index = filteredTrans.indexOf(t);
            const fromComp = t.sourceComponentIDX;
            const toComp = t.targetComponentIDX;
            const graphID = t.graphID;
            const id = t.id
            const transPartner = filteredTrans.slice(index + 1).find(tp => {
                return tp.graphID === graphID && tp.targetComponentIDX === toComp && tp.sourceComponentIDX === fromComp&& tp.id === id;
            });
            if (transPartner !== undefined) {
                transPair.push([t, transPartner]);
            }
        });
        transPair.forEach(pair => {
            const states = [...compState.states];
            const index1 = states.indexOf(pair[0].source);
            const index2 = states.indexOf(pair[1].source);
            states[index1] = pair[0].destination;
            states[index2] = pair[1].destination;
            const prob = pair[0].probability * pair[1].probability;
            const newState = new CompositeState(states);
            const newTrans = new CompositeTransition(compState, newState, prob);
            compTrans.push(newTrans);
            // const errorTrans = undefined
            // select which of the two is the one that sends the transitions
            const sender = pair.find(t => t.componentIDX === t.sourceComponentIDX);
            // find the corresponding error transition
            const err = errorTrans.find(t => t.sourceComponentIDX === pair[0].sourceComponentIDX && t.targetComponentIDX === pair[0].targetComponentIDX &&
                t.graphID === pair[0].graphID && t.id === pair[0].id);
            // multiply the probabilities of those two transitions
            const errorProb = sender.probability * err.probability;
            // add a new compTrans to arr that has the isErrorTransition flag set
            const newErrorTrans = new CompositeTransition(compState, undefined, errorProb, true);
            compTrans.push(newErrorTrans);
        });
        return compTrans;

    }

    /**
     * checks if a compstate is already explored by the bfs
     * @param explored the explored set of the bfs
     * @param compState the state to check
     * @private
     */
    private static isAlreadyExplored(explored: CompositeState[], compState: CompositeState) {
        return explored.find(s => {
            return Composer.isEqual(s.states, compState.states);
        });
    }

    /**
     * eliminates all duplicate states that could be present after the composition process
     * @param compStates all compstates of the composite lts
     * @param finalState the final state of the composition
     * @private
     */
    private static eliminateDuplicateStates(compStates: CompositeState[], finalState: CompositeState) {
        const states = compStates.filter(cs => cs.transitionsOut.length > 0 && cs.transitionsOut[0].target === finalState);
        if (states.length < 2) return;
        const realState = states[0];
        const dubs = states.slice(1);
        // check which states lead to an duplicate state
        const allTrans = ([] as CompositeTransition[]).concat(...compStates.map(cs => cs.transitionsOut));
        allTrans.filter(t => dubs.includes(t.target)).forEach(t => {
            t.target = realState;
        });
        dubs.forEach(d => {
            const index = compStates.indexOf(d);
            if (index !== -1) {
                compStates.splice(index, 1);
            }
        });

    }
}
