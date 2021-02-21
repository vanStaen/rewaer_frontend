import { runInAction } from "mobx";
import { fetchLooks } from './fetchLooks';

class Store {

    @Action
    async loadLooks() {
        try {
            const looks = await fetchLooks();
            runInAction(() => {
                this.looks = looks;
            })
        } catch (error) {
            runInAction(() => {
                this.error = error;
            })
        }
        runInAction(() => { this.isLoading = false });
    }
}