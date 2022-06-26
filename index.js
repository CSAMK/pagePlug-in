/**
 * 创建分页组件
 * @param {number} page 当前页码
 * @param {number} pageNumber 总页数
 * @param {number} mostNum 中间多少个数字
 * @param {element} container 创建好后放到那个容器当中
 */
function createPager(page, pageNumber, mostNum, container) {
    container.innerHTML = '';
    // 创建一个用来装标签的容器
    var pagerContainer = document.createElement('div');
    pagerContainer.className = 'pager';

    /**
     * 创建分页标签
     * @param {string} className 需要传入的类名
     * @param {*} text 需要传入的内容
     * @param {number} newPage 跳转后的下一页
     */
    function createLabel(className, text, newPage) {
        var a = document.createElement('a');
        a.className = className;
        a.innerHTML = text;
        pagerContainer.appendChild(a);

        a.onclick = function () {
            // 跳转：就是重新调用了 createPager 函数，有以下几个情况不允许跳转
            // 下一跳的页数小于 0，下一跳的页数大于总页数，下一跳的页数就是当前页数
            if (newPage < 0 || newPage > pageNumber || newPage === page) {
                return;
            }
            createPager(newPage, pageNumber, mostNum, container);
        }
    }

    // 创建首页和上一页
    // 判断传入页码是否是第一页
    if (page === 1) {
        createLabel('disabled', '首页', 1);
        createLabel('disabled', '上一页', page - 1);
    } else {
        createLabel('', '首页', 1);
        createLabel('', '上一页', page - 1);
    }

    // 创建中间的页码
    // 获取最小和最大页码
    var min = Math.floor(page - mostNum / 2); // 当前码数减去中间显示的页码数量/2
    var max = Math.floor(page + mostNum / 2 - 1); // 当前码数减去中间显示的页码数量/2 - 1


    if (min < 1) {
        min = 1;
    }

    if (max > pageNumber) {
        max = pageNumber;
    }

    for (var i = min; i <= max; i++) {
        if (i === page) {
            createLabel('active', i, i);
        } else {
            createLabel('', i, i);
        }
    }

    // 创建下一页和尾页
    // 判断传入页码是否是最后一页
    if (page === pageNumber) {
        createLabel('disabled', '下一页', page + 1);
        createLabel('disabled', '尾页', pageNumber);
    } else {
        createLabel('', '下一页', page + 1);
        createLabel('', '尾页', pageNumber);
    }

    var span = document.createElement('span');
    span.innerHTML = `${page}/${pageNumber}`;
    pagerContainer.appendChild(span);
    container.appendChild(pagerContainer);
}