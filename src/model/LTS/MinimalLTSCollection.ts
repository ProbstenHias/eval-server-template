import {MinimalLTS} from './MinimalLTS';

/**
 * This class saves all minimized LTS
 */
export class MinimalLTSCollection{
    MinimalLTSs: MinimalLTS[]


    /**
     * Creates an instance of MinimalLTSCollection
     * @param MinimalLTSs an array of all minimized LTSs
     */
    constructor(MinimalLTSs: MinimalLTS[]) {
        this.MinimalLTSs = MinimalLTSs;
    }
}
