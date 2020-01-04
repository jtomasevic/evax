// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { isObject } from 'util';

export type ActionResult = { type: string } | void;
export type dispatchType = (actionResult: ActionResult) => void;

export type Action = (...params: any) => ActionResult;
export type AsyncAction = (...params: any) => void;
export type AtionType = Action | AsyncAction;
export type useActionType = (action: Action) => any;

export type useStoreType = () => [any, (Action) => any];

function deepFreeze(object) {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);
    // Freeze properties before freezing self
    if (Array.isArray(object)) {
        object.forEach(obj => {
            deepFreeze(obj);
        });
        Object.freeze(object);
    } else {
        for (const name of propNames) {
            const value = object[name];

            // if (Array.isArray(value)) {
            //      console.log('its array', value);
            //      object[name] = value; // value.forEach(v => deepFreeze(v));
            // } else {
            object[name] = value && typeof value === 'object'
                ? deepFreeze(value) : value;
            // }
        }
    }
    console.log('freexed:', object);
    return Object.freeze(object);
}

export class Store {
    stores: Object;

    attachers: Object;

    constructor() {
        this.stores = {};
        this.attachers = {};
    }

    attachTo(actionType: string, callBack: (store: any, action: ActionResult) => any) {
        if (!this.attachers[actionType]) {
            this.attachers[actionType] = [];
        }
        this.attachers[actionType].push(callBack);
    }

    useReducer(actionType: string) {
        const privateCallBack = null;
        const callBack = (store: any, action: ActionResult) => {
            privateCallBack(store, action);
        };
        return [privateCallBack];
    }

    // this method is for web components, here just as reminder.
    // useStore(name: string, setState: (store: any)=> Object, ...actions: any) {
    //     // const _useStore = (...actions: any): any => {
    //     let store = this.stores[name];
    //     const dispatch = (actionResult: ActionResult) => {
    //         if (isObject(actionResult)) {
    //             if (this.attachers[actionResult.type]) {
    //                 this.attachers[actionResult.type].forEach(callback => {
    //                     store = callback(store, actionResult, this.stores);
    //                 });
    //             } else {
    //                 store = { ...store, ...actionResult };
    //             }
    //             // this.stores = { ...this.stores };
    //             this.stores[name] = { ...store };
    //             setState(this.stores[name]);
    //             Object.keys(actionResult).forEach(key => {
    //                 // console.log('deleting ***** ', actionResult[key]);
    //                 delete actionResult[key];
    //             });
    //             // Object.keys(store).forEach(key => {
    //             //     console.log('deleting ***** ', store[key]);
    //             //     delete store[key];
    //             // });
    //             actionResult = null;
    //             // store = null;
    //         }
    //     };
    //     const useAction = (action: AtionType): any => {
    //         return (...params: any) => {
    //             return dispatch(action(...params, dispatch));
    //         };
    //     };
    //     const wrappedActions = actions ? actions.map(action => useAction(action)) : [];

    //     return wrappedActions;
    // }

    register(storeFn: ()=> Object): () => any {
        this.stores[storeFn.name] = storeFn();
        if (!this.stores[storeFn.name]) {
            this.stores[storeFn.name] = {};
        }
        const useStore = (...actions: any): any => {
            let store = this.stores[storeFn.name];
            const [state, setState] = useState(this.stores[storeFn.name]);
            const dispatch = (actionResult: ActionResult) => {
                store = Object.assign(store);
                if (isObject(actionResult)) {
                    if (this.attachers[actionResult.type]) {
                        this.attachers[actionResult.type].forEach(callback => {
                            store = callback(store, actionResult, this.stores);
                        });
                    } else {
                        store = { ...store, ...actionResult };
                    }
                    // this.stores = { ...this.stores };
                    this.stores[storeFn.name] = { ...store };

                    setState(this.stores[storeFn.name]);
                    // deepFreeze(this.stores[storeFn.name]);
                    Object.keys(actionResult).forEach(key => {
                        // console.log('deleting ***** ', actionResult[key]);
                        delete actionResult[key];
                    });
                    // Object.keys(store).forEach(key => {
                    //     console.log('deleting ***** ', store[key]);
                    //     delete store[key];
                    // });
                    actionResult = null;
                    // store = null;
                }
            };
            const useAction = (action: AtionType): any => {
                return (...params: any) => {
                    params.push(dispatch);
                    console.log('===== use action', action);
                    return dispatch(action(...params));
                };
            };
            const wrappedActions = actions ? actions.map(action => useAction(action)) : [];
            console.log('===== use store', state, actions);
            return [state, ...wrappedActions];
        };
        return useStore;
    }
}

export const attatchToActionType = (actionName: string, callBack: (store: any, action: ActionResult) => any) => number;

export const createStore = (...stores: Function) => {
    const globalStore = new Store();
    const registretedStores = [];
    stores.forEach((store) => {
        registretedStores.push(globalStore.register(store));
    });
    console.log('******', registretedStores);
    const attachToAction = (actionName: string,
        callback: (store: any, action: ActionResult & any) => any) => {
        globalStore.attachTo(actionName, callback);
    };
    const store = () => {
        return globalStore.stores;
    };
    registretedStores.push(attachToAction);
    registretedStores.push(store);

    return registretedStores;
};

// eslint-disable-next-line arrow-body-style
export const bindAction = (action: Function, ...bindings: string) => {
    return () => {
        const params = [];
        bindings.forEach((binding: string | Array) => {
            const element: HTMLElement = (Array.isArray(binding))
                ? document.getElementById(binding[0])
                : document.getElementById(binding);
            const value = (Array.isArray(binding))
                ? binding[1](element.value)
                : element.value;
            params.push(value);
        });
        action(...params);
    };
};

type bindingProp = [
    string,
    (element: HTMLElement) => any
];

export const bindActionProps = (action: Action, ...bindings: bindingProp) => {
    return () => {
        const params = [];
        bindings.forEach((binding: bindingProp) => {
            // const htmlElement = document.getElementById(binding.elementId);
            const element: HTMLElement = (Array.isArray(binding))
                ? document.getElementById(binding[0])
                : document.getElementById(binding);
            // eslint-disable-next-line no-nested-ternary
            const value = (Array.isArray(binding))
                ? binding[1](element)
                : element.value ? element.value : element.getAttribute('value');
            params.push(value);
        });
        action(...params);
    };
};
