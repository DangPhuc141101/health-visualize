export const something = (data, legends, legendField, yAxis, xAxis) => {
    const result ={};
    legends.forEach(legend => {
        const dataByLegend = []
        data.forEach(object => {
            if (object[legendField] === legend) {
                let obj = {};
                obj[xAxis] = object[xAxis];
                obj[yAxis] = object[yAxis];
                dataByLegend.push(obj);
            }
        });
        if (dataByLegend) result[legend] = dataByLegend;
    })
 
    return result;
}