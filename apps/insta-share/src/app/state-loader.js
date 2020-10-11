export class StateLoader {

    constructor() { }

    loadState() {
        try {
            let serializedState = localStorage.getItem('saved_state');

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("saved_state", serializedState);

        }
        catch (err) {
        }
    }

    initializeState() {
        return {
            auth: {
                isAuthenticated: false,
                user: null,
                token: null
            },
            upload: {}
        }
    };
}

export default StateLoader;