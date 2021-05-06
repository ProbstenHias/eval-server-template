import {CLTSCollection} from '../../model/LTS/CLTSCollection';
import {MinimalLTSCollection} from '../../model/LTS/MinimalLTSCollection';
import {Minimizer} from '../Minimizer';

/**
 * This method coordinates the minimization process
 */
export class MinimalLTSCollectionFactory {

    /**
     * This method minimizes all clts of the system
     * @param cltss the cltss of the system
     */
    public static getMinimalLTSCollectionFactory(cltss: CLTSCollection) {

        const collection = cltss.componentLabelledTransitionSystems.map(c => {
            return Minimizer.minimize(c);
        });
        return new MinimalLTSCollection(collection);
    }
}
