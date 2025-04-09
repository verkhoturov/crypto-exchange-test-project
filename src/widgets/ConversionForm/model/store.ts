import { makeAutoObservable, runInAction } from 'mobx';
import debounce from 'lodash/debounce';
import { Coin, getCoinsData } from '@/entities/coins';
import { Conversion, getConversionData } from '@/entities/conversion';

type ChangedAmountType = 'from' | 'to';

const initialCoinsPair = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC' },
    { id: 825, name: 'Tether USDt', symbol: 'USDT' },
];

const DEFAULT_FROM_COIN_ID = '1'; // BTC
const DEFAULT_TO_COIN_ID = '825'; // USDT

export class ConversionStore {
    coinsList: Coin[] = initialCoinsPair;

    fromCoinId = DEFAULT_FROM_COIN_ID;
    toCoinId = DEFAULT_TO_COIN_ID;

    fromAmount = '1';
    toAmount = '';

    conversion?: Conversion;
    isLoadingFromAmount = false;
    isLoadingToAmount = false;

    lastChangedAmount: ChangedAmountType = 'from';

    private fetchConversionDebounced: () => void;

    constructor() {
        makeAutoObservable(this);

        this.fetchConversionDebounced = debounce(() => {
            void this.fetchConversion(); // void - чтобы не ждать промис
        }, 300);
    }

    async fetchCoins() {
        const res = await getCoinsData();
        if (res.success) {
            runInAction(() => {
                this.coinsList = res.data;
            });
        }
    }

    async fetchConversion() {
        if (this.lastChangedAmount === 'from') {
            this.isLoadingToAmount = true;
        } else {
            this.isLoadingFromAmount = true;
        }

        const params =
            this.lastChangedAmount === 'from'
                ? {
                      fromId: this.fromCoinId,
                      toId: this.toCoinId,
                      fromAmount: this.fromAmount,
                  }
                : {
                      fromId: this.fromCoinId,
                      toId: this.toCoinId,
                      toAmount: this.toAmount,
                  };

        const res = await getConversionData(params);

        runInAction(() => {
            if (res.success) {
                this.conversion = res.data;

                if (this.lastChangedAmount === 'from') {
                    this.toAmount = String(res.data.estimatedAmount);
                } else {
                    this.fromAmount = String(res.data.estimatedAmount);
                }
            }

            if (this.lastChangedAmount === 'from') {
                this.isLoadingToAmount = false;
            } else {
                this.isLoadingFromAmount = false;
            }
        });
    }

    setFromCoinId = (id: string) => {
        this.fromCoinId = id;
        this.fetchConversion();
    };

    setToCoinId = (id: string) => {
        this.toCoinId = id;
        this.fetchConversion();
    };

    setFromAmount = (amount: string) => {
        this.fromAmount = amount;
        this.lastChangedAmount = 'from';
        this.fetchConversionDebounced();
    };

    setToAmount = (amount: string) => {
        this.toAmount = amount;
        this.lastChangedAmount = 'to';
        this.fetchConversionDebounced();
    };

    reverseCoins = () => {
        const prevFrom = this.fromCoinId;
        this.fromCoinId = this.toCoinId;
        this.toCoinId = prevFrom;

        this.fetchConversion();
    };
}

export const conversionStore = new ConversionStore();
