import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export default history;
/*

        const useNotification = (actions: Function): any => {
            const useStateFactory = (function f() {
                let state; // hold our state in module scope
                return {
                    useState(initialValue) {
                        state = state || initialValue; // assign anew every run
                        function setState(newVal) {
                            console.log('change state ', state)
                            state = newVal;
                        }
                        return [state, setState];
                    }
                };
            }());
        }
 */
