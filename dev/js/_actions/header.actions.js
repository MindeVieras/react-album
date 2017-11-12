
import { headerConstants } from '../_constants';

export const headerActions = {
    titleChange
};

function titleChange(title) {
    return { type: headerConstants.TITLE_CHANGE, title };
}
