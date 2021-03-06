/**
 * Created by yuanyuan on 17-7-24.
 */
import {observable, action} from 'mobx';

class NameMobx {
    @observable
    name = '准备开始';

    namePool = ['水煮肉片',
        '可乐鸡翅',
        '雪梨肘棒',
        '素锅烤鸭',
        '锅塌鸡签',
        '芝麻鱼球',
        '拔丝苹果',
        '熬黄花鱼',
        '红烧鱼唇',
        '龙凤双腿',
        '四喜鸭子',
        '奶汤银肺',
        '换心乌贼',
        '炸菠菜脯',
        '麻粉肘子',
        '双味蹄筋',
        '砂锅三味',
        '山东菜丸',
        '整鱼两吃',
        '蜜汁金枣',
        '龙眼凤肝',
        '蜜汁梨球',
        '凤尾金鱼',
        '杨梅虾球',
        '奶汤蒲菜',
        '玛瑙银杏',
        '炒豆腐脑',
        '扒酿海参',
        '珊瑚金钩',
        '南煎丸子',
        '软烧豆腐',
        '全虾三做',
        '辣拌血蛤',
        '香煎茄片',
        '西汁乳鸽',
        '甘菊猪肚',
        '子萝鸭片',
        '果汁鹌鹑',
        '金龙乳猪',
        '红斑二吃',
        '蜜汁叉烧',
        '清烩海参',
        '京乳藕片',
        '红烧猪手',
        '三色龙虾',
        '嘉禾雁扣',
        '蒜香鲶鱼',
        '牛蒡香羹',
        '雪花片汤',
        '灵芝鸡汤',
        '干炒牛河',
        '凉拌海蜇',
        '兰度鸽脯',
        '茄汁明虾',
        '皱纹圆蹄',
        '红扒羊肉',
        '白玉翡翠',
        '豆泥红枣',
        '椰盅海皇',
        '蚝油生菜',
        '萝卜泡菜',
        '果炖鱼'];

    @action
    setName = (name) => {
        name && (this.name = name);
    };

    startRandomChangeName = () => {
        if (this.timer){
            return;
        }
        this.timer = setInterval(() => {
            let randomNum = this.getRandomNum(0, this.namePool.length);
            this.setName(this.namePool[randomNum]);
        }, 10);
    };

    endRandomChangeName = () => {
        this.timer && clearInterval(this.timer);
        this.timer = null;
    };

    getRandomNum = (Min,Max) => {
        let Range = Max - Min;
        let Rand = Math.random();
        return(Min + Math.floor(Rand * Range));
    };

    addNamePool = (name) => {
        this.namePool.push(name);
    };
}

export default nameMobx = new NameMobx();