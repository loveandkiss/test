// 截取字符串
export function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/,
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
        } else {
            break;
        }
    }
    return strre + "..."
}
// 格式化时间
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    if(time == " " && time == " " && time == null){
        return null;
    }
    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(parseInt(time))
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}
// 求取两点之间的夹角
export function angle(start,end){
    let diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    //返回角度,不是弧度
    return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
}
// 增删改查
export const locationStroageObj = {
    // 获取
    get:function(item){
        // 获取(getItem)
        return JSON.parse(window.sessionStorage.getItem(item));
    },
    updateOrSave:function(item,value){
        if(typeof value === "string"){
            // 设置本地存储，如果是字符串直接（只能存储字符串类型的对象）
            window.sessionStorage.setItem(item,value);
        }else{
            // 否则先转换为字符串
            window.sessionStorage.setItem(item,JSON.stringify(value));
        }
    },
    // 删
    delete:function(item){
        // 删除本地临时存储
        window.sessionStorage.removeItem(item);
    }
}
// 求取数组平均数
export function arrAverageNum(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    };
    return (sum/arr.length*100)/100;
}
// 处理金额函数
const digitsRE = /(\d{3})(?=\d)/g;

export function currency (value, currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified;
    var i = _int.length % 3;
    var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : '';
    var _float = decimals
        ? stringified.slice(-1 - decimals)
        : '';
    var sign = value < 0 ? '-' : '';
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
}

// 首字母大写
export function toUpperStr(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}


