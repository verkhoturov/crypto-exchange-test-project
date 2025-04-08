// model/store.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { Coin, getCoinsData } from '@/entities/coins';
import { Conversion, getConversionData } from '@/entities/conversion';

type ChangedAmountType = 'from' | 'to';

export class ConversionStore {
    coinsList: Coin[] = [
        { id: 1, name: 'Bitcoin', symbol: 'BTC' },
        { id: 825, name: 'Tether USDt', symbol: 'USDT' },
    ];

    fromCoinId = '1'; // BTC
    toCoinId = '825'; // USDT

    fromAmount = '1';
    toAmount = '';

    conversion?: Conversion;
    isLoading = false;

    lastChangedAmount: ChangedAmountType = 'from';

    constructor() {
        makeAutoObservable(this);
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
        this.isLoading = true;

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
            this.isLoading = false;
        });
    }

    setFromCoinId(id: string) {
        this.fromCoinId = id;
        this.fetchConversion();
    }

    setToCoinId(id: string) {
        this.toCoinId = id;
        this.fetchConversion();
    }

    setFromAmount(amount: string) {
        this.fromAmount = amount;
        this.lastChangedAmount = 'from';
        this.fetchConversion();
    }

    setToAmount(amount: string) {
        this.toAmount = amount;
        this.lastChangedAmount = 'to';
        this.fetchConversion();
    }

    reverseCoins() {
        const prevFrom = this.fromCoinId;
        this.fromCoinId = this.toCoinId;
        this.toCoinId = prevFrom;

        const prevAmount = this.fromAmount;
        this.fromAmount = this.toAmount;
        this.toAmount = prevAmount;

        this.fetchConversion();
    }
}

export const conversionStore = new ConversionStore();
