import { BN } from 'bn.js';

declare module 'web3' {
    export interface Utils {
        toBN(value: number | string): BN;
    }
}