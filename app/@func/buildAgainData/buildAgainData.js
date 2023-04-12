const buildAgainData = (data, obj) => {
    if (!data.length) {
        return data;
    }

    const newData = data.map((item) => {
        if (item.id === obj.id) {
            return obj;
        }

        return item;
    });

    return newData;
};

export default buildAgainData;
