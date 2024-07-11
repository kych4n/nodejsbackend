module.exports = {
    lengthOfList: (list = []) => list.length,
    eq: (val1, val2) => val1 === val2,
    dateString: (isoString) => new Date(isoString).toLocaleDateString(),    // isoString에서 날짜 부분만 지역에 맞게 변환
};