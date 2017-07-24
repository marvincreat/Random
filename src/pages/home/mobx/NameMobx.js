/**
 * Created by yuanyuan on 17-7-24.
 */
import {observable, action} from 'mobx';

class NameMobx {
    @observable
    name = '';

    namePool = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    @action
    setName = (name) => {
        name && (this.name = name);
    };

    startRandomChangeName = () => {
        this.timer = setInterval(() => {
            let randomNum = this.getRandomNum(0, this.namePool.length);
            this.setName(this.namePool[randomNum]);
        }, 10);
    };

    endRandomChangeName = () => {
        this.timer && clearInterval(this.timer);
    };

    getRandomNum = (Min,Max) => {
        let Range = Max - Min;
        let Rand = Math.random();
        return(Min + Math.floor(Rand * Range));
    }
}

export default nameMobx = new NameMobx();